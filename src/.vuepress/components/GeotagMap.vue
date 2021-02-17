<template>
    <div
        v-if="hasLocation"
        class="GeotagMap">
        <GmapMap
            v-bind:center="firstLocation"
            v-bind:zoom="zoom"
            v-bind:options="{
                fullscreenControl: false,
                streetViewControl: false,
            }"
            v-bind:map-type-id="mapType"
            class="mb-3">
            <GmapCluster
                v-bind:max-zoom="20"
                zoom-on-click>
                <GmapMarker
                    v-for="(m, index) in markers"
                    v-bind:key="index"
                    v-bind:position="m.position"
                    v-bind:icon="m.icon"
                    v-bind:title="`${m.title} (${m.name})`"
                    v-bind:clickable="true"
                    v-on:click="showPhoto(m.name, $event)" />
            </GmapCluster>
        </GmapMap>
    </div>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import zoom from 'medium-zoom';

if (
    typeof UNIT_TEST_MODE === 'undefined' && (
        !Vue.prototype.$env
        || (Vue.prototype.$env && !Vue.prototype.$env.GOOGLE_MAPS_API_KEY)
    )
) {
    console.warn(
        'Google Maps API is key is missing, did you forget to define the GOOGLE_MAPS_API_KEY value in the .env file?'
    );
}

Vue.use(VueGoogleMaps, {
    load: {
        key: Vue.prototype.$env && Vue.prototype.$env.GOOGLE_MAPS_API_KEY,
        libraries: 'drawing',
    },
});

export default {
    name: 'GeotagMap',

    components: {
        GmapCluster,
    },

    props: {
        id: {
            type: String,
        },

        mapType: {
            type: String,
            default: 'terrain',
        },

        zoom: {
            type: Number,
            default: 15,
        },
    },

    data () {
        return {
            mediumZoom: undefined,
            thumbnailSize: 72,
        };
    },

    computed: {
        photoAlbum () {
            if (this.id) return this.$frontmatter.albums.find((album) => album.id === this.id);
            return this.$frontmatter.albums[0] || {};
        },

        imagePaths () {
            return this.$frontmatter.paths;
        },

        google () {
            return VueGoogleMaps.gmapApi();
        },

        hasLocation () {
            return typeof this.photoAlbum.photos.find((photo) => photo.location) !== 'undefined';
        },

        firstLocation () {
            return this.getLocation(this.photoAlbum.photos.find((photo) => photo.location).location);
        },

        markers () {
            return this.photoAlbum.photos.map((photo) => ({
                position: this.getLocation(photo.location),
                name: photo.name,
                title: photo.title,
                size: photo.size,
                icon: {
                    url: `${this.imagePaths.low}${photo.name}`,
                    scaledSize: this.google
                        && this.google.maps
                        && new this.google.maps.Size(
                            this.getThumbnailWidth(photo.size),
                            this.getThumbnailHeight(photo.size)
                        ),
                    origin: this.google
                        && this.google.maps
                        && new this.google.maps.Point(0, 0),
                    anchor: this.google
                        && this.google.maps
                        && new this.google.maps.Point(0, 0),
                },
            }));
        },
    },

    methods: {
        getLocation (location) {
            if (!location) {
                return {
                    lat: 10,
                    lng: 10,
                };
            }

            return {
                lat: parseFloat(location.split(',')[0]),
                lng: parseFloat(location.split(',')[1]),
            };
        },

        getThumbnailWidth (size) {
            const [ width, height ] = size.split('x');
            if (width > height) return this.thumbnailSize;
            return Math.round((this.thumbnailSize * width) / height);
        },

        getThumbnailHeight (size) {
            const [ width, height ] = size.split('x');
            if (height > width) return this.thumbnailSize;
            return Math.round((this.thumbnailSize * height) / width);
        },

        showPhoto (name, event) {
            if (this.mediumZoom) this.mediumZoom.detach();

            const { target } = event.domEvent;

            target.setAttribute('srcset', `${this.imagePaths.high}${name}`);

            this.mediumZoom = zoom(target);
            this.mediumZoom.on('closed', () => {
                target.removeAttribute('srcset');
            });
            this.mediumZoom.open();
        },
    },
};
</script>

<style lang="scss">
.GeotagMap {
    height: 670px;

    .vue-map-container {
        width: 100%;
        height: 670px;
    }

    .vue-map {
        border-radius: 0.25em;
    }

    .btn {
        font-family: 'Helvetica', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        transition: none;
        color: $black;
        height: 38px;
        line-height: 38px;
        background: $white;
        padding: 0 15px;
        border: none;

        &-primary {
            &:hover {
                color: $white;
                background: $primary !important;
            }
        }

        &.active {
            background: $gainsboro;
        }
    }
}
</style>
