<template>
  <div class="login">
      <!-- 放置一个el-card组件 -->
      <el-card class='login-card'>
          <!-- 放置图标图片 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 放置表单 给el-form绑定model属性，绑定数据对象-->
          <el-form ref="myForm" :model="loginForm" :rules="loginRules">
              <!-- 放置表单域 里面放置input/select/ checkbox 一个表单域相当于一行-->
              <!-- prop要写要校验的字段名 -->
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile"  placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 放置表单域 -->
              <el-form-item prop="code">
                  <el-input style="width:65%" v-model="loginForm.code" placeholder="验证码"></el-input>
                  <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false// 是否勾选
      },
      loginRules: {
        //   验证规则对象 key(字段名)：value(规则=>[])
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
        }],
        code: [{ required: true, message: '请输入验证码' }, {
          pattern: /^\d{6}$/, message: '验证码格式不正确'
        }],
        check: [{ validator: function (rule, value, callback) {
          // 自定义校验函数，有三个参数
          // rule 规则 没有用
          // value 要校验的字段的值
          // callback是回调函数
          if (value) {
            // 任务已经勾选
            callback()// 认为当前规则校验通过
          } else {
            // 认为没有勾选
            callback(new Error('您应该勾选相关条款'))// 如果没有勾选，认为当前校验失败，应该停止
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      // 手动校验
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          //   说明校验通过,应该调用登录接口
        //   console.log('校验通过，调用接口')
        // axios参数包括body参数 get参数 路由参数 查询参数
        // body参数 放在axios的data中
        // get参数放在axios的params中
          this.$axios({
            url: '/authorizations', // 请求地址,axios若没有指定类型，默认是get类型
            method: 'post', // 类型
            data: this.loginForm
          }).then(result => {
            //   只接受正确结果
            // 前端缓存 登录成功返回给我们的令牌
            window.localStorage.setItem('user-token', result.data.token)
            // console.log(result.data.tata.token)
            this.$router.push('/home')// 跳转到home
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scope>
    .login {
        background-image: url('../../assets/img/login_bg.jpg');
        height: 100vh;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items:center;
        .login-card {
            width: 440px;
            height: 350px;
            .title {
                text-align: center;
                margin-bottom: 30px;
                img {
                    height: 45px;
                }
            }
        }
    }
</style>
