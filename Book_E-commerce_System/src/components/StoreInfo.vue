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
            <el-form :label-position="labelPosition" label-width="80px" :model="storeInfo">
              <el-form-item label="店铺编号">
                <el-input v-model="storeInfo.phone" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="店铺名称">
                <el-input v-model="storeInfo.name" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="商家昵称">
                <el-input v-model="storeInfo.businessName" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="店铺地址">
                <el-input v-model="storeInfo.address" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="创建时间">
                <el-input v-model="storeInfo.createTime" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="更新时间">
                <el-input v-model="storeInfo.updateTime" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%">确定修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="密码修改" name="second">
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="storePassword">
              <el-form-item label="原密码">
                <el-input v-model="storePassword.oldPassword" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="新密码">
                <el-input v-model="storePassword.newPassword" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%">确定修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StoreInfo",

    data() {
      return {
        input: '',
        activeName: 'first',
        labelPosition: 'right',

        storeInfo: [
          {
            phone: '18810760681',
            name: '哈尔的书屋',
            businessName: '哈尔',
            address: '北京',
            createTime: '2020-07-08-08:00',
            updateTime: '2020-07-08-08:00',
          }
        ],

        storePassword: [
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
