<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item @click="showMain()">首页</el-menu-item>
        <el-menu-item @click="shopCart()">购物车</el-menu-item>
        <el-menu-item index="/order" @click="orderManage()">订单</el-menu-item>
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
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="未支付" name="first">
          <div>
            <el-table
              :data="unPayList"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="picture"
                label="商品"
                width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.book.picPath" class="cover">
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.book.name }}</template>
              </el-table-column>

              <el-table-column
                prop="storeName"
                label="店铺名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.store.name }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="100">
                <template slot-scope="scope">￥{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.order.number" size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.order.totalPrice }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="continuePay(scope.row.order.id, scope.row.order.totalPrice)">继续支付</el-button>
                  <el-button size="small" type="danger" plain @click="deleteOrder(scope.row.order.id)">取消订单</el-button>
                </template>
              </el-table-column>
            </el-table>

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
        </el-tab-pane>

        <el-tab-pane label="已支付" name="second">
          <div>
            <el-table
              :data="payList"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="picture"
                label="商品"
                width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.book.picPath" class="cover">
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.book.name }}</template>
              </el-table-column>

              <el-table-column
                prop="storeName"
                label="店铺名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.store.name }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="100">
                <template slot-scope="scope">￥{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.order.number" size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.order.totalPrice }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已发货" name="third">
          <div>
            <el-table
              :data="sendList"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="picture"
                label="商品"
                width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.book.picPath" class="cover">
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                width="400">
                <template slot-scope="scope">{{ scope.row.book.name }}</template>
              </el-table-column>

              <el-table-column
                prop="storeName"
                label="店铺名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.store.name }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.order.number" size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.order.totalPrice }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="sureGet(scope.row.order.id)">确认收货</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已收货" name="fourth">
          <div>
            <el-table
              :data="getList"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="picture"
                label="商品"
                width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.book.picPath" class="cover">
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                width="400">
                <template slot-scope="scope">{{ scope.row.book.name }}</template>
              </el-table-column>

              <el-table-column
                prop="storeName"
                label="店铺名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.store.name }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.order.number" size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">￥{{ scope.row.order.totalPrice }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="clickScore(scope.row.book.id, scope.row.book.name)">书籍评分</el-button>
                  <el-dialog title="书籍评分" :visible.sync="dialogScore">
                    <el-form :model="bookScore">
                      <el-form-item label="书籍名称">
                        <el-input v-model="bookScore.name" autocomplete="off" style="width: 500px" disabled>{{scope.row.book.name}}</el-input>
                      </el-form-item>

                      <el-form-item label="用户评分">
                        <div class="block" style="margin-top: 10px">
                          <el-rate
                            v-model="bookScore.score"
                            :colors="colors">
                          </el-rate>
                        </div>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogScore = false">取 消</el-button>
                      <el-button type="primary" @click="scoreBook()">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Order",
    inject: ['reload'],

    data() {
      return {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

        dialogScore: false,
        payDialog: false,

        id: '',
        bookId: '',
        totalPrice: '',
        activeName: 'first',

        order: {
          id: '',
          bookId: '',
          userId: '',
          number: '',
          totalPrice: '',
          placeDate: '',
          state: '',
        },

        user: {
          id: '',
          username: '',
          password: '',
          address: '',
          role: '',
        },

        book: {
          id: '',
          storeId: '',
          name: '',
          author: '',
          publishingHouse: '',
          price: '',
          category: '',
          introduction: '',
          picPath: '',
        },

        store: {
          id: '',
          name: '',
          phone: '',
          address: '',
          introduction: '',
        },

        unPayList: [
          {
            picPath: '',
            name: '',
            price: '',
            storeName: '',
            number: '',
            totalPrice: '',
            state: '',
          }
        ],

        payList: [
          {
            picPath: '',
            name: '',
            price: '',
            storeName: '',
            number: '',
            totalPrice: '',
            state: '',
          }
        ],

        sendList: [
          {
            picPath: '',
            name: '',
            price: '',
            storeName: '',
            number: '',
            totalPrice: '',
            state: '',
          }
        ],

        getList: [
          {
            picPath: '',
            name: '',
            price: '',
            storeName: '',
            number: '',
            totalPrice: '',
            state: '',
          }
        ],

        bookScore: {
          name: '',
          score: '',
        },
      }
    },

    methods: {
      handleClick(tab, event) {
        if(this.activeName === 'first') {
          this.orderManage();
        }else if(this.activeName === 'second') {
          this.$axios  // 获取已支付，未发货的订单
            .post('order/useryizhifu', {
              userId: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.payList = data;
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }else if(this.activeName === 'third') {
          this.$axios  // 获取已发货的订单
            .post('order/useryifahuo', {
              userId: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.sendList = data;
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }else {
          this.$axios  // 获取已收货的订单
            .post('/order/useryiqianshou', {
              userId: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.getList = data;
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }
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
              this.reload();
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

      continuePay(id, totalPrice) {
        this.payDialog = true;
        this.id = id;
        this.totalPrice = totalPrice;
      },

      pay(operation) {
        if(operation === 'sure') {
          this.$axios
            .post('/order/pay1', {
              id: this.id,
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
                this.payDialog = false;
                var data = successResponse.data.data;
                this.reload();
                this.$router.push({path: '/order', query: {unPayList: data}});
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert('失败！');
            })
        }else if(operation === 'giveUp') {
          alert("未支付！");
          this.payDialog = false;
        }else {
          this.payDialog = false;
        }
      },

      deleteOrder(id) {
        this.$axios
          .post('/order/cancel', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/order', query: {unPayList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      sureGet(id) {
        this.$axios
          .post('order/confirm', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.activeName = 'third';
              this.$router.push({path: '/order', query: {unPayList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      clickScore(bookId, bookName) {
        this.bookId = bookId;
        this.bookScore.name = bookName;
        this.dialogScore = true;
      },

      scoreBook() {
        this.$axios
          .post('/order/score', {
            userId: this.$session.get("key"), // 当前用户
            bookId: this.bookId,
            score: this.bookScore.score,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("感谢您的评分！");
              this.dialogScore = false;
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/order', query: {unPayList: data}});
              this.activeName = 'fourth';
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      }
    },

    mounted() {
      this.unPayList = this.$route.query.unPayList;
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
