<template>
  <div>
    <h1>{{id? '编辑':'新建'}}装备</h1>
    <el-form :model="model" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          list-type="picture-card"
          action="http://127.0.0.1:3000/admin/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  data() {
    return {
      model: {
        name: "",
       icon:''
        
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
        const res = await this.$http.put(`items/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "编辑装备成功!"
        });
      } else {
        const res = await this.$http.post("items", this.model);
        this.$message({
          type: "success",
          message: "新建装备成功!"
        });
      }
      this.$router.push("/item/list");
    },
    async feach() {
      const res = await this.$http.get(`items/${this.id}`);
      this.model = res.data;
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.model.icon = res.url;
      
    }
  }
};
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
