const removeMd = require('remove-markdown');
const path = require('path');
const pick = require('lodash/pick');
const chalk = require('chalk');

module.exports = (themeConfig) => {
    /**
     * Default theme configuration
     */
    themeConfig = Object.assign(themeConfig, {
        nav: themeConfig.nav || [
            {
                text: 'Blog',
                link: '/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            },
        ],
        summary: themeConfig.summary === undefined ? true : themeConfig.summary,
        summaryLength: typeof themeConfig.summaryLength === 'number'
            ? themeConfig.summaryLength
            : 200,
        pwa: !!themeConfig.pwa,
    });

    /**
     * Configure blog plugin
     */
    const defaultBlogPluginOptions = {
        directories: [
            {
                id: 'post',
                dirname: '_posts',
                path: '/',
            },
        ],
        frontmatters: [
            {
                id: 'tag',
                keys: [ 'tags' ],
                path: '/tag/',
            },
        ],
        globalPagination: {
            lengthPerPage: 5,
        },
    };

    let resolvedFeedOptions;
    const isFeedEnabled = themeConfig.feed && themeConfig.feed.canonical_base;
    if (isFeedEnabled) {
        const {
            rss = true,
            atom = false,
            json = false,
            ...feedOptions
        } = themeConfig.feed;
        resolvedFeedOptions = Object.assign({}, feedOptions, {
            feeds: {
                rss2: {
                    enable: rss,
                },
                atom1: {
                    enable: atom,
                },
                json1: {
                    enable: json,
                },
            },
        });
    }

    const properties = [
        'directories',
        'frontmatters',
        'globalPagination',
        'sitemap',
        'comment',
        'newsletter',
    ];
    const themeConfigPluginOptions = {
        ...pick(themeConfig, properties),
        feed: resolvedFeedOptions,
    };

    const blogPluginOptions = Object.assign(
        {},
        defaultBlogPluginOptions,
        themeConfigPluginOptions
    );

    /**
     * Integrate plugins
     */
    const enableSmoothScroll = themeConfig.smoothScroll === true;
    const gaPlugin = [];
    const seoPlugin = [];

    if (themeConfig.ga) {
        if (
            !themeConfig.env
            || (
                themeConfig.env
                && !themeConfig.env.GOOGLE_ANALYTICS_ID
            )
        ) {
            console.warn(
`${chalk.yellow('warning')} Google Analytics plugin has been activated in the configuration,
${chalk.yellow('warning')} but the value for the GOOGLE_ANALYTICS_ID variable is missing.
${chalk.yellow('warning')} Did you forget to include it in the .env file?`
            );
        }
        else {
            gaPlugin.push([
                '@vuepress/google-analytics',
                {
                    ga: themeConfig.env.GOOGLE_ANALYTICS_ID,
                },
            ]);
        }
    }

    if (themeConfig.seo) {
        seoPlugin.push([
            'seo',
            {
                customMeta: (add, context) => {
                    const { $site, $page, type } = context;

                    if (type !== 'website') return;

                    const title = ($page.frontmatter && $page.frontmatter.title) || $site.title;
                    const description = ($page.frontmatter && $page.frontmatter.description) || $site.description;
                    const image = ($page.frontmatter && $page.frontmatter.image) || $site.themeConfig.coverHome;

                    // Add additional meta properties and tags to the aggregate pages.
                    add('og:title', title, 'property');
                    add('og:description', description, 'property');
                    add('og:image', image, 'property');
                    add('twitter:title', title);
                    add('twitter:description', description);
                    add('twitter:image', image);
                },
            },
        ]);
    }

    const plugins = [
        [
            'vuepress-plugin-dehydrate',
            {
                // Disable SSR.
                noSSR: '404.html',
            },
        ],
        '@vuepress/plugin-nprogress',
        [
            '@vuepress/search',
            {
                searchMaxSuggestions: 10,
            },
        ],
        [
            '@vuepress/blog',
            blogPluginOptions,
        ],
        [
            'smooth-scroll',
            enableSmoothScroll,
        ],
        ...gaPlugin,
        ...seoPlugin,
        [
            'live',
            {
                layout: path.resolve(__dirname, 'layouts/VueLiveLayout.vue'),
            },
        ],
    ];

    /**
     * Enable pwa
     */
    if (themeConfig.pwa) {
        plugins.push([
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true,
            },
        ]);
    }

    const config = {
        plugins,
        define: {
            THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
                ? themeConfig.paginationComponent
                : 'Pagination',
        },
        alias: {
            fonts: path.resolve(__dirname, 'fonts'),
        },

        /**
         * Generate summary.
         */
        extendPageData (pageCtx) {
            const strippedContent = pageCtx._strippedContent;
            if (!strippedContent) {
                return;
            }
            if (themeConfig.summary) {
                pageCtx.summary = `${removeMd(
                    strippedContent
                        .trim()
                        .replace(/^#+\s+(.*)/, '')
                        .slice(0, themeConfig.summaryLength)
                )} ...`;
                pageCtx.frontmatter.description = pageCtx.summary;
            }
            if (pageCtx.frontmatter.summary) {
                pageCtx.frontmatter.description = pageCtx.frontmatter.summary;
            }
        },
    };

    return config;
};
