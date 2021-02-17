<template>
    <div class="Layout">
        <BaseListLayout v-if="$pagination" />
        <template v-else>
            <div class="container-lg px-3">
                <div class="row justify-content-center">
                    <div class="col mt-4">
                        <Content class="Content" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss">
.Content {
    padding-bottom: 50px;
    font-family: 'Garamond', serif;
    font-size: 1rem;

    @media (min-width: 768px) {
        font-size: 1.125rem;
    }

    @media (min-width: 992px) {
        font-size: 1.25rem;
    }

    @media (max-width: 992px) {
        padding-bottom: 50px;
    }

    @media (max-width: 768px) {
        padding-bottom: 30px;
    }

    &:empty {
        display: none;
    }

    a {
        color: $primary;

        &:hover {
            text-decoration: underline;
        }

        & > span > .icon.outbound {
            color: $silver;
            margin-left: 4px;

            &:hover {
                color: $primary;
            }
        }
    }

    em,
    strong {
        color: $white;
    }

    img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
        border-radius: 0.25em;

        & + span > .icon.outbound {
            color: $silver;
            float: right;
            margin-right: -20px;
            margin-top: -15px;

            &:hover {
                color: $primary;
            }
        }

        &[src*='#invert'] {
            filter: invert(100%);
            border-radius: 0;
        }

        &[src*='#rect'] {
            border-radius: 0;
        }

        &[src*='#icon'] {
            float: left;
            margin-left: -70px;

            @media (max-width: 767px) {
                & {
                    display: none;
                }
            }
        }

        &[src*='#half'] {
            float: left;
            width: 48%;
            margin-right: 2%;
            margin-bottom: 15px;
        }
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
        color: $cultured;
        margin-top: 1em;
    }

    code {
        color: $white;
        background: $rich;
        font-weight: 400 !important;
        border-radius: 0.25em;
    }

    li,
    p {
        code {
            padding: 0 5px 2px;
        }
    }

    pre {
        font-size: 0.875rem;
        margin: 21px 0;
        color: $cultured;
        background: $rich;
        border-radius: 0.25em;
    }

    pre ::selection {
        color: $white;
        background: $primary;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
        display: inline-block;
        margin: 16px 0 32px;
        max-width: 100%;
        width: auto;
        border-spacing: 0;
        border-collapse: collapse;
        font-family: 'Helvetica', sans-serif;
        font-weight: 500;
        vertical-align: top;

        td {
            font-size: 1rem;
        }

        td:first-child {
            text-align: center;
        }

        td:last-child {
            background-image: linear-gradient(270deg, $white 50%, hsla(0, 0%, 100%, 0));
            background-position: 100% 0;
            background-size: 20px 100%;
            background-repeat: no-repeat;
        }

        th {
            color: $rich;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: .2px;
            text-align: center;
            text-transform: uppercase;
            background-color: $white;
        }

        td,
        th {
            padding: 6px 12px;
            border: 1px solid $cultured;
        }

        td:first-child {
            background-image: linear-gradient(90deg, $jet 50%, rgba(25, 27, 31, 0));
        }

        td:last-child {
            background-image: linear-gradient(270deg, $jet 50%, rgba(25, 27, 31, 0));
        }

        th {
            color: hsla(0, 0%, 100%, .85);
            background-color: $davys;
        }

        td,
        th {
            border: 1px solid $davys;
        }
    }
}
</style>
