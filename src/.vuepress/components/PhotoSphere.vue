<template>
    <section class="PhotoSphere">
        <div
            v-bind:id="photoSphereId"
            class="mb-5 PhotoSphere__Viewer"
            v-bind:style="{ height: `${viewerHeight}px` }" />
    </section>
</template>

<script>
import { Viewer } from 'photo-sphere-viewer';
import GyroscopePlugin from 'photo-sphere-viewer/dist/plugins/gyroscope';
import InViewport from 'vue-in-viewport-mixin';

import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

// Dynamically inject the viewport mixin, but only if we are not in the unit test mode.
const mixins = [];
if (process.env.NODE_ENV !== 'test') mixins.push(InViewport);

export default {
    mixins,

    props: {
        id: {
            type: String,
        },
    },

    data () {
        return {
            viewerWidth: 1040,
        };
    },

    computed: {
        photoSphereId () {
            return `photo-sphere-${this._uid}`;
        },

        photoSphere () {
            if (this.id) return this.$frontmatter.panoramas.find((panorama) => panorama.id === this.id);
            return this.$frontmatter.panoramas[0] || {};
        },

        viewerHeight () {
            return Math.round((this.viewerWidth * 9) / 16); // AR 16:9
        },

        unitTestMode () {
            return process.env.NODE_ENV === 'test';
        },
    },

    watch: {
        // eslint-disable-next-line func-names
        'inViewport.fully': function (visible) {
            if (this.photoSphereViewer) {
                if (visible) this.photoSphereViewer.startAutorotate();
                else this.photoSphereViewer.stopAutorotate();
            }
        },
    },

    mounted () {
        this.initPhotoSphereViewer();

        this.$nextTick(() => {
            window.addEventListener('resize', this.setViewerWidth);
        });
    },

    beforeDestroy () {
        window.removeEventListener('resize', this.setViewerWidth);
        this.photoSphereViewer = null;
    },

    methods: {
        setViewerWidth () {
            if (document.querySelector('.PhotoSphere__Viewer')) {
                this.viewerWidth = document.querySelector('.PhotoSphere__Viewer').clientWidth;
            }
        },

        initPhotoSphereViewer () {
            if (this.unitTestMode) return;

            this.setViewerWidth();
            this.$nextTick(() => {
                this.photoSphereViewer = new Viewer({
                    container: document.querySelector(`#${this.photoSphereId}`),
                    panorama: this.photoSphere.panorama,
                    caption: this.photoSphere.caption,
                    navbar: [
                        'gyroscope',
                        'autorotate',
                        'zoom',
                        'fullscreen',
                        'caption',
                    ],
                    plugins: [
                        GyroscopePlugin,
                    ],
                });
            });
        },
    },
};
</script>

<style lang="scss">
.PhotoSphere {
    line-height: 1;

    &__Viewer {
        width: 100%;

        .psv {
            &-container {
                border-radius: 0.25em;
            }

            &-caption-content {
                font-family: 'Helvetica', sans-serif;
                font-weight: 500;
                font-size: 1rem;
                text-transform: uppercase;
            }
        }
    }
}
</style>
