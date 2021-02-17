<template>
    <div
        v-bind:id="objectVR.id"
        class="mb-5 mx-auto ObjectVR" />
</template>

<script>
export default {
    props: {
        id: {
            type: String,
        },
    },

    computed: {
        objectVR () {
            if (this.id) return this.$frontmatter.objects.find((object) => object.id === this.id);
            return this.$frontmatter.objects[0] || {};
        },
    },

    mounted () {
        // Initialize the object VR player.
        //   Dynamically import the library, because it's not SSR-friendly.
        //   It will provide a constructor via the global window object.
        if (
            this.$env
            && this.$env.OBJECT2VR_PLAYER
        ) {
            this.$loadScript(this.$env.OBJECT2VR_PLAYER).then(() => {
                // eslint-disable-next-line new-cap,no-undef
                const o2vrPlayer = new object2vrPlayer(this.objectVR.id);
                o2vrPlayer.readConfigUrl(this.objectVR.config);
            }).catch(() => {});
        }
        else if (typeof UNIT_TEST_MODE === 'undefined') {
            console.warn(
                'Object2VR address is missing, did you forget to define the OBJECT2VR_PLAYER value in the .env file?'
            );
        }
    },
};
</script>

<style lang="scss">
.ObjectVR {
    width: 600px;
    height: 600px;
    max-width: 100%;

    & > div > div {
        border-radius: 0.25em;
    }
}
</style>
