<template>
  <div class="layout">
    <el-container style="border: 1px solid #eee">
      <!-- 摄像头 -->
      <div class="booth">
        <video id="video"></video>
      </div>
      <!-- 倒计时 -->
      <div class="count red mt5 ml5" v-if="!timeEnd">
        {{ "倒计时 " + time }}
      </div>
      <div class="contain">
        <div class="slide layout-flex" v-if="slideHeight !== '0%'">
          <div>
            {{ slideHeight }}
          </div>
          <div class="slide-content">
            <div class="trans" :style="{ height: slideHeight }"></div>
          </div>
        </div>

        <div class="main">
          <div class="header1 cb mt10 ft14">
            <!-- <div class="fl">
              <span class="color-gray6">正在监控</span>
            </div> -->
            <!-- <div class="fr">
              <span class="red">答题倒计时 00:49:29</span>
            </div> -->
          </div>
          <div v-if="!timeEnd">
            <h1>单选题（{{ singleElection.length }}道）</h1>
            <div class="fieldset">
              <div
                class="div_question"
                v-for="(o, i) in singleElection"
                :key="i"
              >
                <div class="div_topic">
                  <span>{{ i + 1 }}.</span>
                  <span class="ml15">{{ o.title }}</span>
                  <span class="req" v-show="single[i].select.length === 0"
                    >*</span
                  >
                </div>
                <div class="div_content color-gray3 mt5">
                  <div v-for="(o1, i1) in Object.entries(o.option)" :key="i1">
                    <el-radio
                      class="wid-100"
                      v-model="single[i].select"
                      :label="o1[0]"
                      >{{ o1[1] }}</el-radio
                    >
                    <!-- v-model="select[i].select" -->
                    <!-- <el-radio class="wid-100" :label="21"></el-radio> -->
                  </div>
                </div>
              </div>
            </div>

            <h1>多选题（{{ this.multipleElection.length }}道）</h1>
            <div class="fieldset">
              <div
                class="div_question"
                v-for="(o, i) in multipleElection"
                :key="i"
              >
                <div class="div_topic">
                  <span>{{ i + 1 }}.</span>
                  <span class="ml15">{{ o.title }}</span>
                  <span class="req" v-show="multiple[i].select.length === 0"
                    >*</span
                  >
                </div>
                <div class="color-gray3 mt5">
                  <div>
                    <!-- v-model="select[i].select" -->
                    <!-- <el-radio class="wid-100" :label="21"></el-radio> -->
                    <el-checkbox-group
                      class="ml20"
                      v-model="multiple[i].select"
                    >
                      <el-checkbox
                        v-for="(o1, i1) in Object.entries(o.option)"
                        :key="i1"
                        :label="o1[0]"
                      >
                        {{ o1[1] }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>

            <div class="fieldset">
              <h1>简答题（{{ this.subject.length }}道）</h1>
              <div class="div_question" v-for="(o, i) in subject" :key="i">
                <div class="div_topic">
                  <span>{{ i + 1 }}.</span>
                  <span class="ml15">{{ o.title }}</span>
                  <span class="req" v-show="!subjectList[i].answers">*</span>
                </div>
                <div class="div_content color-gray3 mt15 cb">
                  <div class="area">
                    <el-input
                      v-model="subjectList[i].answers"
                      type="textarea"
                      resize="none"
                      :rows="6"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="tac wid-100">
              <el-button
                v-if="!timeEnd"
                class="wid-20"
                type="primary"
                @click="submit"
                >提交</el-button
              >

              <!-- slideHeight -->
            </div>
          </div>
          <div v-else>
            <h1>尊敬的考生您好，您本次考试已经结束,请耐心等待后续通知。。</h1>
            <div class="tac" style="margin-top:20px">
              <el-button
                v-if="timeEnd"
                class="wid-20"
                type="primary"
                @click="cancle"
                >关闭</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NProgress from "nprogress";
export default {
  name: "test",
  data() {
    return {
      radioList: {
        radio: "",
        radio1: "",
        radio2: "",
        radio3: ""
      },
      slideHeight: "0%",
      time: "",
      timer: "",
      maxtime: "",
      // select: [],
      // shortAnswer: [],
      cs: [],
      end: false,
      timeEnd: false,
      singleElection: [], // 单选
      multipleElection: [], // 多选
      subject: [], //主观题
      single: [],
      multiple: [],
      subjectList: [],
      answer: ""
    };
  },
  computed: {
    ...mapState({
      examList: state => state.userInfo.examList
    })
  },
  watch: {
    single: {
      handler() {
        let num =
          this.single.length + this.multiple.length + this.subjectList.length;

        let n1 = this.single.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n2 = this.multiple.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n3 = this.subjectList.filter(o => {
          return o.answers;
        }).length;

        let b = (n1 + n2 + n3) / num;

        this.slideHeight = b * 100 + "%";
        console.log(b);
        NProgress.set(b);
      },
      deep: true
    },
    multiple: {
      handler() {
        let num =
          this.single.length + this.multiple.length + this.subjectList.length;

        let n1 = this.single.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n2 = this.multiple.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n3 = this.subjectList.filter(o => {
          return o.answers;
        }).length;

        let b = (n1 + n2 + n3) / num;

        this.slideHeight = b * 100 + "%";
        console.log(b);
        NProgress.set(b);
      },
      deep: true
    },
    subjectList: {
      handler() {
        let num =
          this.single.length + this.multiple.length + this.subjectList.length;

        let n1 = this.single.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n2 = this.multiple.filter(o => {
          return o.select.length !== 0;
        }).length;

        let n3 = this.subjectList.filter(o => {
          return o.answers;
        }).length;

        let b = (n1 + n2 + n3) / num;

        this.slideHeight = b * 100 + "%";
        console.log(b);
        NProgress.set(b);
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.examList);

    if (localStorage.getItem("timeEnd") === "true") {
      this.timeEnd = true;
      return false;
    }

    this.testing();
    let e = this.examList;
    this.maxtime = parseInt(
      (+new Date(e.enter_time) + 45 * 60000 - +new Date()) / 1000
    );

    let q = e.question_copy_list;
    this.singleElection = q.filter(o => {
      return Number(o.type) === 1;
    });

    this.single = this.singleElection.map(o => {
      return {
        id: Number(o.id),
        select: []
      };
    });

    this.multipleElection = q.filter(o => {
      return Number(o.type) === 2;
    });

    this.multiple = this.multipleElection.map(o => {
      return {
        id: Number(o.id),
        select: []
      };
    });

    this.subject = q.filter(o => {
      return Number(o.type) === 3 && o;
    });

    this.subjectList = this.subject.map(o => {
      return {
        id: o.id,
        answers: ""
      };
    });

    this.timer = setInterval(() => {
      this.countDown();
    }, 1000);

    // this.timer = setInterval(() => {
    //   this.countDown();
    // }, 1000);

    // if (!this.$route.query.code) {
    //   this.end = true;
    //   return false;
    // }
    // this.$api
    //   .validate({
    //     params: {
    //       code: this.$route.query.code
    //     }
    //   })
    //   .then(d => {
    //     if (
    //       d.status === "答题完成" ||
    //       d.status === "不存在" ||
    //       d.status === "答题超时"
    //     ) {
    //       this.end = true;
    //     } else {
    //       this.$api
    //         .getPaper({
    //           params: {
    //             code: this.$route.query.code
    //           }
    //         })
    //         .then(res => {
    //           this.maxtime = parseInt(
    //             (+new Date(res.start_time_s) + 60 * 1000 - +new Date()) / 1000
    //           );

    //           let q = res.questions;
    //           this.shortAnswer = q.filter(o => {
    //             return o.question_type === "简答题";
    //           });

    //           this.select = q.filter(o => {
    //             return o.question_type === "选择题";
    //           });

    //           this.timer = setInterval(() => {
    //             this.countDown();
    //           }, 1000);
    //         })
    //         .catch(() => {
    //           this.$notify({
    //             title: "提示",
    //             message: "获取试题失败，请联系管理重新获取新的地址"
    //           });
    //         });
    //     }
    //   });
  },
  created() {},
  methods: {
    toIndex() {
      this.$router.push("/");
    },
    support() {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        alert("支持");
      } else {
        alert("不支持");
      }
    },
    toJurisdiction() {
      this.$router.push("/role");
    },
    testing() {
      let video = document.querySelector("#video");
      let streaming = false;

      //媒体对象
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(stream => {
          video.srcObject = stream; // 将捕获的视频流传递给video  放弃window.URL.createObjectURL(stream)的使用
          console.log(video.srcObjec);
          video.play(); //  播放视频
        })
        .catch(() => {
          this.$notify({
            title: "提示",
            message:
              "检测到摄像设备已关闭，为了不影响考试成绩有效性，打开摄像设备刷新浏览器后重试。",
            type: "warning"
          });
        });

      video.addEventListener(
        "canplay",
        function(ev) {
          if (!streaming) {
            video.setAttribute("width", "100%");
            video.setAttribute("height", "100%");
            streaming = true;
          }
        },
        false
      );
    },
    countDown() {
      if (this.maxtime >= 0) {
        let i = Math.floor(this.maxtime / 60);
        let i1 = Math.floor(this.maxtime % 60);
        this.time =
          "00:" +
          (String(i).length === 1 ? "0" + i : i) +
          ":" +
          (String(i1).length === 1 ? "0" + i1 : i1);
        --this.maxtime;
        if (this.maxtime === 300) {
          this.$notify({
            title: "提示",
            message: "还有5分钟结束，请尽快提交",
            type: "warning"
          });
        }
      } else {
        this.$notify({
          title: "提示",
          message: "截止时间已过,即将自动提交",
          type: "warning"
        });
        clearInterval(this.timer);
        // this.timeEnd = true;
        this.submit();
      }
    },
    cancle() {
      localStorage.clear();
      this.$router.replace("/");
    },
    submit() {
      // 考试时间已过
      if (this.timeEnd) {
        this.$notify({
          type: "error",
          message: "考试时间已经结束"
        });
        return false;
      }

      // 试卷暂未完成
      if (this.slideHeight !== "100%") {
        this.$notify({
          type: "warning",
          message: "试卷暂未完成"
        });
        return false;
      }

      let s = {};
      let su = {};

      this.single.forEach(o => {
        s[o.id] = o.select.split(",");
      });

      this.multiple.forEach(o => {
        s[o.id] = o.select.sort();
      });

      this.subjectList.forEach(o => {
        su[o.id] = o.answers;
      });

      console.log("s", s);

      // console.log("m", m);

      console.log("su", su);

      // 组装数据
      let params = {
        paper_id: this.examList.id,
        answer: s,
        subjective_answer: su
      };

      console.log(params);

      this.$confirm("确认提交试卷?").then(() => {
        this.$api.submitPage(params).then(() => {
          this.$notify({
            title: "提示",
            message: "试卷提交成功，请耐心等待后续联系",
            type: "success"
          });
          this.timeEnd = true;
          localStorage.setItem("timeEnd", true);
        });
      });

      // let t = [];
      // for (let i in this.select) {
      //   if (!this.select[i].select && !this.timeEnd) {
      //     this.$notify({
      //       title: "提示",
      //       message: "单选题还未完成",
      //       type: "warning"
      //     });
      //     return false;
      //   }
      //   t.push({
      //     selected_option_id: this.select[i].select,
      //     question_id: this.select[i].id
      //   });
      // }

      // for (let i1 in this.shortAnswer) {
      //   if (!this.shortAnswer[i1].txt && !this.timeEnd) {
      //     this.$notify({
      //       title: "提示",
      //       message: "简答题还未完成",
      //       type: "warning"
      //     });
      //     return false;
      //   }
      //   t.push({
      //     answer: this.shortAnswer[i1].txt,
      //     question_id: this.shortAnswer[i1].id
      //   });
      // }

      // if (!this.timeEnd) {
      //   this.$confirm("提交后将不再允许修改，确认提交?").then(() => {
      //     this.$api
      //       .submit({
      //         code: this.$route.query.code,
      //         answers: t
      //       })
      //       .then(res => {
      //         if (Number(res.err_no) === 0) {
      //           this.$notify({
      //             title: "提示",
      //             message: "试卷提交成功，请耐心等待后续联系",
      //             type: "success"
      //           });
      //           this.end = true;
      //         } else {
      //           this.$notify({
      //             title: "提示",
      //             message: res.err_message,
      //             type: "error"
      //           });
      //         }
      //       })
      //       .catch(() => {
      //         this.$notify({
      //           title: "提示",
      //           message: "试卷提交失败",
      //           type: "error"
      //         });
      //       });
      //   });
      // } else {
      //   this.$api
      //     .submit({
      //       code: this.$route.query.code,
      //       answers: "2"
      //     })
      //     .then(res => {
      //       if (Number(res.err_no) === 0) {
      //         this.$notify({
      //           title: "提示",
      //           message: "试卷提交成功，请耐心等待后续联系",
      //           type: "success"
      //         });
      //         this.end = true;
      //       } else {
      //         this.$notify({
      //           title: "提示",
      //           message: res.err_message,
      //           type: "error"
      //         });
      //       }
      //     })
      //     .catch(() => {
      //       this.$notify({
      //         title: "提示",
      //         message: "试卷提交失败",
      //         type: "error"
      //       });
      //     });
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
.booth
  width 250px
  margin 0 auto
  position absolute
  left 0
  top 0px

.trans
  transition all 0.5s
.count
  position absolute
  left 0
  top 0
  font-weight bold
  font-size 20px
h1
  font-size 24px !important
  font-weight bold
  color #5A83E5
  text-align center
  vertical-align middle
  margin 0
  padding 15px 0
  line-height 24px
.red
  color red
.slide
  position fixed
  width 50px
  height 160px
  background #fff
  right 0px
  top 150px
  font-size 12px
  flex-direction column
  justify-content center
  align-items center
  font-weight bold
  .slide-content
    width 15px
    height 120px
    >div
      background-color #7496E9
      height 0%
.layout
  background  linear-gradient(to bottom, #e2eaf7, #f3f6fa)
  height 100%
  overflow auto
.fieldset
  .div_question
    &:last-child
      border-bottom none
    margin-top 50px
    border-bottom 1px solid #EFEFEF
    padding-bottom 15px
    .div_content
      margin-left 20px
      font-size 15px
      >div
        &:hover
          background #efefef
        height 30px
        line-height 30px
        cursor pointer
      >.area
        height auto
        margin-bottom 5px
    .div_topic
      font-size 16px
      color #444444
      font-weight bold
      position relative
      span.req
        color red
        font-weight bold
        position absolute
        top 3px
        left -10px
      .circle
        background transparent url('') no-repeat;
        vertical-align: middle;
        height 16px
        width 18px
        display inline-block
        position absolute
        top 6px
.contain
  position relative
  box-shadow 0px 1px 6px 0px rgba(205,220,245,1)
  width 920px
  background #fff
  padding-bottom 80px
  margin 150px auto
  border-radius 2px
  .main
    width 740px
    margin 0 auto
    .header
      border-bottom 1px dashed #666
      height 30px
      line-height 30px
</style>

<style lang="stylus">
.el-checkbox
  display block
  line-height 30px
</style>
