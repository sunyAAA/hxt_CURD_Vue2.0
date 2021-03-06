// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VResource from 'vue-resource'
import { Button, Select,Container,Aside,Main,Form,FormItem,Input,InputNumber,Menu,MenuItem,Header,Row,Col,Table
  ,TableColumn,Loading,Pagination,DatePicker,Dialog,Notification
} from 'element-ui'

Vue.use(VResource)
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Dialog)

Vue.prototype.$notify = Notification

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // alert(sessionStorage.getItem('accessToken'))
  //    console.log(to);
     if ((to.path!='/login')&&sessionStorage['loginState'] != 'succ') {
         next({
             path: 'login',
             // query: { redirect: to.fullPath }
         })
     } else {
         next()
     }
 })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/*  定义全局方法  */ 
/*  时间戳格式化  */
Vue.prototype.toDate = function(value){
  if(value==0){
    return "无记录"
  }
    var oDate = new Date(value);
    return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate();
}
Vue.prototype.toFullDate =function(value) {
  var datetime = new Date(value)
  var year = datetime.getFullYear(),
  month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1):datetime.getMonth() + 1,
  day = datetime.getDate() < 10 ? '0' +  datetime.getDate() : datetime.getDate(),
  hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours(),
  min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes(),
  sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + '：' + min + '：' + sec;
}
/*网络通信错误提示窗*/
Vue.prototype.resErroAlert = function(){
    this.$notify({
      title: '警告',
      message: '通信错误！请调整网络或者稍后再试',
      type: 'warning',
      offset: 300
    });
}
