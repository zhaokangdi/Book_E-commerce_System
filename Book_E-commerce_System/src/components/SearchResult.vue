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
            <i slot="suffix" class="el-input__icon el-icon-search" @click=""></i>
          </el-input>
        </el-menu-item>
      </el-menu>
    </div>

    <div>
      <el-card class="box-card">
        <div>
          <el-table
            :data="searchResult"
            style="width: 100%"
            height="250">
            <el-table-column
              prop="picture"
              label="商品"
              width="120">
              <template slot-scope="scope">
                <img :src="scope.row.picture" class="cover">
              </template>
            </el-table-column>

            <el-table-column
              prop="book"
              width="300">
              <template slot-scope="scope">{{ scope.row.book }}</template>
            </el-table-column>

            <el-table-column
              prop="author"
              label="作者"
              width="150">
              <template slot-scope="scope">{{ scope.row.author }}</template>
            </el-table-column>

            <el-table-column
              prop="category"
              label="类别"
              width="100">
              <template slot-scope="scope">{{ scope.row.category }}</template>
            </el-table-column>

            <el-table-column
              prop="price"
              label="单价"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column
              prop="store"
              label="店铺"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.store }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="">书籍详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchResult",

    data() {
      return {
        input: '',

        searchResult: [
          {
            picture: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            book: '三体',
            author: '刘慈欣',
            category: '文学小说',
            price: '￥60',
            store: '哈尔的书屋',
          }
        ]
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>

<style scoped>
  .cover {
    width: 100px;
    height: 150px;
    margin-top: 2px;
    overflow: hidden;
    cursor: pointer;
  }
</style>
