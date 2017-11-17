<template>
  <div class="account">
    <el-container
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
        <el-col :span='10'>
          <el-pagination
          style="padding:0 auto"          
           layout="prev, pager, next"
          :total='accountData.length'
          :page-size="50"
           @current-change="currentChange"
          ></el-pagination>
        </el-col>
        <el-col :span="4">
          <el-button type="success" plain style="marginBottom:5px;float:right" @click="exportExcel">导出</el-button>
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
    },erro=>{
      this.resErroAlert()
    })
    },
    exportExcel(){
      let table = document.createElement('table');
          table.id = 'account';
      let thead = document.createElement('thead');
      let tr = document.createElement('tr');
          tr.innerHTML = `<th>订单编号</th>
                          <th>操作类型</th>
                          <th>时间</th>
                          <th>编码</th>
                          <th>名称</th>
                          <th>规格</th>
                          <th>单位</th>
                          <th>库位</th>
                          <th>数量</th>`
          thead.appendChild(tr);
          table.appendChild(thead)
      let tbody = document.createElement('tbody')    
      for(let i = 0 ;i <this.accountData.length;i++){
        let tr = document.createElement('tr');
        let item = this.accountData[i];
        tr.innerHTML = `<td>&nbsp;${item.orderId}</td>
                        <td>${item.aType}</td>
                        <td>${item.aTime}</td>
                        <td>&nbsp;${item.pid}</td>
                        <td>${item.name}</td>
                        <td>${item.spec}</td>
                        <td>${item.unit}</td>
                        <td>${item.depot}</td>
                        <td>${item.aCount}</td>`
        tbody.appendChild(tr);
      }    
      table.appendChild(tbody);
      $(table).table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "myFileName",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
      });
    }
  },
  created () {
    this.getDate();
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
