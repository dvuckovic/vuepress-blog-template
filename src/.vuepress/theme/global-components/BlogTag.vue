<template>
    <NavLink
        v-bind:link="tag.path"
        class="btn btn-lg me-3 mb-3 text-uppercase BlogTag">
        {{ tag.name }}
        <span class="badge BlogTag__Badge">
            {{ tag.pages.length }}
        </span>
    </NavLink>
</template>

<script>
export default {
    props: {
        tag: {
            type: Object,
        },
    },
};
</script>

<style lang="scss">
.BlogTag {
    background: $white;
    font-size: 0.8125rem;
    font-weight: 500;

    &:hover {
        background: $primary;
        color: $white;
    }

    &__Badge {
        background: $black;
    }
}
</style>
