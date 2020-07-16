<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item @click="showMain()">首页</el-menu-item>
        <el-menu-item @click="shopCart()">购物车</el-menu-item>
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
      <el-card class="box-card" style="height: 520px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-model="bookInfo.category">{{bookInfo.category}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{bookInfo.name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="box" style="margin-top: 2%">
          <div class="left">
            <div class="demo-image__placeholder">
              <div class="block">
                <el-image style="margin-left: 5%; width: 100%" :src="bookInfo.picPath"></el-image>
              </div>
            </div>
          </div>

          <div class="center">
            <div style="text-align: left">
              <h1 class="main_title">{{bookInfo.name}}</h1>
              <h1 class="main_title" style="color: red">￥{{bookInfo.price}}</h1>

              <el-rate
                v-model="bookInfo.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>

            <el-divider><i class="el-icon-collection-tag"></i></el-divider>

            <div style="text-align: left">
              <h5 class="main_title">作者:{{bookInfo.author}}</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">出版社:{{bookInfo.publishingHouse}}</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">出版日期:{{bookInfo.publishingDate}}</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">店铺:##Store{{bookInfo.storeId}}</h5>
            </div>

            <div style="text-align: left">
              <h5 class="main_title">简介:{{bookInfo.introduction}}</h5>
            </div>
          </div>

          <div class="right">
            <div>
              <div style="margin-top: 125%">
                <el-input-number v-model="number" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>

              <div style="margin-top: 20%">
                <el-button type="primary" style="width: 180px" plain @click="addToCart()">加入购物车</el-button>
                <el-button type="success" style="width: 180px; margin-top: 10%" plain @click="payBook()">付款</el-button>
              </div>
            </div>
          </div>
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
    name: "BookInfo",

    data() {
      return {
        number: '1',
        totalPrice: '',

        payDialog: false,

        bookInfo: {
          id: '',
          storeId: '',
          category: '',
          name: '',
          score: '',
          price: '',
          author: '',
          publishingHouse: '',
          publishingDate: '',
          introduction: '',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleChange(value) {
        console.log(value);
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

      addToCart() {
        this.$axios
          .post('cart/add', {
            userId: this.$session.get("key"),
            storeId: this.bookInfo.storeId,
            bookId: this.bookInfo.id,
            bookName: this.bookInfo.name,
            number: this.number,
            price: this.bookInfo.price,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
            }else {
              alert("加入失败，请重试！");
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      payBook() {
        this.payDialog = true;
        this.totalPrice = parseFloat(this.bookInfo.price) * parseInt(this.number);
      },

      pay(operation) {
        if(operation === 'sure') {
          this.$axios
            .post('/order/pay', {
              userId: this.$session.get("key"),
              bookId: this.bookInfo.id,
              number: this.number,
              totalPrice: parseFloat(this.bookInfo.price) * parseInt(this.number),
              state: '已支付',
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert("支付成功！");
                this.payDialog = false;
              }else {
                alert("支付失败，请重试！");
              }
            })
            .catch(failResponse => {
              alert('失败！');
            })
        }else if(operation === 'giveUp') {
          this.$axios
            .post('/order/pay', {
              userId: this.$session.get("key"),
              bookId: this.bookInfo.id,
              number: this.number,
              totalPrice: parseFloat(this.bookInfo.price) * parseInt(this.number),
              state: '未支付',
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert("未支付，请前往订单查看！");
                this.payDialog = false;
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

    shopCart() {
      this.$axios
        .post('/cart/all', {
          id: this.$session.get("key"),
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            var data = successResponse.data.data;
            this.$router.push({path: '/shopCart', query: {cartList: data}});
          }else {
            alert(successResponse.data.message);
          }
        })
        .catch(failResponse => {
          alert('失败！');
        })
    },

    mounted() {
      this.bookInfo = this.$route.query.bookInfo;
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
