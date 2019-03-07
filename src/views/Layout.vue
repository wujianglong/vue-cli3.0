<template>
  <div class="layout">
    <el-container style="border: 1px solid #eee">
      <!-- 顶部 -->
      <el-header style="text-align: right; font-size: 12px">
        <div class="fl ft24 color-white">
          中至广告流水系统
          <Nav></Nav>
        </div>
        <el-dropdown>
          <i class="el-icon-setting mr15" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>伍江龙</span>
      </el-header>
      <!-- Layout 主要内容 -->
      <el-container class="container">
        <!-- Layout 侧栏 -->
        <el-aside class="aside">
          <el-menu :default-openeds="['3']">
            <!-- 首页 -->
            <el-menu-item index="1">
              <i class="icon aliiconfont el-icon-aliicon_work_fill"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <!-- 产品管理 -->
            <el-menu-item index="2">
              <i class="icon aliiconfont el-icon-aliicon_work_fill"></i>
              <span slot="title">产品列表</span>
            </el-menu-item>
            <!-- 用户管理 -->
            <el-menu-item index="3">
              <i class="icon aliiconfont el-icon-aliicon_signal_fill"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <!-- 财务管理 -->
            <el-submenu index="4">
              <template slot="title"
                ><i class="icon aliiconfont el-icon-aliicon_gather_fill"></i
                >财务管理</template
              >
              <el-menu-item index="1-1">充值列表</el-menu-item>
              <el-menu-item index="1-2">返点列表</el-menu-item>
            </el-submenu>
            <!-- 资金管理 -->
            <el-menu-item index="5">
              <i class="icon aliiconfont el-icon-aliicon_sketch_fill"></i>
              <span slot="title">资金管理</span>
            </el-menu-item>
            <!-- 权限管理 -->
            <el-menu-item index="6">
              <i class="icon aliiconfont el-icon-aliicon_meeting_fill"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <!-- 发票管理 -->
            <el-menu-item index="7">
              <i class="icon aliiconfont el-icon-aliicon_calendar_fill"></i>
              <span slot="title">发票管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- main -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
export default {
  name: "layout",
  data() {
    const item = {
      date: "2016-05-02",
      name: "伍江龙",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  components: {
    Nav
  }
};
</script>
<style lang="stylus" scoped>
.aside
  width 200px!important
  border-right solid 1px #e6e6e6
  >ul
    border-right none
    >li
      i.icon
        margin-right 5px
.layout
  height 100%
  >section
    height 100%
    overflow auto
.el-header
  background-color #304056
  color #333
  line-height 60px
.el-aside
  color #333
</style>
