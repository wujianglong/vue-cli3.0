<template>
  <div class="Jurisdiction common">
    <div class="Jurisdiction-content">
      <!-- 搜索栏 -->
      <div class="search-group">
        <el-input
          class="wid-15 mr10"
          placeholder="请输入内容"
          v-model="input10"
          size="small"
          clearable
        >
        </el-input>
        <el-button type="primary" size="small">查询</el-button>

        <el-button
          class="fr"
          icon="el-icon-plus"
          @click="addUserFnc"
          type="primary"
          size="small"
          >新增</el-button
        >
      </div>

      <!-- 表格栏 -->
      <el-table :data="tableData">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="jurisdiction" label="权限" align="center">
        </el-table-column>
        <el-table-column prop="data" label="添加日期" align="center">
        </el-table-column>
        <el-table-column prop="jurisdiction" label="操作" align="center">
          <el-button type="primary" plain size="small">编辑</el-button>
          <el-button type="delete" size="small">删除</el-button>
        </el-table-column>
      </el-table>

      <!-- 新增dialog -->
      <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.userName" class="wid-90"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" class="wid-90"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-radio-group v-model="form.resource">
              <el-radio label="管理员"></el-radio>
              <el-radio label="财务"></el-radio>
              <el-radio label="运营"></el-radio>
              <el-radio label="二代"></el-radio>
              <el-radio label="直营"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="dialogVisible = false" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "jurisdiction",
  data() {
    return {
      tableData: [
        {
          userName: "wjl",
          jurisdiction: "二代",
          data: "2019-9-2"
        }
      ],
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    addUserFnc() {
      this.dialogVisible = true;
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped></style>
