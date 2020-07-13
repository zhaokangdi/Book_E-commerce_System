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
            :data="cartList"
            style="width: 100%"
            height="100%">
            <el-table-column
              prop="picture"
              label="商品"
              width="120">
              <template slot-scope="scope">
                <img :src="scope.row.picture" class="cover">
              </template>
            </el-table-column>

            <el-table-column
              prop="bookName"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.bookName }}</template>
            </el-table-column>

            <el-table-column
              prop="storeName"
              label="店铺名"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.storeName }}</template>
            </el-table-column>

            <el-table-column
              prop="price"
              label="单价"
              width="100">
              <template slot-scope="scope">￥{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.number" size="small" :min="1"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="bookInfo(scope.row.bookId)">书籍详情</el-button>
                <el-button size="small" type="success" plain @click="payCart(scope.row.bookId, scope.row.price, scope.row.number)">支付</el-button>
                <el-button size="small" type="danger" plain @click="deleteCart(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <div>
        <el-dialog
          title="付款提示"
          :visible.sync="payDialog"
          width="20%">
          <span class="text">￥{{this.totalPrice}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="success" plain @click="pay('sure')">确认支付</el-button>
            <el-button size="small" type="danger" plain @click="pay('giveUp')">放弃支付</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopCart",
    inject: ['reload'],

    data() {
      return {
        input: '',
        num: 1,
        userId: '',
        bookId: '',
        number: '',
        totalPrice: '',

        payDialog: false,

        cartList: [{
          id: '',
          picture: '',
          bookName: '',
          storeName: '',
          price: '',
          number: '',
        }],

        bookInformation: {
          id: '1730',
          storeId: '18810760681',
          category: '文学小说',
          name: '三体',
          score: '3.76',
          price: '60',
          author: '刘慈欣',
          publishingHouse: '重庆出版社',
          publishingDate: '2019-05-05',
          storeName: '哈尔的书屋',
          introduction: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleDelete(index, row) {
        console.log(index, row);
      },

      bookInfo(bookId) {
        this.$router.push({path: '/bookInfo', query: {bookInfo: this.bookInformation}});
      },

/**
      bookInfo(bookId) {
        this.$axios
          .post('', {
            bookId: bookId,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/bookInfo', query: {bookInfo: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },
**/
      payCart(bookId, price, number) {
        var totalPrice = parseFloat(price) * parseInt(number);
        this.totalPrice = totalPrice;
        this.userId = this.$session.get("key");
        this.bookId = bookId;
        this.number = number;
        this.payDialog = true;
      },

      deleteCart(id) {
        this.$axios
          .post('', {
            userId: this.$session.get("key"),
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/shopCart', query: {cartList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      pay(operation) {
        if(operation === 'sure') {
          this.$axios
            .post('', {
              userId: this.$session.get("key"),
              bookId: this.bookId,
              number: this.number,
              totalPrice: this.totalPrice,
              state: '已支付',
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert("支付成功！");
                this.payDialog = false;
                var data = successResponse.data.data;
                this.reload();
                this.$router.push({path: '/shopCart', query: {cartList: data}});
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert('失败！');
            })
        }else if(operation === 'giveUp') {
          this.$axios
            .post('', {
              userId: this.$session.get("key"),
              bookId: this.bookId,
              number: this.number,
              totalPrice: this.totalPrice,
              state: '未支付',
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert("未支付，请前往订单查看！");
                this.payDialog = false;
                var data = successResponse.data.data;
                this.reload();
                this.$router.push({path: '/shopCart', query: {cartList: data}});
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert('失败！');
            })
        }else {
          this.payDialog = false;
        }
      },
    },

    mounted() {
      this.cartList = this.$route.query.cartList;
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
