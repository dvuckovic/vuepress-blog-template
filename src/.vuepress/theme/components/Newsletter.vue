<template>
    <SimpleNewsletter v-slot="{ slotProps }">
        <div class="Newsletter">
            <div class="Newsletter__Title">{{ slotProps.title }}</div>
            <div class="Newsletter__Content">{{ slotProps.content }}</div>
            <div class="Newsletter__Fields">
                <input
                    v-model="slotProps.mail"
                    class="Newsletter__Input"
                    type="email"
                    name="email"
                    aria-label="Email"
                    placeholder="Email"
                    required
                    autocapitalize="off"
                    autocorrect="off"
                    data-cy="email">
                <button
                    type="submit"
                    class="Newsletter__Button"
                    data-cy="submit">
                    {{ slotProps.submitText }}
                </button>
            </div>
        </div>
    </SimpleNewsletter>
</template>

<script>
import SimpleNewsletter from 'vuepress-plugin-mailchimp/src/components/SimpleNewsletter';

export default {
    components: {
        SimpleNewsletter,
    },
};
</script>
