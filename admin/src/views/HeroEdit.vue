<template>
  <div>
    <h1>{{id? '编辑':'新建'}}英雄</h1>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form :model="model" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="(item,index) in cateOptions"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              list-type="picture-card"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="res=>$set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              list-type="picture-card"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              show-score
              :max="10"
              v-model="model.scores.diffcult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" show-score :max="10" v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" show-score :max="10" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" show-score :max="10" v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" multiple>
              <el-option
                v-for="(item,index) in itemOptions"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" multiple>
              <el-option
                v-for="(item,index) in itemOptions"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="英雄技能">
        <el-button size="small" @click="model.skills.push({})">
          <i class="el-icon-plus"></i> 添加技能
        </el-button>
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col :span="12" v-for="(item,index) in model.skills" :key="index">
            <el-form label-width="100px" :model="model" style="width :400px">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  list-type="picture-card"
                  action="http://127.0.0.1:3000/admin/api/upload"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="model.banner" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-button type="primary" @click="save">保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="英雄搭配">
        <el-button size="mini" @click="model.parents.push({})">
          <i class="el-icon-plus"></i>添加
        </el-button>
        <el-row :gutter="50">
          <el-col :span="12" v-for="(item,index) in model.parents" :key="index">
            <el-form :model="model">
              <el-form-item label="英雄">
                <el-select v-model="item.hero">
                  <el-option
                    v-for="(item,index) in heroOptions"
                    :key="index"
                    :value="item._id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.parents.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
              <el-button type="primary" @click="save">保存</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        skills: [],
        parents: [],
        scores: {
          difficult: 0
        }
      },
      cateOptions: [],
      itemOptions: [],
      heroOptions: []
    };
  },
  props: {
    id: {}
  },
  created() {
    this.getOptions();
    this.id && this.feach();
  },
  methods: {
    async save() {
      if (this.id) {
        const res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
        this.$message({
          type: "success",
          message: "编辑英雄成功!"
        });
      } else {
        const res = await this.$http.post("rest/heroes", this.model);
        this.$message({
          type: "success",
          message: "新建英雄成功!"
        });
      }
      this.$router.push("/heroes/list");
    },
    async feach() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async getOptions() {
      const cateOptions = await this.$http.get("rest/categories");
      const itemOptions = await this.$http.get("rest/items");
      const heroOptions = await this.$http.get("rest/heroes");
      this.cateOptions = cateOptions.data;
      this.itemOptions = itemOptions.data;
      this.heroOptions = heroOptions.data;
    },
    handleAvatarSuccess(res) {
      console.log(res);
      // this.model.avatar = res.url;
      //this.model.banner = res.url;
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
