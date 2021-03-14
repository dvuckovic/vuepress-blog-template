<template>
    <section class="PhotoAlbum my-4">
        <div
            v-if="hasLocation"
            class="btn-group mb-3 PhotoAlbum__ModeSwitch"
            role="group"
            aria-label="Switch mode">
            <button
                v-bind:class="{
                    active: mode === 'album',
                }"
                type="button"
                class="btn btn-light PhotoAlbum__ModeSwitch__Album"
                v-on:click="switchMode('album')">
                <BootstrapIcon
                    icon="image-fill"
                    size="md" />
                Album
            </button>
            <button
                type="button"
                v-bind:class="{
                    active: mode === 'map',
                }"
                class="btn btn-light PhotoAlbum__ModeSwitch__Map"
                v-on:click="switchMode('map')">
                <BootstrapIcon
                    icon="geo-fill"
                    size="md" />
                Map
            </button>
        </div>

        <transition name="PhotoAlbum__Fade">
            <div
                v-show="mode === 'album'"
                ref="photoAlbum"
                v-bind:data-pswp-uid="photoAlbum.id"
                class="PhotoAlbum__ImageGallery"
                itemscope
                itemtype="http://schema.org/ImageGallery"
                v-on:click="onThumbnailsClick">
                <figure
                    v-for="(photo, photoIndex) in photoAlbum.photos"
                    v-bind:key="photoIndex"
                    class="PhotoAlbum__Figure"
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject">
                    <a
                        v-bind:href="`${imagePaths.high}${photo.name}`"
                        v-bind:data-size="photo.size || '800x600'"
                        v-bind:data-name="photo.name"
                        v-bind:title="photo.title"
                        itemprop="contentUrl">
                        <img
                            v-bind:srcset="`${imagePaths.low}${photo.name}`"
                            v-bind:height="getThumbnailHeight(photo.size || '800x600')"
                            v-bind:alt="photo.title"
                            class="PhotoAlbum__Thumbnail"
                            itemprop="thumbnail">
                    </a>
                    <figcaption
                        class="PhotoAlbum__Figcaption"
                        itemprop="caption description">
                        {{ photo.title }}
                    </figcaption>
                </figure>
            </div>
        </transition>

        <transition name="PhotoAlbum__Fade">
            <GeotagMap
                v-if="mode === 'map'"
                v-bind:id="id"
                v-bind:zoom="zoom"
                v-bind:map-type="mapType" />
        </transition>

        <!-- Root element of PhotoSwipe. Must have class pswp. -->
        <div
            class="pswp"
            tabindex="-1"
            role="dialog"
            aria-hidden="true">
            <!-- Background of PhotoSwipe.
                It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg" />

            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">
                <!-- Container that holds slides.
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                    <div class="pswp__item" />
                    <div class="pswp__item" />
                    <div class="pswp__item" />
                </div>

                <!-- Default (PhotoSwipeUIDefault) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <!--  Controls are self-explanatory. Order can be changed. -->

                        <div class="pswp__counter" />

                        <button
                            class="pswp__button pswp__button--close"
                            title="Close (Esc)" />

                        <button
                            class="pswp__button pswp__button--share"
                            title="Share" />

                        <button
                            class="pswp__button pswp__button--fs"
                            title="Toggle fullscreen" />

                        <button
                            class="pswp__button pswp__button--zoom"
                            title="Zoom in/out" />

                        <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip" />
                    </div>

                    <button
                        class="pswp__button pswp__button--arrow--left"
                        title="Previous (arrow left)" />

                    <button
                        class="pswp__button pswp__button--arrow--right"
                        title="Next (arrow right)" />

                    <div class="pswp__caption">
                        <div class="pswp__caption__center" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

