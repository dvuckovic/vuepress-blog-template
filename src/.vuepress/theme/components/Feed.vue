<template>
    <a
        v-if="getFirstEnabledFeed"
        v-bind:href="getFirstEnabledFeed | getFeedFilePath"
        class="Feed"
        title="Feed">
        <BootstrapIcon
            icon="rss-fill"
            size="lg" />
    </a>
</template>

<script>
export default {
    filters: {
        getFeedFilePath (feed) {
            if (feed === 'rss') return '/rss.xml';
            if (feed === 'atom') return '/feed.atom';
            if (feed === 'json') return '/feed.json';
            return '';
        },
    },

    computed: {
        getFirstEnabledFeed () {
            return Object.keys(this.$service.feed).find((feed) => this.$service.feed[feed]);
        },
    },
};
</script>
