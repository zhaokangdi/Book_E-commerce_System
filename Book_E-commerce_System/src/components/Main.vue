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

    <div>
      <el-dialog title="助理申请" :visible.sync="assistantDialog">
        <el-form :model="assistantApply">
          <el-form-item label="店铺编号" >
            <el-input v-model="assistantApply.storeId" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="assistantDialog = false">取 消</el-button>
          <el-button type="primary" @click="assistantDialog = false">申 请</el-button>
        </div>
      </el-dialog>
    </div>

    <div style="margin-top: 2px">
      <div class="box">
        <div class="left">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>图书词云</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'词云 ' + o }}
            </div>
          </el-card>
        </div>

        <div class="center">
          <el-carousel :interval="5000" arrow="always" height="280px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>为您推荐</span>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{'推荐 ' + o }}
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div style="margin-top: 285px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="文学小说" name="first">
          <el-row style="height: 485px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in books" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.date}}</span>
                <span>{{item.press}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.cover" alt="封面">
                </div>
                <div class="info">
                  <div class="title">
                    <a href="">{{item.title}}</a>
                  </div>
                </div>
                <div class="author">{{item.author}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="人文社科" name="second">

        </el-tab-pane>

        <el-tab-pane label="经管励志" name="third">

        </el-tab-pane>

        <el-tab-pane label="少儿童书" name="fourth">

        </el-tab-pane>

        <el-tab-pane label="教辅考试" name="fifth">

        </el-tab-pane>

        <el-tab-pane label="科学技术" name="sixth">

        </el-tab-pane>

        <el-tab-pane label="生活娱乐" name="seventh">

        </el-tab-pane>

        <el-tab-pane label="艺术珍赏" name="eighth">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Main",

    data() {
      return {
        activeIndex: '1',
        activeName: 'first',
        input: '',
        assistantDialog: false,

        assistantApply: {
          storeId: '',
        },

        books: [
          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },

          {
            cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            title: '三体',
            author: '刘慈欣',
            date: '2019-05-05',
            press: '重庆出版社',
            abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
          },
        ]
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .box{
    position: relative;
  }

  .left{
    position:absolute;
    left: 0;
    width:150px;
  }

  .right{
    position:absolute;
    right: 0;
    width:150px;
  }

  .center{
    position: absolute;
    left: 150px;
    right:150px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,

  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
