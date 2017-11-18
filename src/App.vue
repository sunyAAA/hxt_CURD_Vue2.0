<template>
  <div class="app">
    <el-row class="index-header" v-if='isShowMenu'>
      <el-col :span='8' class="title">
        <p>合鑫泰工贸库存管理系统 <i style="font-size:10px">ver 2.0.0</i></p>
      </el-col>
      <el-col :span='6'>
        <el-menu mode="horizontal"  >
          <el-menu-item index='1' @click='outForm'>出库</el-menu-item>
          <el-menu-item index='2' @click='inForm'>入库</el-menu-item>
          <el-menu-item index='3' @click='changeForm'>修改</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='6'>
        <el-menu mode="horizontal" :default-active="activeIndex"  >
            <el-menu-item index='1'  @click="click('/detail')">明细</el-menu-item>
            <el-menu-item index='2'  @click="click('/total')">汇总</el-menu-item>
            <el-menu-item index='3'  @click="click('/account')">日志</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='4'>
        <el-menu mode="horizontal">
            <el-menu-item  index='0' @click='quit'>注销</el-menu-item>
            <el-menu-item  index='1' @click='back'>返回旧版</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main style="margin-top:60px">
      <router-view @login-succ='loginSucc'></router-view>
    </el-main>
    <el-dialog
      title="入库表"
      :visible.sync="showInForm">
      <in-form  @complete='closeInDialog'></in-form>
    </el-dialog>
    <el-dialog 
      title="出库表"
      width='65%'
      :visible.sync="showOutForm">
      <out-form></out-form>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync= 'showChangeForm'
    >
      <change-form  @complete='closeChangeDialog'></change-form>
    </el-dialog>
  </div>
</template>

<script>
import inForm from './components/inForm'
import outForm from './components/outForm'
import changeForm from './components/changeForm'
export default {
  name: "app",
  components: {inForm,outForm,changeForm},
  data() {
    return {
      /*视图控制相关 */
      activeIndex: "",
      showInForm:false,
      showOutForm:false,
      showChangeForm:false,
      isShowMenu:false,
      /*excel 相关变量*/ 
      idTmr:'',
      fileName:'',
      /*导出excel控制器*/
      excel:''
    };
  },
  methods:{
    click(path){
      this.$router.push({
          path:path
      })
    },
    changeForm(){
      this.showChangeForm = true
    },
    outForm(){
      this.showOutForm=true
    },
    inForm(){
      this.showInForm=true
    },
    closeInDialog(){
      this.showInForm = false;
    },
    closeChangeDialog(){
      this.showChangeForm = false;
    },
    loginSucc(){
      this.isShowMenu = true
    },
    /**浏览器判断 */
    getExplorer(){
         var explorer = window.navigator.userAgent;  
        //ie    
        if (explorer.indexOf("MSIE") >= 0) {  
            return 'ie';  
        }  
        //firefox    
        else if (explorer.indexOf("Firefox") >= 0) {  
            return 'Firefox';  
        }  
        //Chrome    
        else if (explorer.indexOf("Chrome") >= 0) {  
            return 'Chrome';  
        }  
        //Opera    
        else if (explorer.indexOf("Opera") >= 0) {  
            return 'Opera';  
        }  
        //Safari    
        else if (explorer.indexOf("Safari") >= 0) {  
            return 'Safari';  
        }  
    },
    quit(){
      sessionStorage['loginState'] = 'false';
      this.$router.push('login')
    },
    back(){
      location.href='http://hxtcurd.sc2yun.com/';
    }
  },
  watch: {
    $route(){
      if(sessionStorage['loginState']==='succ'){
        this.loginSucc = true;
      }
      switch(this.$route.name){
        case 'detail':this.activeIndex='1';break;
        case 'total':this.activeIndex='2';break;
        case 'account':this.activeIndex='3';break;
        default: this.activeIndex='1'
      }
    }
  },
  mounted () {
    if(sessionStorage['loginState']==='succ'){
      this.isShowMenu = true;
    }
  }
};
</script>

<style lang="stylus">
.app
  .index-header
    background #fff
    position fixed
    z-index 100
    top 0
    width 100%
    .title
      border-bottom: solid 1px #e6e6e6;
      position: relative;
      margin: 0;
      padding-left: 0;
      height 61px
      line-height 60px
      p
        padding-left 45px  
    .el-menu
      background transparent   
</style>

