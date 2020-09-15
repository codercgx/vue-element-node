<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heroes" style="width: 100vw">
      <el-table-column align="center" prop="_id" label="ID" width="280"></el-table-column>
      <el-table-column align="center" prop="name" label="分类名称"></el-table-column>
      <el-table-column align="center" prop="titrest/le" label="称号"></el-table-column>
      <el-table-column align="center" label="图标">
        <template #default="scope">
          <img :src="scope.row.avatar" style="height:3rem"/>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="editheroes(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteheroes(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroes: []
    };
  },
  created() {
    this.feach();
  },
  methods: {
    async feach() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    },
    editheroes(scope) {
      this.$router.push(`/heroes/edit/${scope._id}`);
    },
    deleteheroes(scope) {
      this.$confirm(`此操作将永久删除 "${scope.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          await this.$http.delete(`rest/heroes/${scope._id}`);
          this.feach();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

