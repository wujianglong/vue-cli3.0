<template>
  <div class="Jurisdiction common">
    <div class="Jurisdiction-content">
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

      <!-- 分页 -->
      <div class="block tac mt20">
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>

      <!-- 新增dialog -->
      <el-dialog title="新增用户" :visible.sync="dialogVisible" width="40%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" class="wid-90"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" class="wid-90"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-radio-group v-model="form.role">
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
          <el-button type="primary" @click="addUser" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 修改dialog -->
      <el-dialog title="修改" :visible.sync="dialogVisible1" width="40%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="密码修改">
            <el-input v-model="editForm.password" class="wid-90"></el-input>
            <el-button class="mt10 wid-20" type="primary" @click="editPassword"
              >确 定</el-button
            >
          </el-form-item>
          <el-form-item label="权限修改">
            <el-radio-group v-model="editForm.role">
              <el-radio label="管理员"></el-radio>
              <el-radio label="财务"></el-radio>
              <el-radio label="运营"></el-radio>
              <el-radio label="二代"></el-radio>
              <el-radio label="直营"></el-radio>
            </el-radio-group>
            <el-button class="mt10 wid-20" type="primary" @click="editRole"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="addUser" size="small"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "role",
  data() {
    return {
      loading: true, // 加载中
      tableData: [], // 表格数据
      searchVal: "", // 查询
      dialogVisible: false, // 显示新增弹框dialog
      dialogVisible1: false, // 显示编辑弹框dialog
      form: {
        // 新增弹框数据
        role: "",
        username: "",
        password: ""
      },
      editForm: {
        // 修改弹框数据
        username: "",
        role: "",
        password: "",
        id: ""
      }
    };
  },
  methods: {
    // 显示新增弹框
    showAddDialog() {
      this.dialogVisible = true;
      this.form = {
        role: "",
        username: "",
        password: ""
      };
    },
    showEditDialog(row) {
      this.dialogVisible1 = true;
      this.editForm = {
        id: row.id,
        username: row.username,
        role: row.role,
        password: ""
      };
    },
    // 获取用户
    getUserList() {
      this.loading = true;
      this.$api
        .getUser({
          params: {
            page: 1,
            per_page: 10
          }
        })
        .then(res => {
          this.tableData = res.items;
          this.loading = false;
        });
    },
    // 增加用户
    addUser() {
      if (Object.values(this.form).includes("")) {
        this.$notify({
          title: "警告",
          message: "创建用户信息不能为空",
          type: "warning"
        });
        return false;
      } else if (this.form.password.length < 6) {
        this.$notify({
          title: "警告",
          message: "密码长度不能低于6位",
          type: "warning"
        });
        return false;
      }
      this.$api
        .createUser(this.form)
        .then(() => {
          this.$notify({
            title: "成功",
            message: `新增用户成功`,
            type: "success"
          });
          this.getUserList();
          this.dialogVisible = false;
        })
        .catch(() => {
          // 应该不能删除自己 后台做判断
          this.$notify({
            title: "错误",
            message: "创建用户失败",
            type: "error"
          });
        });
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm(`确认删除${row.username}用户?`).then(() => {
        this.$api
          .deleteUser({
            data: {
              user_id: row.id
            }
          })
          .then(() => {
            this.$notify({
              title: "成功",
              message: `删除${row.username}用户成功`,
              type: "success"
            });
            this.getUserList();
          });
      });
    },
    // 修改密码
    editPassword() {
      if (!this.editForm.password || this.editForm.password.length < 6) {
        this.$notify({
          title: "警告",
          message: "密码不能为空且长度不能小于6位",
          type: "warning"
        });
        return false;
      }
      this.$confirm(`确认修改账户${this.editForm.username}的密码？`).then(
        () => {
          this.$api
            .updateUser({
              user_id: this.editForm.id,
              password: this.editForm.password
            })
            .then(() => {
              this.$notify({
                message: "密码修改成功",
                type: "success"
              });
              this.dialogVisible1 = false;
            })
            .catch(() => {
              this.$notify({
                message: "密码修改失败",
                type: "error"
              });
            });
        }
      );
    },
    // 修改权限
    editRole() {
      this.$confirm(`确认修改账户${this.editForm.username}的权限？`).then(
        () => {
          this.$api
            .updateUser({
              user_id: this.editForm.id,
              role: this.editForm.role
            })
            .then(() => {
              this.$notify({
                message: "权限修改成功",
                type: "success"
              });
              this.dialogVisible1 = false;
            })
            .catch(() => {
              this.$notify({
                message: "权限修改失败",
                type: "error"
              });
            });
        }
      );
    }
  },
  created() {
    this.getUserList();
  }
};
</script>
