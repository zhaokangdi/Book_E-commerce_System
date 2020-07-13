<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/main">首页</el-menu-item>
        <el-menu-item index="/shopCart">购物车</el-menu-item>
        <el-menu-item index="/order">订单</el-menu-item>
        <el-menu-item index="/PersonalSetting">个人设置</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的店铺</template>
          <el-menu-item index="/store">店铺管理</el-menu-item>
          <el-menu-item index="/storeInfo">店铺信息</el-menu-item>
          <el-menu-item index="/assistantApply">申请通知</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-top: -5px; margin-left: 20%">
          <el-input
            style="width: 500px"
            placeholder="请输入内容"
            v-model="input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-menu-item>
      </el-menu>
    </div>

    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div>
            <el-form label-width="80px" :model="personInfo">
              <el-form-item label="联系方式">
                <el-input v-model="personInfo.phone" style="width: 600px; margin-right: 45%" disabled></el-input>
              </el-form-item>

              <el-form-item label="用户昵称">
                <el-input v-model="personInfo.name" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="用户身份">
                <el-input v-model="personInfo.role" style="width: 370px; margin-right: 11%" disabled></el-input>
                <el-button type="primary" style="margin-right: 45%" plain v-if="personInfo.role === '普通用户'" @click="assistantDialog = true">助理申请</el-button>
                <el-button type="primary" style="margin-right: 45%" plain v-else disabled>助理申请</el-button>
              </el-form-item>

              <el-form-item label="家庭住址">
                <el-input v-model="personInfo.address" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%" @click="infoUpdate()">确定修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="密码修改" name="second">
          <div>
            <el-form label-width="80px" :model="personPassword">
              <el-form-item label="原密码">
                <el-input v-model="personPassword.oldPassword" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="新密码">
                <el-input v-model="personPassword.newPassword" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%" @click="passwordUpdate()">确定修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div>
      <el-dialog title="助理申请" :visible.sync="assistantDialog">
        <el-form :model="assistantApply">
          <el-form-item label="店铺编号" >
            <el-input v-model="assistantApply.storeId" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="width: 100px" type="primary" @click="apply()">申 请</el-button>
          <el-button style="width: 100px; margin-left: 20%" @click="assistantDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonalSetting",
    inject: ['reload'],

    data() {
      return {
        input: '',
        activeName: 'first',
        assistantDialog: false,

        assistantApply: {
          storeId: '',
        },

        personInfo: {},

        personPassword: {
          oldPassword: '',
          newPassword: '',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      infoUpdate() {
        this.$axios
          .post('', {
            phone: this.$session.get("key"), // 当前用户
            name: this.storeInfo.name,
            role: this.storeInfo.role,
            address: this.storeInfo.address,
            password: this.storeInfo.password,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      passwordUpdate() {
        if(this.personPassword.oldPassword === this.personInfo.password) {
          this.$axios
            .post('', {
              phone: this.$session.get("key"), // 当前用户
              name: this.storeInfo.name,
              role: this.storeInfo.role,
              address: this.storeInfo.address,
              password: this.personPassword.newPassword,
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
                var data = successResponse.data.data;
                this.reload();
                this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
              }
            })
            .catch(failResponse => {
              alert('失败！');
            })

        }else {
          alert('原密码错误！');
        }
      },

      apply() {
        this.$axios
          .post('', {
            useId: this.$session.get("key"), // 当前用户,
            storeId: this.assistantApply.storeId,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              this.assistantDialog = true;
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },
    },

    mounted() {
      this.personInfo = this.$route.query.personalInfo;
    }
  }
</script>

<style scoped>

</style>
