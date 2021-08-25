<template>
  <footer class="copyright">
    Copyright © {{ $store.state.settings.copyrightDates }}
    <component v-bind="linkProps">
      {{ $store.state.settings.copyrightCompany }}
    </component>
  </footer>
</template>

<script>
export default {
    name: 'Copyright',
    methods: {
        linkProps() {
            if (this.$store.state.settings.copyrightWebsite) {
                return {
                    is: 'a',
                    href: this.$store.state.settings.copyrightWebsite,
                    target: '_blank',
                    rel: 'noopener'
                }
            } else {
                return {
                    is: 'span'
                }
            }
    }
};
</script>

<style>

</style>