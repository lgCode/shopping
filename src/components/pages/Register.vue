<template>
  <div>
    <van-nav-bar title="用户注册" left-text="注册" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field v-model="userName" label="用户名" icon="clear" placeholder="请输入用户名" required
        :error-message="userNameErrorMsg" @click-icon="userName =''" />
      <van-field type="password" v-model="password" label="密码" placeholder="请输入密码" required
        :error-message="passwordErrorMsg" />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import url from '@/serviceAPI.config.js';
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        userName: '',
        password: '',
        openLoading: false, //是否开启用户注册的Loading状态,防止重复提交
        userNameErrorMsg: '', //当用户名出现错误时的提示信息
        passwordErrorMsg: '', //当密码出现错误时的提示信息
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      registerAction(){
        /* if(this.checkForm()){
          this.axiosRegisterUser();
        } */
        this.checkForm() && this.axiosRegisterUser();
      },
      //注册账号
      axiosRegisterUser() {
        this.openLoading = true;
        axios({
            url: url.registerUser,
            method: 'post',
            data: {
              userName: this.userName,
              password: this.password
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              Toast.success(res.data.message);
              this.$router.push('/');
            } else {
              console.log(res.data.message);
              this.openLoading = false;
              Toast.fail('注册失败!')
            }
          })
          .catch(err => {
            console.log(err);
            this.openLoading = false;
            Toast.fail('注册失败!')
          })
      },
      //*******表单验证方法
      checkForm() {
        let isOk = true;
        if (this.userName.length < 5) {
          this.userNameErrorMsg = "用户名不能少于5位";
          isOk = false;
        } else {
          this.userNameErrorMsg = "";
        }
        if (this.password.length < 6) {
          this.passwordErrorMsg = "密码不能少于6位";
          isOk = false;
        } else {
          this.passwordErrorMsg = "";
        }
        return isOk;
      }
    },
    components: {}
  }

</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }

  .register-button {
    padding-top: 10px;
  }

</style>
