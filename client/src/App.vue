<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch: {
    '$route':{
      handler: (to) => {
        document.title = to.meta.title || 'ANIMOSIS'
      },
        immediate: true
    }
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

</style>
