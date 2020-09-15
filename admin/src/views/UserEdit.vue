<template>
  <div>
    <h1>{{id? '编辑':'新建'}}管理员</h1>
    <el-form :model="user" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    };
  },
  props: {
    id: {}
  },
  created() {
    this.id && this.feach();
  },
  methods: {
    async save() {
      if (this.id) {
        const res = await this.$http.put(`rest/users/${this.id}`, this.user);
        this.$message({
          type: "success",
          message: "编辑管理员成功!"
        });
      } else {
        const res = await this.$http.post("rest/users", this.user);
        this.$message({
          type: "success",
          message: "新建管理员成功!"
        });
      }
      this.$router.push("/users/list");
    },
    async feach() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.user = res.data;
    }
  }
};
</script>

