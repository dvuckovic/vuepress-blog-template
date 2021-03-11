<!-- eslint-disable vue/no-v-html -->

<template>
    <div
        id="email-modal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2
                        class="modal-title"
                        v-html="$themeConfig.emailModal && $themeConfig.emailModal.title" />
                </div>
                <div
                    class="modal-body"
                    v-html="$themeConfig.emailModal && $themeConfig.emailModal.body" />
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        v-html="$themeConfig.emailModal && $themeConfig.emailModal.button" />
                </div>
            </div>
        </div>
    </div>
</template>
