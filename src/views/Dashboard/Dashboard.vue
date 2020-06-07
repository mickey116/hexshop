<template>
<div>
<navbar></navbar>
<AlertMessage></AlertMessage>

<div class="container-fluid">
  <div class="row">
    <sidebar></sidebar>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <router-view></router-view>
      <router-view name="a"></router-view>
      <router-view name="b"></router-view>
    </main>
  </div>
</div>
  
  </div>
</template>

<script>
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AlertMessage from './AlertMessage'
export default {
  name:'Dashboard',
  components:{
    Navbar,
    Sidebar,
    AlertMessage
  }
}
</script>

<style lang="scss">
@import "./src/assets/_dashboard.scss"
  
</style>