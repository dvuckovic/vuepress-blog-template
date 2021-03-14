<template>
    <div
        v-bind:class="{
            'PageFlip--Expanded': expanded,
        }"
        class="PageFlip">
        <div class="container-lg">
            <div class="row">
                <div class="col">
                    <div
                        ref="pageFlipPreview"
                        class="PageFlip__Preview">
                        <a
                            v-bind:class="{
                                [`PageFlip__Preview__Thumbnail--${upperFirst(orientation)}`]: true,
                            }"
                            v-bind:style="{
                                backgroundImage: `url('${pageflip.image}')`,
                            }"
                            class="rounded PageFlip__Preview__Thumbnail"
                            v-on:click="toggle" />
                        <h3 v-bind:id="kebabCase(pageflip.title)">
                            {{ pageflip.title }}
                        </h3>
                        <p>{{ pageflip.description }}</p>
                        <button
                            v-bind:class="{
                                active: expanded,
                            }"
                            type="button"
                            class="btn btn-light PageFlip__ExpandButton"
                            v-on:click="toggle">
                            <BootstrapIcon
                                icon="book-fill"
                                size="md" />
                            Preview
                        </button>
                    </div>
                    <transition name="PageFlip__Expand">
                        <div v-if="expanded">
                            <div class="PageFlip__Canvas__Container">
                                <div
                                    ref="pageFlip"
                                    v-bind:class="{ [`PageFlip__Canvas--${upperFirst(orientation)}`]: true }"
                                    class="PageFlip__Canvas" />
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PageFlip } from 'page-flip';
import { sprintf } from 'sprintf-js';
import { upperFirst, kebabCase } from 'lodash';

export default {
    props: {
        pageflip: {
            type: Object,
            required: true,
        },
    },

    data () {
        return {
            expanded: false,
            thumbnailWidth: 128,
            pages: [],
        };
    },

    computed: {
        orientation () {
            if (this.pageflip && this.pageflip.orientation) return this.pageflip.orientation;
            return 'portrait';
        },
    },

    methods: {
        toggle () {
            this.expanded = !this.expanded;

            if (this.expanded) this.$emit('expanded', this);

            this.$nextTick(() => {
                if (this.expanded) this.initPageflip();
            });
        },

        collapse () {
            this.expanded = false;
        },

        initPageflip () {
            const pageFlip = new PageFlip(this.$refs.pageFlip, {
                width: this.pageflip.width,
                height: this.pageflip.height,
                showCover: true,
            });

            this.pages = [];

            for (let i = 1; i <= this.pageflip.size; i++) {
                this.pages.push(`${this.pageflip.path}${sprintf(this.pageflip.name, i)}`);
            }

            pageFlip.loadFromImages(this.pages);

            pageFlip.on('init', () => {
                this.$refs.pageFlipPreview.scrollIntoView();
            });
        },

        upperFirst (str) {
            return upperFirst(str);
        },

        kebabCase (str) {
            return kebabCase(str);
        },
    },
};
</script>

<style lang="scss">
.PageFlip {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    transition: background-color 0.3s ease-in-out;
    background-color: transparent;

    &--Expanded {
        background-color: $dark;
    }

    &__Canvas__Container {
        padding: 1rem 0 2rem;
    }

    &__Canvas {
        margin: 0 auto;
        box-shadow: 5px 5px 30px $rich;

        &--Landscape {
            margin: 6rem auto 5rem;
            box-shadow: 5px -5px 30px $rich;
            transform: rotate(90deg);
        }
    }

    &__Preview {
        &::after {
            content: "";
            clear: both;
            display: table;
        }

        h3 {
            margin-top: 0.5em;
        }

        &__Thumbnail {
            width: 150px;
            height: 150px;
            vertical-align: middle;
            color: rgba(68, 68, 68, 0);
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
            background-color: $secondary;
            animation-name: pulse-color;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            cursor: pointer;
            margin: 0.5rem 0 1rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            transition: none !important;
            float: left;
            margin-right: 2rem;

            &:hover {
                filter: brightness(0.5);
            }

            &.PageFlip__Preview__Thumbnail--Landscape {
                transform: rotate(90deg);
                margin-right: 2rem;
            }
        }
    }

    .btn {
        font-family: 'Helvetica', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        transition: none;
        color: $black;
        height: 38px;
        line-height: 38px;
        background: $white;
        padding: 0 15px;
        border: none;

        &:hover {
            color: $white;
            background-color: $primary;
        }

        &.active {
            color: $black;
            background-color: $cultured;
            box-shadow: inset  0 0 7px rgba(0, 0, 0, 0.5);

            &:hover {
                color: $white;
                background-color: $primary;
            }
        }
    }

    &__Expand {
        &-enter-active,
        &-leave-active {
            max-height: 800px;
            overflow: hidden;
            transition: all 0.3s;
        }

        &-enter,
        &-leave-to {
            max-height: 0;
            opacity: 0;
        }
    }
}
</style>
