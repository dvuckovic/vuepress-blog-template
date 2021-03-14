<template>
    <header
        class="container-fluid position-relative Header"
        v-bind:class="{
            'Header--ImageBackground': isHome || isError,
        }"
        v-bind:style="{
            backgroundImage,
        }">
        <nav class="navbar navbar-expand-sm navbar-dark">
            <div class="container-lg">
                <NavLink
                    link="/"
                    class="navbar-brand">
                    <img
                        v-if="$themeConfig.logo"
                        v-bind:src="$themeConfig.logo"
                        v-bind:alt="$site.title"
                        v-bind:title="$site.title"
                        height="32"
                        class="d-block position-relative">
                    <template v-else>
                        {{ $site.title }}
                    </template>
                </NavLink>
                <button
                    v-bind:disabled="!isUnitTestMode && isMenuTransitioning"
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    v-on:click="isMenuOpen = !isMenuOpen">
                    <BootstrapIcon
                        v-bind:icon="isMenuOpen ? 'x' : 'list'"
                        size="lg" />
                </button>
                <div
                    id="navbar"
                    class="collapse navbar-collapse"
                    v-on:transitionstart="onMenuTransitionStart"
                    v-on:transitionend="onMenuTransitionEnd">
                    <ul
                        v-if="$themeConfig.nav"
                        class="navbar-nav align-items-end me-auto text-uppercase"
                        role="menu">
                        <li
                            v-for="item in $themeConfig.nav"
                            v-bind:key="item.text"
                            class="position-relative nav-item"
                            role="menuitem">
                            <NavLink
                                v-bind:link="item.link"
                                class="nav-link">
                                {{ item.text }}
                            </NavLink>
                        </li>
                    </ul>
                    <ul class="navbar-nav justify-content-end align-items-end Header__Nav__Right">
                        <li class="nav-item">
                            <SearchBox class="pe-4" />
                        </li>
                        <li class="nav-item">
                            <Feed class="pe-4" />
                        </li>
                        <li
                            v-for="(item, index) in contact"
                            v-bind:key="item.iconComponent"
                            class="nav-item">
                            <NavLink
                                v-bind:link="item.link"
                                v-bind:title="item.text"
                                v-bind:class="{
                                    'pe-4': index < contact.length - 1
                                }"
                                class="position-relative d-block">
                                <BootstrapIcon
                                    v-bind:icon="item.icon"
                                    size="md" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div
            v-if="isHome || isError"
            class="container-lg mb-2">
            <div class="row">
                <div class="col position-relative text-center Header__Content">
                    <template v-if="isHome">
                        <h1>{{ $site.title }}</h1>
                        <h2>{{ $site.description }}</h2>
                    </template>
                    <template v-else>
                        <h1>{{ $themeConfig.errorTitle }}</h1>
                        <h2>{{ $themeConfig.errorDescription }}</h2>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import SearchBox from '@SearchBox';
import Feed from './Feed';

export default {
    components: {
        SearchBox,
        Feed,
    },

    data () {
        return {
            isMenuOpen: false,
            isMenuTransitioning: false,
        };
    },

    computed: {
        contact () {
            return ((this.$themeConfig.contact) || [])
                .map(({ type, link, text }) => ({
                    icon: this.getIcon(type).icon,
                    link,
                    text,
                }));
        },

        isHome () {
            return this.$route.meta && this.$route.meta.pid === 'post';
        },

        isError () {
            return this.$route.name === undefined;
        },

        backgroundImage () {
            if (this.isHome && this.$themeConfig.coverHome) return `url('${this.$themeConfig.coverHome}')`;
            if (this.isError && this.$themeConfig.coverError) return `url('${this.$themeConfig.coverError}')`;
            return undefined;
        },

        isUnitTestMode () {
            return typeof Cypress !== 'undefined';
        },
    },

    methods: {
        getIcon (contactType) {
            let icon;

            switch (contactType) {
                case 'github':
                    icon = 'github';
                    break;
                case 'facebook':
                    icon = 'facebook';
                    break;
                case 'instagram':
                    icon = 'instagram';
                    break;
                case 'linkedin':
                    icon = 'linkedin';
                    break;
                case 'mail':
                    icon = 'envelope-fill';
                    break;
                case 'music':
                    icon = 'music-note';
                    break;
                case 'phone':
                    icon = 'telephone-fill';
                    break;
                case 'twitter':
                    icon = 'twitter';
                    break;
                case 'video':
                    icon = 'camera-video-fill';
                    break;
                case 'web':
                    icon = 'globe-2';
                    break;
                case 'youtube':
                    icon = 'youtube';
                    break;
                default:
                    icon = 'link-45deg';
            }

            return {
                icon,
            };
        },

        onMenuTransitionStart () {
            this.isMenuTransitioning = true;
        },

        onMenuTransitionEnd () {
            this.isMenuTransitioning = false;
        },
    },
};
</script>