export default {
    components: {
        GeotagMap: () => import(/* webpackChunkName: "getag-map" */ './GeotagMap'),
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
            thumbnailWidth: 204,
            mode: 'album',
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

        isSafari () {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        },

        hasLocation () {
            return typeof this.photoAlbum.photos.find((photo) => photo.location) !== 'undefined';
        },
    },

    mounted () {
        this.initPhotoSwipeFromURL();

        // Thumbnails in Safari are kinda broken, do not calculate thumbnail width immediately.
        if (!this.isSafari) this.setThumbnailWidth();

        // Initialize the masonry layout.
        //   Dynamically import the library, because it's not SSR-friendly.
        //   eslint-disable-next-line new-cap
        import(/* webpackChunkName: "masonry-layout" */ 'masonry-layout').then(Masonry => new Masonry.default(
            this.$refs.photoAlbum,
            {
                itemSelector: '.PhotoAlbum__Figure',
                percentPosition: true,
                gutter: 5,
            }
        ));

        window.addEventListener('resize', this.setThumbnailWidth);
    },

    beforeDestroy () {
        window.removeEventListener('resize', this.setThumbnailWidth);
    },

    methods: {
        switchMode (mode) {
            this.mode = mode;
        },

        initPhotoSwipeFromURL () {
            // Parse URL and open gallery if it contains #&pid=3&gid=1.
            const hashData = this.photoswipeParseHash();
            if (hashData.pid) {
                this.openPhotoSwipe(hashData.pid, this.$refs.photoAlbum, true, true);
            }
        },

        parseThumbnailElements (el) {
            // Parse slide data (url, title, size ...) from DOM elements
            //   (children of gallerySelector).
            const thumbElements = el.childNodes;
            const numNodes = thumbElements.length;
            const items = [];
            let figureEl;
            let linkEl;
            let size;
            let item;

            for (let i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element

                // Include only element nodes.
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                [ linkEl ] = figureEl.children; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // Create slide object.
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    pid: linkEl.getAttribute('data-name'),
                };

                if (figureEl.children.length > 1) {
                    // <figcaption> content.
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url.
                    item.msrc = linkEl.children[0].getAttribute('srcset');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        },

        closest (el, fn) {
            // Find nearest parent element.
            return el && (fn(el) ? el : this.closest(el.parentNode, fn));
        },

        onThumbnailsClick (e) {
            // Triggers when user clicks on thumbnail.
            e = e || window.event;
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            const eTarget = e.target || e.srcElement;

            // find root element of slide
            const clickedListItem = this.closest(
                eTarget,
                (el) => (el.tagName && el.tagName.toUpperCase() === 'FIGURE')
            );

            if (!clickedListItem) {
                return false;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            const clickedGallery = clickedListItem.parentNode;
            const { childNodes } = clickedListItem.parentNode;
            const numChildNodes = childNodes.length;
            let nodeIndex = 0;
            let index;

            for (let i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                // eslint-disable-next-line no-restricted-globals
                history.replaceState('', document.title, window.location.pathname + window.location.search);

                // Open PhotoSwipe if valid index found.
                this.openPhotoSwipe(index, clickedGallery);
            }

            return false;
        },

        photoswipeParseHash () {
            // Parse picture index and gallery index from URL (#&pid=1&gid=2).
            const hash = window.location.hash.substring(1);
            const params = {};

            if (hash.length < 5) {
                return params;
            }

            const vars = hash.split('&');
            for (let i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                const pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                // eslint-disable-next-line prefer-destructuring
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        },

        openPhotoSwipe (index, galleryElement, disableAnimation, fromURL) {
            const pswpElement = document.querySelectorAll('.pswp')[0];
            const items = this.parseThumbnailElements(galleryElement);

            // Define options (if needed).
            const options = {
                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: (thumbIndex) => {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    const thumbnail = items[thumbIndex].el.getElementsByTagName('img')[0]; // find thumbnail
                    const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    const rect = thumbnail.getBoundingClientRect();

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width,
                    };
                },

                loop: false,
                closeOnScroll: true,
                history: true,
                galleryPIDs: true,
                shareEl: false,

                shareButtons: [
                    {
                        id: 'download',
                        label: 'Download image',
                        url: '{{raw_image_url}}',
                        download: true,
                    },
                ],
            };

            // PhotoSwipe opened from URL.
            if (fromURL) {
                if (options.galleryPIDs) {
                    // Parse real index when custom PIDs are used:
                    //   http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (let j = 0; j < items.length; j++) {
                        if (items[j].pid === index) {
                            options.index = j;
                            break;
                        }
                    }
                }
                else {
                    // In URL indexes start from 1.
                    options.index = parseInt(index, 10) - 1;
                }
            }
            else {
                options.index = parseInt(index, 10);
            }

            // Exit if index not found.
            if (Number.isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options);
            gallery.init();
        },

        setThumbnailWidth () {
            const thumbnail = document.querySelector('[itemprop=thumbnail]');
            if (thumbnail && thumbnail.width) this.thumbnailWidth = thumbnail.width;
        },

        getThumbnailHeight (geometry) {
            const [ width, height ] = geometry.split('x');
            return Math.round((this.thumbnailWidth * height) / width);
        },
    },
};
</script>

<style lang="scss">
.PhotoAlbum {
    p {
        font-family: 'Garamond', serif;
        font-size: 2rem;
    }

    &__Figure {
        width: calc(20% - 4px);
        margin: 0 0 5px;

        @media (max-width: 992px) {
            width: calc(25% - 4px);
        }

        @media (max-width: 768px) {
            width: calc(33% - 4px);
        }

        @media (max-width: 576px) {
            width: calc(50% - 4px);
        }
    }

    &__Thumbnail {
        min-width: 100%;
        border-radius: 0.25em;
        color: rgba(68, 68, 68, 0);
        vertical-align: middle;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        background-color: $secondary;
        animation-name: pulse-color;
        animation-duration: 1s;
        animation-iteration-count: infinite;

        &:hover {
            filter: brightness(0.5);
        }
    }

    &__Figcaption {
        display: none;
    }

    &__Columns {
        column-count: 5;
        column-width: 200px;
        column-gap: 0.5rem;

        .PhotoAlbum__Figure {
            width: unset;
            margin: 0 0 0.5rem;

            .PhotoAlbum__Thumbnail {
                width: 100%;
                min-width: unset;
                max-width: 100%;
                max-height: 100%;
            }
        }
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

        &:hover {
            color: $white;
            background-color: $primary;
        }

        &.active {
            color: $black;
            cursor: default;
            background-color: $cultured;
            box-shadow: inset  0 0 7px rgba(0, 0, 0, 0.5);
        }

        .bi {
            font-size: 1.2em;
        }
    }

    &__Fade {
        &-enter-active,
        &-leave-active {
            opacity: 1;
            transition: all 0.2s;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }
    }
}

.pswp {
    &__counter {
        font-family: 'Helvetica', sans-serif;
        font-weight: 500;
    }

    img#{&}__img {
        max-width: unset;
        border-radius: unset;
        margin: unset;
    }

    &__caption__center {
        font-family: 'Helvetica', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        max-width: none;
        text-align: center;
    }
}
</style>
