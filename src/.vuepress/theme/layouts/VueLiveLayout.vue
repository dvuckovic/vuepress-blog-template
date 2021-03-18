<template functional>
    <div class="VueLive">
        <div class="row">
            <div class="col position-relative mt-1">
                <pre v-bind:class="`language-${props.lang} VueLive__Editor`"><slot name="editor" /></pre>
                <div
                    class="position-absolute bottom-0 end-0 me-4 mb-1 text-secondary text-uppercase
                        VueLive__EditorHint">
                    <small>Code</small>
                    <BootstrapIcon icon="pencil-square" />
                </div>
            </div>
        </div>
        <div class="row g-0 mb-4">
            <div class="col position-relative p-3 text-light VueLive__Preview">
                <slot name="preview" />
                <div class="position-absolute bottom-0 end-0 mb-1 text-dark text-uppercase VueLive__PreviewHint">
                    <small>Preview</small>
                    <BootstrapIcon icon="code-square" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'prismjs/themes/prism-tomorrow.css';
import 'vue-prism-editor/dist/prismeditor.min.css';

export default {};
</script>

<style lang="scss">
.VueLive {
    pre.VueLive__Editor {
        margin: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    &__EditorHint {
        font-family: sans-serif;
        font-size: 1rem;
    }

    &-squiggles-wrapper {
        position: absolute;
    }

    .prism-editor__container > textarea {
        outline-style: unset;
    }

    &__Preview {
        border-radius: 0.25em;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: $secondary;
    }

    &__PreviewHint {
        margin-right: 0.75em;
        font-family: sans-serif;
        font-size: 1rem;
    }
}
</style>
