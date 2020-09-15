<template>
  <div>
    <h1>{{id? '编辑':'新建'}}分类</h1>
    <el-form :model="model" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="(item,index) in options" :key="index" :label="item.name"
      :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  data() {
    return {
      model: {},
      options:[]
    };
  },
  props: {
    id: {}
  },
  created() {
    this.getOptions()
    this.id && this.feach();
  },
  methods: {
    async save() {
      if (this.id) {
        const res = await this.$http.put(`rest/categories/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "编辑分类成功!"
        });
      } else {
        const res = await this.$http.post("rest/categories", this.model);
        this.$message({
          type: "success",
          message: "新建分类成功!"
        });
      }
      this.$router.push("/categories/list");
    },
    async feach() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async getOptions() {
      const res = await this.$http.get(`rest/categories`);
      this.options = res.data;
    }
  }
};
</script>

