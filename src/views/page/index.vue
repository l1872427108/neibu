<template>
  <div>
    <Upload :url="image" action="#" name="image" :width="250" :height="150" :data="{'token':'1'}" @success="handleSuccess"></Upload>
  </div>
</template>

<script>
import Upload from '../../components/Upload';
export default {
  components: {
    Upload
  },
  data () {
    return {
      image: ''
    };
  },
  methods: {
    handleSuccess (res) {
      console.log(res);
    }
  }
};
</script>

<style>

</style>