<style lang="scss">
.Header {
    background-color: $dark;
    font-size: 0.8125rem;

    &__Nav {
        &__Menu {
            margin: 0 0 0 -12px;
        }

        &__Right {
            flex-direction: row !important;
        }
    }

    &--ImageBackground {
        background: $dark no-repeat 50%;
        background-size: auto;
        background-size: cover;

        &:before {
            content: '';
            background: rgba(0, 0, 0, 0.6);
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            display: block;
        }
    }

    &__Content {
        min-height: 115px;
        max-height: 330px;
        padding: 6vw 3vw;

        h1,
        h2 {
            position: relative;
            color: $white;
        }

        h1 {
            font-size: 3.5rem;
            font-weight: 600;
            margin: 0 0 0 -2px;
            padding: 0;
            line-height: 1;
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 300;
            margin: 0;
            padding: 5px 0;
            line-height: 1.4;
            opacity: 0.8;
        }
    }

    @media (max-width: 576px) {
        .Header__Nav__Right {
            padding-top: 8px;
        }
    }
}

.nav {
    &-item {
        .Header__Nav__Right & {
            @media (max-width: 576px) {
                & {
                    padding-bottom: 16px;
                }
            }
        }
    }

    &-link {
        .navbar-dark .navbar-nav &.NavLink {
            display: inline-block;
            transition: none;
            color: $white;
            font-weight: 500;

            &:focus,
            &:hover {
                color: $primary;
            }
        }

        &:hover {
            color: $primary;
        }
    }
}

.navbar {
    &-toggler[type=button] {
        border: none;
        padding: 0;

        &:focus {
            box-shadow: none;
        }

        .navbar-dark & {
            color: $white;

            &:hover {
                color: $primary;
            }
        }
    }
}

.search-box {
    margin-right: 0;

    @media (max-width: 719px) {
        & {
            margin-right: 0;
        }
    }

    input {
        color: $davys;
        opacity: .8;
        font-size: 0.75rem;
        font-weight: 600;
        width: 175px;
        line-height: unset;
        height: 24px;
        border-color: transparent;
        background-size: 15px;
        background-position-x: 5px;
        background-position-y: 4px;
        padding-left: 24px;

        &:hover,
        &:focus {
            opacity: 1;
        }

        &:focus {
            padding-left: 24px;
            width: 175px;
        }

        @media (max-width: 959px) {
            & {
                position: unset;
                border-color: transparent;

                &:focus {
                    width: 175px;
                }
            }
        }

        @media (max-width: 768px) {
            & {
                width: 0;
                padding-left: 16px;

                &:focus {
                    width: 175px;
                }
            }
        }

        @media (max-width: 719px) {
            & {
                width: 0;
                left: 16px;

                &:focus {
                    width: 100px;
                }
            }

            & + .suggestions {
                right: unset;
            }
        }

        @media (max-width: 575px) {
            & {
                width: 100%;
                padding-left: 24px;

                &:focus {
                    width: 100%;
                }
            }
        }
    }

    li {
        margin: 0;
    }

    .suggestions {
        top: 23px;
        z-index: 1000;
    }

    .suggestion {
        line-height: 1.2;
        padding: 0;

        a {
            width: 100%;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: $davys;

            &:hover {
                text-decoration: none;
                color: $primary;
            }

            .page-title,
            .header {
                font-size: 0.75rem;
                font-weight: 600;
            }
        }
    }
}
</style>
