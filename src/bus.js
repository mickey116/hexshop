import Vue from 'vue'

Vue.prototype.$bus = new Vue();

// AlertMessage
//this.$bus.$emit('message:push', message, status)
// message(String)訊息內容
// status(Stirng)Alert樣式 ex:'danger'