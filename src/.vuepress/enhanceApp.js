import LoadScript from 'vue-plugin-load-script';
import BootstrapIconSsr from '@dvuckovic/vue-bootstrap-icons/dist/bootstrap-icon.ssr';
import BootstrapIcon from '@dvuckovic/vue-bootstrap-icons/dist/bootstrap-icon.esm';
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
    if (isServer) Vue.component('BootstrapIcon', BootstrapIconSsr);
    else Vue.component('BootstrapIcon', BootstrapIcon);

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
            redirect: () => {
                // Redirect to an external address, if dealing with an absolute URL.
                if (/^https?:\/\//.test(redirect.to)) return window.location.replace(redirect.to);

                // Otherwise, return the redirect route hash.
                return {
                    path: redirect.to.split('#')[0],
                    hash: redirect.to.split('#')[1] ? `#${redirect.to.split('#')[1]}` : undefined,
                };
            },
        });
    });
};
