<template>
  <div class="login">
    <div class="login-form">
        <div class="title">
          <p class="text">欢迎登录合鑫泰工贸库存管理系统</p>
        </div>
        <el-form label-position="right" label-width="80px" :rules="rules" :model="loginForm"
          ref='loginForm'
        >
          <el-form-item label="用户名：" prop="uname">
            <el-input v-model="loginForm.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="upwd">
            <el-input type="password" v-model="loginForm.upwd"></el-input>
          </el-form-item>
        </el-form>
         <el-button type="success" plain
          style="margin:0 0 0 80px;width:420px"
          @click="login"
         >登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginForm:{
        uname:'',
        upwd:''
      },
      rules: {
        uname: [{ required: true, message: "请输入订单编号", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    login(){
      this.$refs["loginForm"].validate(vali => {
        if (vali) {
          this.$http.get('/apis/login.php',{params:this.loginForm}).then(res=>{
            let data =res.data;
            if(data.msg=='succ'){
              sessionStorage['loginState'] = 'succ';
              this.loginSucc()
            }
          },erro=>{
            this.resErroAlert()
          })
        } 
      });
    },
    loginSucc(){
      this.$router.push('detail')
      this.$emit('login-succ');
    }
  },
  mounted () {
    if(sessionStorage['loginState'] == 'succ'){
      this.loginSucc()
    }
  }
}
</script>


<style lang="stylus">
.login
  position absolute
  top 60px
  bottom  0
  left  0 
  right 0
  .login-form
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width 500px
    height 400px
    margin:auto;
  .title
    padding 20px  
    .text
      font-size 24px
      line-height 64px
      text-align center
      color #67C23A
</style>
