<template>
    <footer class="container-fluid flex-grow-1 Footer">
        <div class="container-lg my-3">
            <div class="row align-items-center">
                <div class="col-lg-3 order-3 order-lg-1">
                    <ul
                        v-if="copyright"
                        class="d-flex flex-row justify-content-center justify-content-lg-start m-0 list-unstyled"
                        role="menu">
                        <li
                            v-for="item in copyright"
                            v-bind:key="item.text"
                            class="Footer__Nav__Item"
                            role="menuitem">
                            <NavLink v-bind:link="item.link">
                                {{ item.text }}
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6 order-2 mt-1 mb-2 mb-lg-0 Footer__Center">
                    <ul
                        v-if="syndication"
                        class="d-flex flex-wrap justify-content-center m-0 list-unstyled"
                        role="menu">
                        <li
                            v-for="item in syndication"
                            v-bind:key="item.text"
                            class="mb-1 me-1 Footer__Nav__Item"
                            role="menuitem">
                            <NavLink
                                v-bind:link="item.link"
                                v-bind:rel="syndication.rel">
                                <img
                                    v-if="item.image"
                                    v-bind:src="item.image"
                                    v-bind:alt="item.text">
                                <template v-else>
                                    {{ item.text }}
                                </template>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-3 order-1 order-lg-3 mb-2 mb-lg-0">
                    <ul
                        v-if="links"
                        class="d-flex flex-row justify-content-center justify-content-lg-end m-0 list-unstyled"
                        role="menu">
                        <li
                            v-for="item in links"
                            v-bind:key="item.text"
                            class="Footer__Nav__Item"
                            role="menuitem">
                            <NavLink
                                v-bind:link="item.link"
                                v-bind:rel="item.rel"
                                v-bind:data-bs-toggle="item.toggle">
                                {{ item.text }}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        copyright () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []);
        },

        links () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.links) || []);
        },

        syndication () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.syndication) || {});
        },
    },
};
</script>

<style lang="scss">
.Footer {
    background-color: $dark;

    &__Center {
        .Footer__Nav__Item {
            img {
                opacity: 0.8;

                &:hover {
                    opacity: 1;
                }
            }

            &:after {
                display: none;
            }
        }
    }

    &__Nav {
        &__Item {
            font-size: 0.8125rem;

            &:after {
                content: '|';
                color: $light;
                margin-left: 5px;
                margin-right: 7px;
            }

            &:last-child:after {
                display: none;
            }

            a {
                color: $light;

                &:hover {
                    color: $primary;
                }
            }
        }
    }
}
</style>
