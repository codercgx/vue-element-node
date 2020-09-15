<template>
  <div>
    <h1>成绩管理</h1>
    <el-form :mode="courseObj">
      <el-form-item label="分数" style="width: 60vw">
        <el-input v-model="courseObj.grade"></el-input>
      </el-form-item>
      <el-form-item label="学分" style="width: 60vw">
        <el-input v-model="courseObj.credit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="info" @click="course=[]">重置</el-button>
        <el-button type="success" @click="opt">计算</el-button>
        <h1>平均绩点:{{avgGPA}}</h1>
      </el-form-item>
    </el-form>

    <el-table :data="course" style="width:100vw">
      <el-table-column align="center" label="#" type="index" style="width: 100px"></el-table-column>
      <el-table-column align="center" label="成绩" prop="grade" style="width: 100px"></el-table-column>
      <el-table-column align="center" label="学分" prop="credit" style="width: 100px"></el-table-column>
      <el-table-column align="center" label="绩点" prop="GPA" style="width: 100px"></el-table-column>
      <el-table-column align="center" label="学分*绩点" prop="creGPA" style="width: 100px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Grade",
  data() {
    return {
      courseObj: {
        grade: null,
        credit: null,
        GPA: null,
        creGPA: null
      },
      course: [],
      courseMap: [],
      avgGPA: null
    };
  },
  props: {},
  created() {},
  methods: {
    add() {
      this.course.push(this.courseObj);
      this.courseObj = {};
      this.course.map(item => {
        if (item.grade < 100 && item.grade >= 90) {
          return (item.GPA = 4), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 85) {
          return (item.GPA = 3.7), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 82) {
          return (item.GPA = 3.3), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 78) {
          return (item.GPA = 3), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 75) {
          return (item.GPA = 2.7), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 71) {
          return (item.GPA = 2.3), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 66) {
          return (item.GPA = 2), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 62) {
          return (item.GPA = 1.7), (item.creGPA = item.credit * item.GPA);
        } else if (item.grade >= 61) {
          return (item.GPA = 1.3), (item.creGPA = item.credit * item.GPA);
        } else if ((item.grade = 60)) {
          return (item.GPA = 1), (item.creGPA = item.credit * item.GPA);
        }
      });
    },
    opt() {
      this.courseMap = this.course;
      // console.log(this.courseMap)
     let avgObj = this.courseMap.reduce((newValue, item) => {
        return {
          value1: parseInt((newValue + item.credit *item.GPA)),
          value2: parseInt((newValue + item.credit))
        };
      }, 0);
      console.log(avgObj)
      this.avgGPA= avgObj.value1/avgObj.value2
    }
  }
};
</script>

<style>
</style>
