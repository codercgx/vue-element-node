<template>
  <div class="login">
    <el-card class="login_card" header="请先登陆">
      <el-form :model="user" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          const res = await this.$http.post("login", this.user);
          localStorage.token=res.data.token
          //console.log(res)
          if (res.data.token) {
            this.$message({
              type: "success",
              message: "登陆成功"
            });
            this.$router.push("/home");
          } else {
            this.$message({
              type: "danger",
              message: "登陆失败"
            });
            return false;
          }
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>

<style  scoped>
.login_card {
  margin: 150px auto;
  width: 30vw;
}
</style>