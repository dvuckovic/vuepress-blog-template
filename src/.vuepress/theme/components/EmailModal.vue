<template>
    <div
        id="email-modal"
        class="modal fade"
        tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Hey there!</h2>
                </div>
                <div class="modal-body">
                    <p>The best way to get in touch with me directly is to drop me an email.</p>
                    <p>My email address is my <strong>given name</strong> at this website.</p>
                    <p v-if="publicKeys.smime">
                        <em>
                            If you want to send me a secure message, you can get my S/MIME certificate by
                            <NavLink
                                v-bind:link="publicKeys.smime"
                                class="NavLink--PublicKey">
                                clicking here
                                <BootstrapIcon
                                    icon="cloud-arrow-down-fill"
                                    size="21" />
                            </NavLink>
                        </em>
                    </p>
                    <p v-if="publicKeys.pgp">
                        <small>
                            <em>
                                Or, if you prefer PGP, get my public key by
                                <NavLink
                                    v-bind:link="publicKeys.pgp"
                                    class="NavLink--PublicKey">
                                    clicking here
                                    <BootstrapIcon
                                        icon="cloud-arrow-down-fill"
                                        size="21" />
                                </NavLink>
                            </em>
                        </small>
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal">
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        publicKeys () {
            return ((this.$themeConfig && this.$themeConfig.publicKeys) || {});
        },
    },
};
</script>
