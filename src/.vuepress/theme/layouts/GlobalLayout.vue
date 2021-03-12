<template>
    <div class="d-flex flex-column min-vh-100">
        <Header />
        <DefaultGlobalLayout class="GlobalLayout" />
        <Footer />
        <EmailModal />
    </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout';
import Header from '@theme/components/Header';
import Footer from '@theme/components/Footer';
import EmailModal from '@theme/components/EmailModal';

export default {
    components: {
        DefaultGlobalLayout: GlobalLayout,
        Header,
        Footer,
        EmailModal,
    },

    mounted () {
        // Dynamically import the Bootstrap library, because it's not SSR-friendly.
        import(
            /* webpackChunkName: "bootstrap" */
            'bootstrap'
        );
    },
};
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import '../styles/theme';
</style>
