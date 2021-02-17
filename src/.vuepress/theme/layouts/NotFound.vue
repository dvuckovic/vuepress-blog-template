<template>
    <div class="container-lg my-4 NotFound">
        <div class="row just justify-content-center">
            <section class="col-md-9 NotFound__Content">
                <p>
                    <small>Sorry, but we couldn't find the page you were looking for...</small>
                </p>
                <p>
                    <small>
                        We suggest you try to use the search box, or go to the <NavLink link="/">home page</NavLink>
                        instead.
                    </small>
                </p>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.NotFound {
    &__Content {
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

        em {
            color: $white;
        }
    }
}
</style>
