<template>
    <router-link
        v-if="!isExternal(normalizedlink)"
        class="NavLink"
        v-bind:to="normalizedlink"
        v-bind:exact="exact">
        <slot />
    </router-link>
    <a
        v-else
        v-bind:href="normalizedlink"
        class="NavLink NavLink--External"
        v-bind:target="isMailto(normalizedlink) || isTel(normalizedlink) || isHash(normalizedlink)
            ? null : '_blank'"
        v-bind:rel="isMailto(normalizedlink) || isTel(normalizedlink) || isHash(normalizedlink)
            ? null : 'noopener noreferrer'"
        v-bind:data-bs-toggle="dataBsToggle">
        <slot />
    </a>
</template>

<script>
import {
    isExternal, isMailto, isTel, isHash, ensureExt
} from '../components/util';

export default {
    props: {
        link: {
            required: true,
            type: String,
        },

        dataBsToggle: {
            type: String,
        },
    },

    computed: {
        normalizedlink () {
            return ensureExt(this.link);
        },

        exact () {
            if (this.$site.locales) {
                return Object.keys(this.$site.locales).some(
                    rootLink => rootLink === this.normalizedlink
                );
            }
            return this.normalizedlink === '/';
        },
    },

    methods: {
        isExternal,
        isMailto,
        isTel,
        isHash,
    },
};
</script>

<style lang="scss">
.NavLink {
    &--Item {
        color: $white;
        padding: 3px 12px;
        font-weight: 500;

        &:hover {
            color: $primary;
        }
    }
}
</style>
