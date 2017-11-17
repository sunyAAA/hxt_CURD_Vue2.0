<template>
  <div class="out-form">
    <el-form :model="outForm" :rules="rules" ref='outForm'>
      <el-row :gutter="20">
        <el-col :span='12'>
          <el-form-item label='订单编号' prop='orderId'>
            <el-input v-model="outForm.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="商品编码" prop='pid'>
            <el-input v-model="outForm.pid" @blur="getProductInfo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table border stripe
      :data='productData'
    >
      <el-table-column
        label='名称'
        prop='name'
      ></el-table-column>
      <el-table-column
        label='数量'
        prop='count'
      ></el-table-column>
      <el-table-column
        label='单位'
        prop='unit'
      ></el-table-column>
      <el-table-column
        label='生产日期'
        prop='inTime'
      ></el-table-column>
      <el-table-column
        label='库位'
        prop='depot'
      ></el-table-column>
      <el-table-column
        label='出库数量'
      >
        <template slot-scope="scope">
          <el-input-number style="width:100%" v-model='scope.row.out' :max='Number(scope.row.count)'></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label='出库数量'
      >
        <template slot-scope="scope">
          <el-button  style="width:100%"  type="success" plain :loading="scope.row.loading"
          @click='out(scope.row)'>提交</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      productData:[],
      outForm:{
        orderId:'',
        pid:''
      },
      rules: {
      orderId: [{ required: true, message: "请输入订单编号", trigger: "blur" }],
      pid: [{ required: true, message: "请输入商品编码", trigger: "blur" }]
      }
    }
  },
  methods: {
    getProductInfo(){
      this.$http.get('/apis/getByPid.php?pid='+this.outForm.pid).then(res=>{
        let data = res.data;
        if(data.length){
          let arr= [] 
          data.forEach(item=>{
            item.inTime = this.toDate(Number(item.inTime))
            arr.push(item)
          })
          this.productData = arr
        }
      })
    },
    out(row){
      row.loading=true;
      this.$refs["outForm"].validate(vali => {
        if(vali){
          let params = {
          "orderId":this.outForm.orderId,
          "cid":row.cid,
          'count':row.out
          }
          this.$http.get('/apis/update.php',{params:params}).then(res=>{
            if(res.data.msg=='succ'){
              this.succAlert(row);
              this.getProductInfo()
            }else{
              this.errAlert()
            }
          })
        }else{
          this.errAlert()
        }
        row.loading=false;
      });
    },
    succAlert(row) {
      const h = this.$createElement;
      this.$notify({
        title: "操作成功",
        message: h("p", { style: "color: teal" }, "商品名称："+row.name+'\n出库数量：'+row.out),
        offset: 300,
        type: "success"
      });
      this.inSubmit = false;
    },
    errAlert() {
      const h = this.$createElement;
      this.$notify.error({
        title: "操作未提交",
        message: h("p", { style: "color: teal" }, '数据未发生变动，请检查网络波动或表单数据是否正确'),
        offset: 300,
      });
    },
  }
}
</script>
