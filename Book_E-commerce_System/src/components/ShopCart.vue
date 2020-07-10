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
      <el-card class="box-card">
        <div>
          <el-table
            :data="tableData"
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
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.book }}</template>
            </el-table-column>

            <el-table-column
              prop="storeName"
              label="店铺名"
              width="100px">
              <template slot-scope="scope">{{ scope.row.storeName }}</template>
            </el-table-column>

            <el-table-column
              prop="price"
              label="单价"
              width="100">
              <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="num" size="small" :min="1">{{ scope.row.number }}</el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="total"
              label="小计"
              width="120">
              <template slot-scope="scope">{{ scope.row.total }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="">书籍详情</el-button>
                <el-button size="small" type="success" plain @click="payDialog = true">支付</el-button>
                <el-button size="small" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <div>
      <el-dialog
        title="付款提示"
        :visible.sync="payDialog"
        width="20%">
        <span class="text">总价: 60元</span>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="success" plain @click="payDialog = false">确认支付</el-button>
          <el-button size="small" type="danger" plain @click="payDialog = false">放弃支付</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopCart",

    data() {
      return {
        input: '',
        num: 1,
        payDialog: false,

        tableData: [{
          picture: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
          book: '三体',
          storeName: '哈尔的书屋',
          price: '￥60',
          number: 3,
          total: '￥60'
        }],
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleDelete(index, row) {
        console.log(index, row);
      }
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

  .text {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
