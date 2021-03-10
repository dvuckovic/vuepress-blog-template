<template>
    <svg
        v-bind:class="{
            'BootstrapIcon--Spin': spin,
        }"
        v-bind:style="{
            fontSize: `${size}px`,
        }"
        class="BootstrapIcon">
        <use v-bind:xlink:href="`${svgSprite}#${icon}`" />
    </svg>
</template>

<script>
import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';

export default {
    name: 'BootstrapIcon',

    props: {
        icon: {
            type: String,
            default: 'x',
        },

        size: {
            type: String,
            default: '16',
        },

        spin: {
            type: Boolean,
        },
    },

    computed: {
        svgSprite () {
            return BootstrapIcons;
        },
    },
};
</script>

<style lang="scss">
.BootstrapIcon {
    fill: currentColor;
    width: 1em;
    height: 1em;
    margin-bottom: 0.125em;
    vertical-align: middle;

    &--Spin {
        animation: spin 2s infinite linear;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
