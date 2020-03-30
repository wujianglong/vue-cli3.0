<template>
  <div class="login layout-flex">
    <div class="login-content">
      <div class="header tac mb50 wid-100 mt40">中至数据集团招聘</div>
      <div class="main layout-flex">
        <div class="main_l">
          <!-- 注意事项 -->
          <div class="note ml30 pl20 pt25 pb30">
            <p class="noteHeader pb15">注意事项</p>
            <p>
              1.建议使用Google
              Chrome浏览器，版本要求5.0及以上，保持网络环境稳定。
            </p>
            <p>
              2.检查并确保电脑摄像头在考试画面可以正常使用，全程开启摄像头，对准面部
            </p>
            <p>
              3.登录后，可先操作练习答题，熟悉考试操作。正式试题会在正式开考后打开。
            </p>
            <p>
              4.正式考试时，请关闭QQ、微信等软件，考试中，请不要跳出考试网页。
            </p>
            <p>
              5.请在规定时间内作答全部试题，考试终止时，无论是否完成试题自动交卷。
            </p>
            <p>
              6.请在规定时间内作答全部试题，考试终止时，无论是否完成试题自动交卷。
            </p>
          </div>
          <!-- 二维码 -->
          <div class="erCode layout-flex ml25 mt30">
            <div class="erCode_l mr20">
              <img src="../assets/image/wechat.jpeg" alt="" />
              <p>中至招聘</p>
            </div>
            <div class="erCode_r layout-flex tal">
              <p>中至数据集团股份有限公司</p>
              <p>公司网站： http://www.zonst.com</p>
              <p>公司地址：南昌市新建区望城镇玉壶山大道414号中至信息大厦</p>
            </div>
          </div>
        </div>
        <div class="main_r">
          <ul>
            <li>
              <div>
                <img src="../assets/image/1.png" alt="" />
                <input
                  v-model="data.username"
                  placeholder="请输入姓名"
                  type="text"
                />
              </div>
            </li>
            <!-- <li>
              <div>
                <img src="../assets/image/2.png" alt="" />
                <input
                  v-model="data.identity"
                  placeholder="请输入身份证号码"
                  type="text"
                />
              </div>
            </li> -->
            <li>
              <div>
                <img src="../assets/image/3.png" alt="" />
                <input
                  v-model="data.phone"
                  placeholder="请输入手机号码"
                  type="text"
                />
                <span style="width:80px" @click="sendCode">{{ codeText }}</span>
              </div>
            </li>
            <li>
              <div>
                <img src="../assets/image/3.png" alt="" />
                <input
                  v-model="data.code"
                  placeholder="短信验证码"
                  type="text"
                />
              </div>
            </li>
            <!-- <li>
              <div class="date-picker">
                <img src="../assets/image/4.png" alt="" />
                <el-date-picker
                  v-model="data.graduate_time"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
            </li>
            <li>
              <div>
                <img src="../assets/image/5.png" alt="" />
                <input
                  v-model="data.graduate_university"
                  placeholder="请输入毕业院校"
                  type="text"
                />
              </div>
            </li> -->
          </ul>
          <div class="loginBtn" @click="login">
            进入考试
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",
      codeFlag: false,
      codeText: "发送验证码",
      data: {
        username: "",
        identity: "360122199310104814",
        phone: "",
        graduate_time: "2016-6-1",
        graduate_university: "江西农业大学",
        code: this.$route.query.code
      },
      power: true
    };
  },
  methods: {
    sendCode() {
      if (this.codeFlag) {
        return false;
      }
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.data.phone)) {
        this.$notify({
          type: "warning",
          message: "手机号格式不对"
        });
        return false;
      }
      this.$api
        .sendCode({
          phone: this.data.phone
        })
        .then(() => {
          this.$notify({
            title: "提示",
            message: "短信验证码已发送"
          });

          this.codeFlag = true;
          let c = 60;
          this.codeText = c + "s";
          let s = setInterval(() => {
            c--;
            this.codeText = c + "s";
            if (c < 0) {
              clearInterval(s);
              this.codeText = "发送验证码";
              this.codeFlag = false;
            }
          }, 1000);

          // codeText
        });
    },
    login() {
      // if (!this.power) {
      //   this.$notify({
      //     title: "提示",
      //     message: "链接已经失效或者答题已经结束",
      //     type: "warning"
      //   });
      //   return false;
      // }

      // navigator.mediaDevices
      //   .getUserMedia({ video: true, audio: true })
      //   .then(() => {
      //     console.log("检测到视频设备");
      //   })
      //   .catch(() => {
      //     this.$notify({
      //       title: "提示",
      //       message: "未检测到摄像设备，请使用具有摄像设备电脑答题",
      //       type: "warning"
      //     });
      //     return false;
      //   });

      // if (Object.values(this.data).includes("")) {
      //   this.$notify({
      //     title: "提示",
      //     message: "用户信息不能为空",
      //     type: "warning"
      //   });
      //   return false;
      // } else if (
      //   !this.data.identity.match(
      //     /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      //   )
      // ) {
      //   this.$notify({
      //     title: "提示",
      //     message: "身份证号码不正确",
      //     type: "warning"
      //   });
      //   return false;
      // } else if (
      //   !this.data.phone.match(
      //     /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      //   )
      // ) {
      //   this.$notify({
      //     title: "提示",
      //     message: "手机号不正确",
      //     type: "warning"
      //   });
      //   return false;
      // }

      this.$confirm("确认已阅读相关注意事项并进入考试").then(() => {
        this.$api
          .verifyCode({
            phone: this.data.phone,
            verify_code: this.data.code
          })
          .then(res => {
            if (res.check) {
              this.$store
                .dispatch("getExam", {
                  phone: this.data.phone,
                  verify_code: this.data.code
                })
                .then(res1 => {
                  console.log("22", res1);
                  // errno
                  if (res1.errno === -1) {
                    this.$notify({
                      type: "error",
                      message: res1.errmsg
                    });
                  } else {
                    localStorage.setItem("timeEnd", "false");
                    this.$router.push("/test");
                  }
                });

              // this.$api
              //   .getExam({
              //     params: {
              //       phone: this.data.phone,
              //       verify_code: this.data.code
              //     }
              //   })
              //   .then(res1 => {
              //     console.log("11", res1);
              //   });
            }
          });
        // verifyCode

        // this.$api.user(this.data).then(res => {
        //   if (Number(res.err_no) === 0) {
        //     this.$router.replace(`/test?code=${this.$route.query.code}`);
        //   } else {
        //     this.$notify({
        //       title: "提示",
        //       message: res.err_message,
        //       type: "error"
        //     });
        //   }
        // });
      });
    }
  },
  created() {
    if (!this.$route.query.code) {
      // this.$notify({
      //   title: "提示",
      //   message: "未获取测试资格",
      //   type: "warning"
      // });
      this.power = false;
      return false;
    }

    this.$api
      .validate({
        params: {
          code: this.$route.query.code
        }
      })
      .then(d => {
        // 这里需要判断 已经在答题  还未答题  答题完毕
        if (
          d.status === "答题完成" ||
          d.status === "不存在" ||
          d.status === "答题超时"
        ) {
          this.power = false;
        } else if (d.status === "答题中") {
          this.$router.replace(`/test/?code=${this.$route.query.code}`);
        }
      });
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>

li
  list-style none
.login
  height 100%
  background url('../assets/image/bj.png') center center no-repeat
  background-size 100% 100%
  justify-content center
  .login-content
    width 1000px
    height 650px
    background #fff
    align-self center
    border-radius 15px
    .header
      font-size 33px
      color #333
    .main
      .main_l
        flex 12
        .note
          color #fff
          background #7496E9
          border-radius 6px
          .noteHeader
            font-size 24px
          p
            font-size 14px
            margin-bottom 7px
        .erCode
          .erCode_l
            text-align center
            img
              width 120px
          .erCode_r
            align-items center
            margin-top -20px
            flex-direction column
            justify-content space-evenly
            font-size 14px
            p
              text-align left
              width 100%
      .main_r
        flex 9
        ul
          margin-left 60px
          margin-right 60px
          li
            height 70px
            line-height 70px
            border-bottom 1px solid #eee
            >div
              display flex
              align-items center
              height 100%
              input
                font-size 16px
                height 100%
                text-indent 10px
                border none

        img
          width 40px
      .loginBtn
        cursor pointer
        background #1A72FE
        height 66px
        line-height 66px
        width 300px
        border-radius 40px
        color #fff
        font-size 28px
        text-align center
        margin 30px auto
</style>
