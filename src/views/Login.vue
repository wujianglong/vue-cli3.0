<template>
  <div class="login">
    <div class="login-content layout-flex">
      <el-form class="wid-25">
        <h1 class="tac mb30">中至广告流水系统</h1>
        <el-form-item>
          <el-input
            v-model="userName"
            class="wid-100"
            prefix-icon="icon aliiconfont el-icon-aliicon_signal"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            prefix-icon="icon aliiconfont el-icon-alilock"
            class="wid-100"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="wid-100"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  components: {},
  methods: {
    login() {
      this.$api.login({
        login_phone_num: "15170037957",
        login_password: "120820",
        login_type: "password",
        platform: 1
      });
    }
  },
  created() {
    console.log(process.env);
    console.log("VUE_APP_SECRET", process.env.VUE_APP_env);
    console.log("node_env", process.env.NODE_ENV);
  }
};
</script>
<style lang="stylus" scoped>
.login
  height 100%
  .login-content
    height 100%
    justify-content center
    align-items center
    margin-top -10vh
</style>
