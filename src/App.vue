<template>
  <div class="app">
    <el-row class="index-header">
      <el-col :span='8' class="title">
        <p>合鑫泰工贸库存管理系统 <i>ver 2.0.0</i></p>
      </el-col>
      <el-col :span='6'>
        <el-menu mode="horizontal"  >
          <el-menu-item index='1'>出库</el-menu-item>
          <el-menu-item index='2' @click='inForm'>入库</el-menu-item>
          <el-menu-item index='3'>修改</el-menu-item>
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
            <el-menu-item index='1'>打印</el-menu-item>
            <el-menu-item index='2'>导出</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main style="margin-top:60px">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
    <el-dialog
      title="入库表"
      :visible.sync="showInForm">
      <in-form  @complete='closeDialog'></in-form>
    </el-dialog>
  </div>
</template>

<script>
import inForm from './components/inForm'
export default {
  name: "app",
  components: {inForm},
  data() {
    return {
      activeIndex: "",
      showInForm:false
    };
  },
  methods:{
    click(path){
      this.$router.push({
          path:path
      })
    },
    inForm(){
      this.showInForm=true
    },
    closeDialog(){
      this.showInForm = false;
    }
  },
  watch: {
    $route(){
      switch(this.$route.name){
        case 'detail':this.activeIndex='1';break;
        case 'total':this.activeIndex='2';break;
        case 'account':this.activeIndex='3';break;
        default: this.activeIndex='1'
      }
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

