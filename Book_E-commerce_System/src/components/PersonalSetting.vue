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
              <el-form-item label="用户编号">
                <el-input v-model="personInfo.phone" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="用户昵称">
                <el-input v-model="personInfo.name" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="用户身份">
                <el-input v-model="personInfo.identity" style="width: 370px; margin-right: 11%"></el-input>
                <el-button type="primary" style="margin-right: 45%" plain @click="assistantDialog = true">助理申请</el-button>
              </el-form-item>

              <el-form-item label="家庭住址">
                <el-input v-model="personInfo.address" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="邮政编码">
                <el-input v-model="personInfo.postcode" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%">确定修改</el-button>
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
                <el-button type="success" plain style="width: 200px; margin-right: 10%">确定修改</el-button>
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
          <el-button style="width: 100px" type="primary" @click="assistantDialog = false">申 请</el-button>
          <el-button style="width: 100px; margin-left: 20%" @click="assistantDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonalSetting",

    data() {
      return {
        input: '',
        activeName: 'first',
        assistantDialog: false,

        assistantApply: {
          storeId: '',
        },

        personInfo: [
          {
            phone: '',
            name: '',
            identity: '',
            address: '',
            postcode: '',
          }
        ],

        personPassword: [
          {
            oldPassword: '',
            newPassword: '',
          }
        ]
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>

<style scoped>

</style>
