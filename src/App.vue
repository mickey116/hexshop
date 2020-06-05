<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  created(){
    // console.log(process.env.VUE_APP_APIPATH)
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
    this.axios.get(api).then((response) => {
      console.log(response.data)
    })
  }
}
</script>

<style lang="scss">
@import "./assets/all.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
