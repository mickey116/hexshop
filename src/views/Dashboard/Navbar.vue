<template>
  <div>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="#" @click.prevent="logout">登出</a>
    </li>
  </ul>
</nav> 

  </div>
</template>

<script>
export default {
  name:'Navbar',
  methods: {
    logout(){
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm =this;
      this.axios.post(api).then((response) => {
      console.log(response.data)
      if(response.data.success){
        vm.$router.push('/login')
      }
    })
      
    }
    
  },
}
</script>

<style lang="scss">
@import "./src/assets/_dashboard.scss"
  
</style>