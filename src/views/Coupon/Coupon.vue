<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr class="text-center">
          <th>名稱</th>
          <th width="120">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false,item)">編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination :pagination="pagination" @getProducts="getCoupons"></Pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew" >新增優惠券</span>
              <span v-else >編輯 {{tempCoupon.title}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="due_date" />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- DelModoal -->
<div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除優惠券</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="delCoupon"
          >確認刪除</button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script>
import $ from "jquery";
import Pagination from '../Dashboard/Pagination'
export default {
  name: "Coupon",
  components:{
    Pagination
  },
  data() {
    return {
      coupons: [],
      tempCoupon:{},
      // 如果沒有指定參數，物件預設值為產生物件的日期與本地時間
      // 本地時間是指執行 JavaScript new Date() 的用戶電腦時間
      due_date:new Date(),
      isNew:false,
      isLoading:false,
      pagination:{},
    };
  },
  watch: {
    due_date() {
      const vm = this;
      // 選擇日期後，vm.due_date 會變成 "2020-01-15" 的這種格式
      // 而 new Date("2020-01-15") 等於 1579046400000 (毫秒)
      // 所以透過 Math.floor(new Date("2020-01-15") / 1000) 可以得到時間戳 (秒)
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    }
	},
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.axios.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination
      });
    },
    openCouponModal(isNew,item){
      const vm =this;
      if(isNew){
        vm.due_date = new Date(); // 修正「點過其他優惠券的編輯 Modal 後，點擊建立優惠券會自動帶入上個優惠券日期」的 bug
        this.tempCoupon = {},
        this.isNew =true;
      }else{
        this.tempCoupon = Object.assign({},item); // 把點選的優惠券資訊 assign 給 tempCoupon
        this.isNew = false;
        // new Date(timestamp*1000) : 將取得的 timestamp 轉成可讀的時間
        // 2011-10-05T14:48:00.000Z => 以字母 "T" 區分開後，取前面 [0] 的部分
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        vm.due_date = dateAndTime[0];
      }

      $('#couponModal').modal('show');

    },
    openDelCouponModal(item){
      const vm =this;
      $('#delCouponModal').modal('show')
      vm.tempCoupon = Object.assign({}, item);
    },
    delCoupon(){
      const vm =this;
      const api =`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      this.axios.delete(api,vm.tempCoupon).then((response) => {
        $('#delCouponModal').modal('hide');
        vm.getCoupons();
    })

    },
    updateCoupon(){
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      const vm = this;
      let httpMethod ='post'
      if(!vm.isNew){
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod ='put'
        // 編輯完成後，將 vm.due_date 轉回 "Wed Jan 15 2020 16:01:52 GMT+0800 (台北標準時間)" 的格式
        // vm.due_date = new Date(vm.tempCoupon.due_date * 1000) ;

      }
      this.axios[httpMethod](api,{ data:vm.tempCoupon }).then(response => {
        console.log(response.data);
        if(response.data.success){
          $('#couponModal').modal('hide')
          vm.getCoupons()
        }else{
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗');
          
        }
        
      });
    }  
  },
  created() {
    this.getCoupons();
  },
}
</script>

<style lang="scss">
@import "./src/assets/_dashboard.scss";
</style>