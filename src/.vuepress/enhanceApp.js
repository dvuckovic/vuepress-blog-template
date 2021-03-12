import LoadScript from 'vue-plugin-load-script';
import redirects from './redirects';

// Load syntax highlighting styles.
import 'prismjs/themes/prism-tomorrow.css';

export default ({
    Vue,
    // options,
    router,
    siteData,
    isServer,
}) => {
    if (isServer) {
        Vue.component('BootstrapIcon', () => import(
            /* webpackChunkName: "bootstrap-icon.ssr" */
            '@dvuckovic/vue-bootstrap-icons/dist/bootstrap-icon.ssr'
        ));
    }
    else {
        Vue.component('BootstrapIcon', () => import(
            /* webpackChunkName: "bootstrap-icon" */
            '@dvuckovic/vue-bootstrap-icons'
        ));
    }

    // Suppress all Vue logs and warnings.
    Vue.config.silent = true;

    // Apply the plugin for loading external scripts.
    Vue.use(LoadScript);

    // Expose environment variables.
    Vue.prototype.$env = siteData.themeConfig && siteData.themeConfig.env;

    // Set a global variable, if running in development mode.
    if (
        Vue.config.devtools
        && typeof window !== 'undefined'
    ) {
        window.devMode = true;
    }

    // Add the redirection routes.
    redirects.forEach((redirect) => {
        router.addRoute({
            path: redirect.from,
            redirect: {
                path: redirect.to.split('#')[0],
                hash: redirect.to.split('#')[1] ? `#${redirect.to.split('#')[1]}` : undefined,
            },
        });
    });
};
