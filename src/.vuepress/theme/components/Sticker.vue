<template>
    <component
        v-bind:is="tag || 'div'"
        class="Sticker"
        v-bind:class="needFloat ? ['stick-float'] : undefined"
        v-bind:style="needFloat ? { bottom: `${stickBottom}px` } : undefined">
        <slot />
    </component>
</template>

<script>
import { findContainerInVm } from './util';

export default {
    props: {
        stick: {
            type: String,
        },

        tag: {
            type: String,
        },
    },

    data () {
        return {
            needFloat: false,
            stickBottom: 0,
        };
    },

    watch: {
        stick () {
            this.unStick();
            this.stickHandle();
        },
    },

    mounted () {
        this.stickHandle();
    },

    beforeDestroy () {
        this.unStick();
    },

    methods: {
        stickHandle () {
            if (!this.stick) return;
            const stickElement = findContainerInVm(this.stick, this);
            if (!stickElement) return;
            this._stickerScroll = () => {
                const rect = this.$el.getBoundingClientRect();
                const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                this.needFloat = document.body.offsetHeight - scrollTop - rect.height < stickElement.offsetHeight;
                this.stickBottom = stickElement.offsetHeight;
            };

            this._stickerScroll();
            window.addEventListener('scroll', this._stickerScroll);
        },

        unStick () {
            this.needFloat = false;
            this.stickBottom = 0;
            window.removeEventListener('scroll', this._stickerScroll);
        },
    },
};
</script>
