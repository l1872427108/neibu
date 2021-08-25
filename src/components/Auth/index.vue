<template>
  <div>
    <slot v-if="check()" />
    <slot v-else />
  </div>
</template>

<script>
import {auth} from '../../utils';
export default {
    name: 'Auth',
    props: {
        value: {
            type: [String, Array],
            default: ''
        }
    },
    methods: {
        check () {
            return auth(this.value);
        }
    }
};
</script>

<style>

</style>