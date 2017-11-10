<template>
  <div class="detail">
    <el-container style="text-align:center">
        <el-pagination
          style="margin:0 auto"          
           layout="prev, pager, next"
           :total="detail.length"
           :page-size='pageSize'
           @current-change="currentChange"
        ></el-pagination>
    </el-container>
      <el-table :data='detailSlice' border stripe  v-loading="loading"
        style="minHeight:500px"
      >
         <el-table-column 
         prop="pid"
         label="编码">
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
         prop="count"
         label="数量">
         </el-table-column>
         <el-table-column 
         prop="unit"
         label="单位">
         </el-table-column>
         <el-table-column 
         prop="inTime"
         label="生产日期">
         </el-table-column>
         <el-table-column 
         prop="mdate"
         label="最近出库日期">
         </el-table-column>
         <el-table-column 
         prop="depot"
         label="库位">
         </el-table-column>
         <el-table-column 
         prop="breed"
         label="品种">
         </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      current:{},
      sliceIndex:1,
      pageSize:50,
      detail:[],
      loading:true
    };
  },
  created () {
    this.$http.get('apis/getAll.php').then(res=>{
      let detailDate=res.data
      let arr=[];
      detailDate.forEach(item=>{
        item.mdate = this.toDate(Number(item.mdate))
        item.inTime = this.toDate(Number(item.inTime))
        arr.push(item);
      })
      this.detail = arr
      this.$nextTick(()=>{
        this.loading=false
      })
    })
  },
  computed: {
    detailSlice(){
      return this.detail.slice((this.sliceIndex-1)*50,this.sliceIndex*50)
    }
  },
  methods:{
    currentChange(index){
      this.sliceIndex = index
    }
  }
};
</script>

