<template>
  <div class="Product common">
    <div class="product-content">
      <!-- 搜索栏 -->
      <div class="search-group">
        <el-input
          class="wid-15 mr10 ml10"
          placeholder="请输入内容"
          v-model="searchVal"
          size="small"
          clearable
        >
        </el-input>
        <el-button class="new-btn" size="small">查询</el-button>
        <el-button
          class="fr new-btn mr10"
          icon="el-icon-plus"
          @click="showAddDialog"
          size="small"
          >新增</el-button
        >
      </div>

      <!-- 表格栏 -->
      <el-table :data="tableData" class="mt20" v-loading="loading">
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="role" label="权限" align="center">
        </el-table-column>
        <el-table-column prop="data" label="添加日期" align="center">
        </el-table-column>
        <el-table-column prop="jurisdiction" label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                plain
                size="small"
                @click="showEditDialog(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                @click="deleteUser(scope.row)"
                plain
                size="small"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "product",
  data() {
    return {
      searchVal: ""
    };
  }
};
</script>
