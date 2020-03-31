<template>
  <div class="result">
    <el-container style="border: 1px solid #eee">
      <div class="contain">
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
                  <!-- <span class="req" v-show="single[i].select.length === 0"
                    >*</span
                  > -->
                </div>
                <div class="div_content color-gray3 mt5">
                  <div v-for="(o1, i1) in Object.entries(o.option)" :key="i1">
                    <el-radio
                      class="wid-100"
                      :data-corrent="o.answer"
                      :class="{
                        corrent: o.answer.includes(o1[0]),
                        my: o.candidate_answer.includes(o1[0])
                      }"
                      :label="o1[0]"
                      >{{ o1[1] }}</el-radio
                    >
                  </div>
                  <p style="margin-top:20px;">
                    正确答案:{{ o.answer }} 考生答案: {{ o.candidate_answer }}
                  </p>
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
                  <!-- <span class="req" v-show="multiple[i].select.length === 0"
                    >*</span
                  > -->
                </div>
                <div class="color-gray3 mt5">
                  <div>
                    <!-- v-model="select[i].select" -->
                    <!-- <el-radio class="wid-100" :label="21"></el-radio> -->
                    <el-checkbox-group class="ml20">
                      <el-checkbox
                        v-for="o1 in Object.entries(o.option)"
                        :class="{
                          corrent: o.answer.includes(o1[0]),
                          my: o.candidate_answer.includes(o1[0])
                        }"
                        :key="o1[0]"
                        :label="o1[0]"
                      >
                        {{ o1[1] }}
                      </el-checkbox>
                    </el-checkbox-group>
                    <p style="margin-top:20px;margin-left:20px;">
                      正确答案:{{ o.answer }} 考生答案: {{ o.candidate_answer }}
                    </p>
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
                  <!-- <span class="req" v-show="!subjectList[i].answers">*</span> -->
                </div>
                <div class="div_content color-gray3 mt15 cb">
                  <div class="area">
                    <el-input
                      :value="o.candidate_subjective_answer"
                      type="textarea"
                      resize="none"
                      :rows="6"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "result",
  data() {
    return {
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
  created() {
    let id = this.$route.query.id;
    if (!id) {
      this.$notify({
        type: "error",
        message: "简历详情ID不能为空"
      });
      return false;
    }
    this.$api
      .getPageDetail({
        id: id
      })
      .then(res => {
        let e = res.results.question_copy_list;
        this.maxtime = parseInt(
          (+new Date(e.enter_time) + 45 * 60000 - +new Date()) / 1000
        );

        let q = e;
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
      });
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

.el-radio__inner:after
  transform: translate(-50%,-50%) scale(1);

.el-checkbox__inner:after {
    transform: rotate(45deg) scaleY(1);
}

.corrent
  color #409eff!important
  .el-radio__input
    .el-radio__inner
      border-color: #409eff!important;
      background: #409eff!important;
  .el-checkbox__input
    .el-checkbox__inner
      border-color: #409eff!important;
      background: #409eff!important;

.my
  color red!important
  .el-radio__input
    .el-radio__inner
      border-color: red!important;
      background: red!important;
  .el-checkbox__input
    .el-checkbox__inner
      border-color: red!important;
      background: red!important;
.corrent.my
  color #67c23a!important
  .el-radio__input
    .el-radio__inner
      border-color: #67c23a!important;
      background: #67c23a!important;
  .el-checkbox__input
    .el-checkbox__inner
      border-color: #67c23a!important;
      background: #67c23a!important;
</style>
