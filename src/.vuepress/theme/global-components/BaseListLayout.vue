<template>
    <main class="container-lg my-3">
        <h1
            v-if="title"
            class="mt-5">
            {{ title }}
        </h1>
        <div
            class="row"
            itemscope
            itemtype="http://schema.org/Blog">
            <article
                v-for="(page, index) in pages"
                v-bind:key="page.key"
                v-bind:class="{
                    'col-12': index === 0,
                    'col-sm-6': index !== 0,
                    'col-lg-4': index !== 0 && index !== 7 && index !== 8,
                }"
                itemprop="blogPost"
                itemscope
                itemtype="https://schema.org/BlogPosting">
                <meta
                    itemprop="mainEntityOfPage"
                    v-bind:content="page.path">
                <div
                    v-bind:class="{
                        'row align-items-center': index === 0,
                    }">
                    <div
                        class="my-3"
                        v-bind:class="{
                            'col-sm-6 col-md-8 col-lg-8': index === 0,
                        }">
                        <NavLink
                            v-if="page.frontmatter.image"
                            v-bind:link="page.path">
                            <img
                                v-bind:src="page.frontmatter.image"
                                v-bind:alt="page.title"
                                v-bind:style="{
                                    maxHeight: index === 0 ? '380px' : undefined,
                                }"
                                class="w-100 rounded BaseListLayout__Post__Image">
                        </NavLink>
                    </div>
                    <div
                        class="my-3"
                        v-bind:class="{
                            'col-sm-6 col-md-4 col-lg-4': index === 0,
                        }">
                        <header
                            itemprop="name headline"
                            class="BaseListLayout__Post__Title">
                            <div
                                v-if="page.frontmatter.tags"
                                class="text-uppercase mb-2 BaseListLayout__Post__Meta BaseListLayout__Post__Meta--Tags"
                                itemprop="keywords">
                                <router-link
                                    v-bind:to="`/tag/${resolvePostTags(page.frontmatter.tags)[0]}`"
                                    class="me-3">
                                    {{ resolvePostTags(page.frontmatter.tags)[0] }}
                                </router-link>
                            </div>
                            <h3 class="mt-0 mb-4">
                                <NavLink v-bind:link="page.path">
                                    {{ page.title }}
                                </NavLink>
                            </h3>
                        </header>
                        <p
                            class="mb-4 BaseListLayout__Post__Summary"
                            itemprop="description">
                            {{ page.frontmatter.summary || page.summary }}
                        </p>
                        <footer>
                            <div
                                v-if="page.frontmatter.date"
                                class="text-uppercase BaseListLayout__Post__Meta BaseListLayout__Post__Meta--Date">
                                <time
                                    itemprop="datePublished"
                                    v-bind:datetime="page.frontmatter.date">
                                    {{ resolvePostDate(page.frontmatter.date) }}
                                </time>
                                <template v-if="page.frontmatter.readingTime">
                                    <span class="mx-2">
                                        &bullet;
                                    </span>
                                    {{ page.frontmatter.readingTime }}
                                </template>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
        </div>
        <component
            v-bind:is="paginationComponent"
            v-if="$pagination.length > 1 && paginationComponent"
            class="my-4 w-100 text-center" />
    </main>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import {
    Pagination,
    SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components';
import { upperFirst } from 'lodash';

export default {
    data () {
        return {
            paginationComponent: null,
        };
    },

    computed: {
        pages () {
            return this.$pagination.pages;
        },

        title () {
            if (!this.$frontmatter.title) return null;
            let { title } = this.$frontmatter;
            title = title.replace(/(\s\|\s)?Tag$/, '');
            title = title.replace(/^Page\s[0-9]+\s-\s/, '');
            return upperFirst(title);
        },
    },

    mounted () {
        this.paginationComponent = this.getPaginationComponent();
    },

    methods: {
        getPaginationComponent () {
            // eslint-disable-next-line no-undef
            const n = THEME_BLOG_PAGINATION_COMPONENT;
            if (n === 'Pagination') {
                return Pagination;
            }

            if (n === 'SimplePagination') {
                return SimplePagination;
            }

            return Vue.component(n) || Pagination;
        },

        resolvePostDate (date) {
            return moment(date).format(this.$themeConfig.dateFormat || 'ddd MMM DD YYYY');
        },

        resolvePostTags (tags) {
            if (!tags || Array.isArray(tags)) return tags;
            return [ tags ];
        },
    },
};
</script>

<style lang="scss">
.BaseListLayout {
    &__Post {
        &__Image {
            width: 100%;
            height: 100%;
            max-height: 380px;
            min-height: 200px;
            vertical-align: middle;
            color: rgba(68,68,68,0);
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
            background-color: $secondary;
            -o-object-fit: cover;
            object-fit: cover;
            -webkit-animation-name: pulse-color;
            animation-name: pulse-color;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;

            @media (min-width: 576px) {
                & {
                    max-height: 200px;
                }
            }

            &:hover {
                filter: brightness(0.5);
            }
        }

        &__Meta {
            &--Tags {
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.2px;

                a {
                    color: $primary;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            &--Date {
                font-size: 0.75rem;
                color: $spanish;
                letter-spacing: 0.2px;
            }
        }

        &__Title {
            h3 {
                a {
                    color: $gainsboro;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        &__Summary {
            font-family: 'Garamond', serif;
            font-size: 1.125rem;
            color: $spanish;
        }
    }
}

.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;

    a {
        font-family: 'Helvetica', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        transition: none;
        border: none;

        &:hover {
            color: $white;
            background: $primary;
        }
    }
}

.simple-pagination a {
    margin-right: 20px;
    color: $black;
    height: 38px;
    line-height: 38px;
    transition: all .3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
    background: $white;
    padding: 0 15px;
    text-decoration: none;
    border: 1px solid $black;
    border-radius: 5px;
    transition: none;

    &:last-child {
        margin-right: 0;
    }
}
</style>
