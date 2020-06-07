<template>
  <div>
  <Loading :active.sync="isLoading"></Loading>
  <table class="table mt-5">
    <thead>
      <tr class="text-center">
          <th  width="120">購買時間</th>
          <th  width="200">E-mail</th>
          <th >購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in orders" :key="item.id" 
        :class="{'text-secondary': !item.is_paid}">
        <th>{{item.create_at | date}}</th>
        <th>{{item.user.email}}</th>
        <th>
          <ul class="list-unstyled">
            <li v-for="(product,key) in item.products" :key="key">
              {{ product.product.title }}  數量：{{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </th>
        <th class="text-right">
          {{item.total | currency}}
        </th>
        <th>
          <span v-if="item.is_paid == 1" class="text-success">已付款</span>
          <span v-else>未付款</span>
        </th>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <Pagination :pagination="pagination" @getProducts="getOrders"></Pagination>


  </div>
</template>

<script>
import Pagination from '../Dashboard/Pagination'
export default {
  name:'Order',
  components:{
    Pagination
  },
  data() {
    return {
      orders:[],
      isLoading:false,
      pagination:{},
    }
  },
  methods: {
    getOrders(page = 1){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm =this;
      vm.isLoading =true;
      this.axios.get(api).then((response) => {
      console.log(response.data)
      vm.isLoading = false;
      vm.orders = response.data.orders;
      vm.pagination = response.data.pagination
    })
    }
  },
  created() {
    this.getOrders();
  },
  
}
</script>

<style lang="scss">
@import "./src/assets/_dashboard.scss"
  
</style>