<template>
  <div class="account">
    <el-container
      style="padding-bottom:10px"
    >
        <el-col :span='10'>
            <el-date-picker
              v-model="month"
              align="right"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
        </el-col>
        <el-col :span='14'>
          <el-pagination
          style="padding:0 auto"          
           layout="prev, pager, next"
          :total='accountData.length'
          :page-size="50"
           @current-change="currentChange"
          ></el-pagination>
        </el-col>
    </el-container>
    <el-table :data='accountSlice' border stripe  v-loading="loading"
    >
      <el-table-column 
        prop="orderId"
        label="订单编号">
      </el-table-column>
      <el-table-column 
        prop="aType"
        label="操作类型">
      </el-table-column>
      <el-table-column 
        prop="aTime"
        label="时间">
      </el-table-column>
      <el-table-column 
        prop="pid"
        label="商品编码">
      </el-table-column>
      <el-table-column 
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column 
        prop="spec"
        label="规格">
      </el-table-column>
      <el-table-column 
        prop="spec"
        label="规格">
      </el-table-column>
      <el-table-column 
        prop="unit"
        label="单位">
      </el-table-column>
      <el-table-column 
        prop="depot"
        label="库位">
      </el-table-column>
      <el-table-column 
        prop="aCount"
        label="数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      month:'',
      accountData:[],
      sliceIndex:1,
      loading:true,
      dateParams:{
        'accYear':new Date().getFullYear(),
        'accMonth':new Date().getMonth()+1
      }
    }
  },
  computed: {
    accountSlice(){
      return this.accountData.slice((this.sliceIndex-1)*50,this.sliceIndex*50)
    }
  },
  methods:{
    currentChange(index){
      this.sliceIndex = index
    },
    getDate(){
      this.$http.get('/apis/getAccount.php',{params:this.dateParams}).then(res=>{
      let Data = res.data
      let arr=[];
      Data.forEach(item=>{
        item.aTime = this.toFullDate(Number(item.aTime))
        arr.push(item);
      })
      this.accountData = arr;
      this.$nextTick(()=>{
        this.loading=false
      })
    })
    }
  },
  created () {
    this.getDate()
  },
  watch:{
    month(){
      let arr  = this.month.split('-');
      this.dateParams.accYear=arr[0];
      this.dateParams.accMonth=arr[1];
      this.getDate()
    }
  }
}
</script>
