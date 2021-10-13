<template>
  <div>
    报名
    <button @click="btn">点我</button>
  </div>
</template>

<script>
import { list, pendingXHRMap } from '~/config/website';
export default {
  methods: {
    btn () {
      console.log(list);
      console.log(pendingXHRMap);
    }
  }
};
</script>

<style>

</style>
