<template>
  <div class="total">
    <el-container style="text-align:center">
        <el-pagination
          style="margin:0 auto"          
          layout="prev, pager, next"
          :total='totalDate.length'
          :page-size="50"
          @current-change="currentChange"
        ></el-pagination>
    </el-container>
    <el-table :data='totalSlice' border stripe  v-loading="loading"
        style="minHeight:500px"
      >
         <el-table-column 
         prop="0"
         label="编码">
         </el-table-column>
         <el-table-column 
         prop="1"
         label="名称">
         </el-table-column>
         <el-table-column 
         prop="2"
         label="名称">
         </el-table-column>
         <el-table-column 
         prop="3"
         label="名称">
         </el-table-column>
         <el-table-column 
         prop="4"
         label="名称">
         </el-table-column>
         <el-table-column 
         prop="5"
         label="生产日期">
         </el-table-column>
         <el-table-column 
         prop="6"
         label="最近出库日期">
         </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pageSize:50,
      totalDate:[],
      loading:true,
      sliceIndex:1 
    }
  },
  created () {
    this.$http.get('/apis/getTotal.php').then(res=>{
      this.totalDate = res.data
      this.$nextTick(()=>{
        this.loading = false
      })
    },erro=>{
      this.resErroAlert()
    })
  },
  computed: {
    totalSlice(){
      return this.totalDate.slice((this.sliceIndex-1)*50,this.sliceIndex*50)
    }
  },
  methods:{
    currentChange(index){
      this.sliceIndex = index
    },
    exportExcel(){
      let table = document.createElement('table');
      let thead = document.createElement('thead');
      let tr = document.createElement('tr');
          tr.innerHTML = `<th>编码</th>
                          <th>名称</th>
                          <th>规格</th>
                          <th>数量</th>
                          <th>单位</th>
                          <th>库位</th>
                          <th>品种</th>`
          thead.appendChild(tr);
          table.appendChild(thead)
      let tbody = document.createElement('tbody');
      for(let i = 0 ;i<this.detail.length;i++){
        let tr = document.createElement('tr');
        let item = this.detail[i];
        tr.innerHTML = `<td>&nbsp;${item.pid}</td>
                        <td>${item.name}</td>
                        <td>${item.spec}</td>
                        <td>${item.count}</td>
                        <td>${item.unit}</td>
                        <td>${item.depot}</td>
                        <td>${item.breed}</td>`
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
  }
}
</script>

