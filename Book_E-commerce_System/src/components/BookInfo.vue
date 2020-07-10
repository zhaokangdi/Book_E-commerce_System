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
      <el-card class="box-card" style="height: 520px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文学小说</el-breadcrumb-item>
          <el-breadcrumb-item>三体</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="box" style="margin-top: 2%">
          <div class="left">
            <div class="demo-image__placeholder">
              <div class="block">
                <el-image style="margin-left: 5%; width: 100%" :src="src"></el-image>
              </div>
            </div>
          </div>

          <div class="center">
            <div style="text-align: left">
              <h1 class="main_title">三体</h1>

              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>

            <el-divider><i class="el-icon-collection-tag"></i></el-divider>

            <div style="text-align: left">
              <h5 class="main_title">作者</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">出版社</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">出版日期</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">店铺</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">简介</h5>
            </div>
          </div>

          <div class="right">
            <div>
              <div style="margin-top: 125%">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>

              <div style="margin-top: 20%">
                <el-button type="primary" style="width: 180px" plain>加入购物车</el-button>
                <el-button type="success" style="width: 180px; margin-top: 10%" plain>付款</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BookInfo",

    data() {
      return {
        input: '',
        value: 3.7,
        num: 1,
        src: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .box{
    height: 100%;
    position: relative;
  }

  .left{
    position:absolute;
    left: 0;
    width:300px;
  }

  .center{
    position: absolute;
    left: 350px;
    right:250px;
    float:left
  }

  .right{
    position:absolute;
    right: 0;
    width:200px;
  }

  .main_title {
    color: #505458;
  }
</style>
