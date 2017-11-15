<template>
  <div class="app">
    <el-row class="index-header" v-if='isShowMenu'>
      <el-col :span='8' class="title">
        <p>合鑫泰工贸库存管理系统 <i>ver 2.0.0</i></p>
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
            <el-menu-item >导出当前表格</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main style="margin-top:60px">
      <keep-alive>
        <router-view @login-succ='loginSucc'></router-view>
      </keep-alive>
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
      activeIndex: "",
      showInForm:false,
      showOutForm:false,
      showChangeForm:false,
      isShowMenu:false
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

