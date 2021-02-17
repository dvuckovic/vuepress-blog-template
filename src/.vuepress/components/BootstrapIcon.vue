<template>
    <i
        v-bind:class="iconClass"
        v-bind:style="{
            fontSize: `${size}px`,
        }"
        class="bi" />
</template>

<script>
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
    },

    computed: {
        iconClass () {
            return `bi-${this.icon}`;
        },
    },
};
</script>
