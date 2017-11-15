<template>
  <div class="change-form">
    <el-form :model="changeForm" :rules="rules" ref='changeForm'>
      <el-form-item label='商品编号' prop='pid'>
        <el-input v-model="changeForm.pid" @blur='getInfo'></el-input>
      </el-form-item>
    </el-form>
      <el-row :gutter="20" style="width:100%;text-align:center">
        <el-col :span='6'>名称</el-col>
        <el-col :span='6'>规格</el-col>
        <el-col :span='6'>单位</el-col>
        <el-col :span='6'>品种</el-col>
      </el-row>
      <el-row :gutter="20" style="width:100%;text-align:center;margin:10px 0" v-if='productInfo'>
        <el-col :span='6'>{{productInfo.name}}</el-col>
        <el-col :span='6'>{{productInfo.spec}}</el-col>
        <el-col :span='6'>{{productInfo.unit}}</el-col>
        <el-col :span='6'>{{productInfo.breed}}</el-col>
      </el-row>
      <el-row :gutter="20" style="width:100%;text-align:center">
        <el-col :span='6'>
          <el-input v-model="params.name"></el-input>
        </el-col>
        <el-col :span='6'>
          <el-input v-model="params.spec"></el-input>
        </el-col>
        <el-col :span='6'>
          <el-input v-model="params.unit"></el-input>
        </el-col>
        <el-col :span='6'>
          <el-input v-model="params.breed"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="marginTop:15px">
      <el-col :span='12'>
        <el-button type="success" plain style="width:100%" @click='submit' :disabled="checked" >提交</el-button>
      </el-col>
      <el-col :span='12'>
        <el-button  type="primary" plain style="width:100%" @click='complete'>完成</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      changeForm:{
        pid:''
      },
      rules:{
        pid: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
      },
      productInfo:{
        name:'',
        spec:'',
        unit:'',
        breed:''
      }, 
      params:{
        name:'',
        spec:'',
        unit:'',
        breed:''
      },
      checked:true
    }
  },
  methods: {
    getInfo(){
      this.$http.get('/apis/revise.php?pid='+this.changeForm.pid).then(res=>{
        if(res.data){
          this.productInfo = res.data
          this.checked = false
        }else{
          this.missAlert()
        }
      })
    },
    submit(){
      if(this.checkSubmit()){
        this.$http.get('/apis/revise.php?pid='+this.changeForm.pid+
                                        '&r-name='+this.params.name+
                                        '&r-spec='+this.params.spec+
                                        '&r-unit='+this.params.unit+
                                        '&r-breed='+this.params.breed)
                .then(res=>{
                      if(res.data.msg=='succ'){
                        this.succAlert()
                        this.getInfo()
                      }else{
                        this.errAlert()
                      }
                    })
      }else{
        this.errAlert()
      }
    },
    checkSubmit(){
      for(let key in this.params){
        if(this.params[key]===''){
          return false
        }
        return true
      }
    },
    errAlert() {
      const h = this.$createElement;
      this.$notify.error({
        title: "操作失败",
        message: h("p", { style: "color: teal" }, '数据未发生变动，请检查网络波动或表单数据是否正确'),
        offset: 300,
      });
      this.inSubmit = false;
    },
    succAlert() {
      const h = this.$createElement;
      this.$notify({
        title: "操作成功",
        message: h("p", { style: "color: teal" }, "商品编号："+this.changeForm.pid+" 修改成功"),
        offset: 300,
        type: "success"
      });
      this.inSubmit = false;
    },
    missAlter(){
      this.$notify.info({
        title: '提醒',
        message: '未找到当前编号的商品信息',
        offset: 300
      });
    },
    complete(){
      this.$emit('complete');
    }
  }
}
</script>

