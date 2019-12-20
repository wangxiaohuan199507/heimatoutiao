<template>
  <div class="login">
      <!-- 放置一个el-card组件 -->
      <el-card class='login-card'>
          <!-- 放置图标图片 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 放置表单 -->
          <el-form>
              <!-- 放置表单域 里面放置input/select/ checkbox 一个表单域相当于一行-->
              <el-form-item>
                  <el-input  placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 放置表单域 -->
              <el-form-item>
                  <el-input style="width:65%" placeholder="验证码"></el-input>
                  <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
