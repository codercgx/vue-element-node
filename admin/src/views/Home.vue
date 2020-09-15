<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened
        
         :default-active='$route.path'>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>内容管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>装备管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/item/create">新建装备</el-menu-item>
              <el-menu-item index="/item/list">装备列表</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>英雄管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>用户管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/users/create">新建管理员</el-menu-item>
              <el-menu-item index="/users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
         <el-menu-item index="/grade">成绩统计</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>程光新</span>
        </el-header>

        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      mode:[]
    };
  },
  components: {}
};
</script>

<style lang="css">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
