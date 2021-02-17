<template>
    <li class="text-uppercase PostTag">
        <router-link
            v-bind:to="`/tag/${tag}`"
            class="me-3">
            <span>
                {{ tag }}
            </span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'PostTag',

    props: {
        tag: {
            type: String,
            required: true,
        },
    },
};
</script>
