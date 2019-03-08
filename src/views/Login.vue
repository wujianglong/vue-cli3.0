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
  methods: {
    login() {
      if (!this.userName) {
        this.$notify({
          title: "警告",
          message: "用户名不能为空",
          type: "warning"
        });
        return false;
      } else if (!this.password) {
        this.$notify({
          title: "警告",
          message: "密码不能为空",
          type: "warning"
        });
        return false;
      }

      this.$store
        .dispatch("userInfo", {
          username: this.userName,
          password: this.password
        })
        .then(res => {
          if (String(res.err_no) === "1") {
            this.$notify({
              title: "警告",
              message: "用户名或者密码错误",
              type: "warning"
            });
          } else {
            this.$router.replace("/");
          }
        });
    }
  },
  created() {
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
