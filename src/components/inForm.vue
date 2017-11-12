<template>
  <div class='in-from'>
    <el-form :model="inForm" :rules="rules" ref='in-form'>
      <el-form-item label='订单编号' prop='orderId'>
        <el-input v-model="inForm.orderId"></el-input>
      </el-form-item>
      <el-form-item label="商品编码" prop='pid'>
        <el-input v-model="inForm.pid" @blur="getProductInfo"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span='12'>
          <el-form-item label="名称" prop='name'>
            <el-input v-model="inForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="规格" prop='spec'>
            <el-input v-model="inForm.spec"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span='12'>
          <el-form-item label="品种" prop='breed'>
            <el-input v-model="inForm.breed"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="单位" prop='unit'>
            <el-input v-model="inForm.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span='8'>
          <el-form-item label="生产日期" prop='inTime'>
            <el-date-picker 
              style="display:block;width:100%"
              v-model="inForm.inTime"
              type="date"
              placeholder="选择日期"
             >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="库位" prop='depot'>
            <el-input v-model="inForm.depot"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label="入库数量" prop='count'>
            <el-input v-model="inForm.count"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20" style="marginTop:15px">
      <el-col :span='12'>
        <el-button type="success" plain style="width:100%">提交</el-button>
      </el-col>
      <el-col :span='12'>
        <el-button  type="primary" plain style="width:100%">完成</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    var countVali=(rule,value,callback)=>{
      if(!value){
         return callback(new Error('数量不能为空'))
      }else if(isNaN(value)||value<=0){
          return callback(new Error('数量必须为数值且大于等于0'));
      }else{
        callback()
      }
    }
    return{
      inForm:{
        orderId:'',
        pid:'',
        name:'',
        spec:'',
        breed:'',
        unit:'',
        inTime:'',
        depot:'',
        count:''
      },
      rules:{
        orderId:[
           { required: true, message: '请输入订单编号', trigger: 'blur' }
        ],
        pid:[
           { required: true, message: '请输入商品编码', trigger: 'blur' }
        ],
        name:[
           { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        spec:[
           { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        breed:[
           { required: true, message: '请输入商品品种', trigger: 'blur' }
        ],
        unit:[
           { required: true, message: '请输入商品单位', trigger: 'blur' }
        ],
        inTime:[
           { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        depot:[
           { required: true, message: '请输入库位', trigger: 'blur' }
        ],
        count:[
          { validator: countVali, trigger: 'blur' }          
        ]
      }
    }
  },
  methods: {
    getProductInfo(){
      let params = {
        "in-pid":this.inForm.pid
      }
      this.$http.get('/apis/getAll.php',{params:params}).then(res=>{
        let info = res.data;
        console.log(info)
        this.inForm.name = info.name;
        this.inForm.breed = info.breed;
        this.inForm.unit = info.unit;
        this.inForm.spec = info.spec;
      },erro=>{
        /**
         * 错误处理
         */
      })
    }
  }
}
</script>
