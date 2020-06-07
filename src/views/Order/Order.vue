<template>
  <div>
  <table class="table mt-5">
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th></th>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
export default {
  name:'Order',
  data() {
    return {
      orders:[]
    }
  },
  methods: {
    getOrders(page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm =this;
      //vm.isLoading =true;
      this.axios.get(api).then((response) => {
      console.log(response.data)
      //vm.isLoading = false;
      // vm.orders = response.data.products;
      // vm.pagination = response.data.pagination
    })
    }
  },
  
}
</script>

<style lang="scss">
@import "./src/assets/_dashboard.scss"
  
</style>