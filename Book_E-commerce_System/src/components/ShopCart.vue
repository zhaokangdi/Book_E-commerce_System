<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item @click="showMain()">首页</el-menu-item>
        <el-menu-item index="/shopCart" @click="shopCart()">购物车</el-menu-item>
        <el-menu-item @click="orderManage()">订单</el-menu-item>
        <el-menu-item @click="personalInfoSetting()">个人设置</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的店铺</template>
          <el-menu-item @click="storeManage()">店铺管理</el-menu-item>
          <el-menu-item @click="storeInfoSetting()">店铺信息</el-menu-item>
          <el-menu-item @click="assistantNoPass()">申请通知</el-menu-item>
        </el-submenu>
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
                <img :src="scope.row.shoppingCart.picPath" class="cover">
              </template>
            </el-table-column>

            <el-table-column
              prop="bookName"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.shoppingCart.bookName }}</template>
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
              <template slot-scope="scope">￥{{ scope.row.shoppingCart.price }}</template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.shoppingCart.number" size="small" :min="1"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="bookInfo(scope.row.shoppingCart.bookId)">书籍详情</el-button>
                <el-button size="small" type="success" plain @click="payCart(scope.row.shoppingCart.id,scope.row.shoppingCart.bookId, scope.row.shoppingCart.price, scope.row.shoppingCart.number)">支付</el-button>
                <el-button size="small" type="danger" plain @click="deleteCart(scope.row.shoppingCart.id)">删除</el-button>
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
        payDialog: false,

        id: '',
        userId: '',
        bookId: '',
        number: '',
        totalPrice: '',

        cartList: [{
          shoppingCart: {
            id: '',
            picture: '',
            bookName: '',
            price: '',
            number: '',
          },
          storeName: '',
        }],

        bookInformation: {
          category: '',
          name: '',
          score: '',
          author: '',
          publishingHouse: '',
          publishingDate: '',
          storeName: '',
          introduction: '',
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

      showMain() {
        this.$axios
          .post('/book/renwensheke', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/main', query: {mainList: data}});
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      shopCart() {
        this.$axios
          .post('/cart/all', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
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

      orderManage() {
        this.$axios  // 获取未支付的订单
          .post('/order/userweizhifu', {
            userId: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/order', query: {unPayList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      personalInfoSetting() {
        this.$axios
          .post('/entity', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      storeManage() {
        this.$axios
          .post('/store/allbooks', {
            phone: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if(successResponse.data.message === "普通用户") {
                alert('无权限！');
              }else {
                var data = successResponse.data.data;
                this.$router.push({path: '/store', query: {booksList: data}});
              }
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      storeInfoSetting() {
        this.$axios
          .post('/store/info', {
            phone: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if((successResponse.data.message === "普通用户")) {
                alert('无权限！');
              }else {
                var data = successResponse.data.data;
                this.$router.push({path: '/storeInfo', query: {storeInfo: data}});
              }
            }else {
              alert("查看失败，请重试！");
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      assistantNoPass() {
        this.$axios  // 获取待审核的助理列表
          .post('/store/all_assistant_application', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if((successResponse.data.message === "普通用户") || (successResponse.data.message === "商家助理")) {
                alert('无权限！');
              }else {
                alert(successResponse.data.message);
                var data = successResponse.data.data;
                this.$router.push({path: '/assistantApply', query: {notPass: data}});
              }
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      bookInfo(bookId) {
        this.$axios
          .post('/book/info', {
            id: bookId,
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

      payCart(id,bookId, price, number) {
        var totalPrice = parseFloat(price) * parseInt(number);
        this.id = id;
        this.totalPrice = totalPrice;
        this.userId = this.$session.get("key");
        this.bookId = bookId;
        this.number = number;
        this.payDialog = true;
      },

      deleteCart(id) {
        this.$axios
          .post('/cart/delete', {
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
            .post('/cart/pay', {
              id: this.id,
              userId: this.$session.get("key"),
              bookId: this.bookId,
              number: this.number,
              totalPrice: this.totalPrice,
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
            .post('/cart/nopay', {
              id: this.id,
              userId: this.$session.get("key"),
              bookId: this.bookId,
              number: this.number,
              totalPrice: this.totalPrice,
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
