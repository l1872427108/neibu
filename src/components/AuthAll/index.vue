<template>
  <div>
    <slot v-if="check()" />
    <slot
      v-else
    />
  </div>
</template>

<script>
import { authAll } from '~/utils';

export default {
    name: 'AuthAll',
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        check () {
            return authAll(this.value);
        }
    }
};
</script>
