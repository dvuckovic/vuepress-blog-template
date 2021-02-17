<template>
    <div class="container-lg my-3 BlogTags">
        <div class="row just justify-content-center">
            <section class="col BlogTags__Content">
                <h1 class="pt-4 mb-5">Tag cloud</h1>
                <BlogTag
                    v-for="sortedTag in sortedTags"
                    v-bind:key="sortedTag.name"
                    v-bind:tag="sortedTag" />
            </section>
        </div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
    props: {
        tags: {
            type: Array,
        },
    },

    computed: {
        sortedTags () {
            const tags = cloneDeep(this.tags) || [];
            return tags.sort((a, b) => a.name > b.name);
        },
    },
};
</script>

<style lang="scss">
.BlogTags {
}
</style>
