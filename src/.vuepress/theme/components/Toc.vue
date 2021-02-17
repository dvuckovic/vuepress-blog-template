<template>
    <Sticker
        v-if="visible"
        class="d-none d-xxl-block Toc"
        v-bind="$attrs"
        v-bind:style="{
            opacity: isInView ? 1 : 0,
        }">
        <div class="Toc__Item Toc__H1">
            <a
                href="#app"
                v-bind:title="$page.title">
                {{ $page.title }}
            </a>
        </div>
        <div
            v-for="(item, index) in $page.headers"
            ref="chairTocItem"
            v-bind:key="index"
            class="Toc__Item"
            v-bind:class="[
                `Toc__H${item.level}`,
                { 'Toc__Item--Active': activeIndex === index },
            ]">
            <a
                v-bind:href="`#${item.slug}`"
                v-bind:title="item.title">
                {{ item.title }}
            </a>
        </div>
    </Sticker>
</template>

<script>
import Sticker from './Sticker';

let initTop;

// Get offset top.
const getAbsoluteTop = (dom) => (dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top + document.body.scrollTop + document.documentElement.scrollTop
    : 0);

export default {
    components: {
        Sticker,
    },

    data () {
        return {
            activeIndex: 0,
            isInView: false,
        };
    },

    computed: {
        visible () {
            return (
                this.$frontmatter
                && this.$frontmatter.toc !== false
                && !!(
                    this.$page
                    && this.$page.headers
                    && this.$page.headers.length
                )
            );
        },
    },

    watch: {
        activeIndex () {
            const items = this.$refs.chairTocItem || [];
            const dom = items[this.activeIndex];
            if (!dom) return;
            const rect = dom.getBoundingClientRect();
            const wrapperRect = this.$el.getBoundingClientRect();
            const top = rect.top - wrapperRect.top;
            if (top < 20) {
                this.$el.scrollTop = this.$el.scrollTop + top - 20;
            }
            else if (top + rect.height > wrapperRect.height) {
                this.$el.scrollTop += rect.top - (wrapperRect.height - rect.height);
            }
        },

        $route () {},
    },

    mounted () {
        // Sync visible to parent component.
        const syncVisible = () => {
            this.$emit('visible-change', this.visible);
        };
        syncVisible();
        this.$watch('visible', syncVisible);

        // Binding event.
        setTimeout(() => this.triggerEvt(), 1000);

        this._onScroll = () => this.onScroll();
        this._onHashChange = () => {
            // eslint-disable-next-line no-restricted-globals
            const hash = decodeURIComponent(location.hash.substring(1));
            const index = (this.$page.headers || []).findIndex(h => h.slug === hash);
            if (index >= 0) this.activeIndex = index;
            const dom = hash && document.getElementById(hash);
            if (dom) window.scrollTo(0, getAbsoluteTop(dom) - 20);
        };
        window.addEventListener('scroll', this._onScroll);
        window.addEventListener('hashchange', this._onHashChange);
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this._onScroll);
        window.removeEventListener('hashchange', this._onHashChange);
    },

    methods: {
        onScroll () {
            if (initTop === undefined) {
                initTop = getAbsoluteTop(this.$el);
            }

            // Update position.
            const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            const headings = this.$page.headers || [];

            // Change active toc with scrolling.
            let i = 0;
            const addLink = (index) => {
                this.activeIndex = index;
            };

            for (; i < headings.length; i++) {
                const dom = document.getElementById(headings[i].slug);
                const top = getAbsoluteTop(dom);
                if (top - 50 < scrollTop) {
                    addLink(i);
                }
                else {
                    if (!i) addLink(i);
                    break;
                }
            }

            const headerRect = document.getElementById('header').getBoundingClientRect();
            if (scrollTop > 64 + headerRect.height) {
                this.isInView = true;
            }
            else {
                this.isInView = false;
            }
        },

        triggerEvt () {
            this._onScroll();
            this._onHashChange();
        },
    },
};
</script>

<style lang="scss">
.Toc {
    top: 70px;
    left: 50%;
    margin-left: 540px;
    width: 160px;
    text-align: left;
    transition: opacity 0.2s ease-in;

    &__H1 {
        font-size: 0.75rem;
        line-height: 1.6;
        font-weight: 700;
        margin-bottom: 5px;
    }

    &__H2 {
        font-size: 0.6875rem;
        line-height: 1.6;
        font-weight: 600;
    }

    &__H3 {
        padding-left: 16px;
        font-size: 0.625rem;
        line-height: 1.6;
        font-weight: 500;
    }

    &__H4,
    &__H5,
    &__H6 {
        padding-left: 24px;
        font-size: 0.625rem;
        line-height: 1.6;
        font-weight: 500;
    }

    &__Item {
        a {
            color: $cultured;

            &:hover {
                color: $white;
                text-decoration: underline;
            }
        }

        &--Active {
            a {
                text-decoration: underline;
                text-decoration-color: $primary;
            }
        }
    }
}
</style>
