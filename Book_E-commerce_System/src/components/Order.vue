<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
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
                <template slot-scope="scope">{{ scope.row.store.storeName }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="100">
                <template slot-scope="scope">{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="total"
                label="金额"
                width="120">
                <template slot-scope="scope">{{ scope.row.order.totalPrice }}</template>
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
                  <img :src="scope.row.book.picture" class="cover">
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
                <template slot-scope="scope">{{ scope.row.store.storeName }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="100">
                <template slot-scope="scope">{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">{{ scope.row.order.totalPrice }}</template>
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
                  <img :src="scope.row.book.picture" class="cover">
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
                <template slot-scope="scope">{{ scope.row.store.storeName }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="120">
                <template slot-scope="scope">{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">{{ scope.row.order.totalPrice }}</template>
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
                <template slot-scope="scope">{{ scope.row.store.storeName }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="单价"
                width="120">
                <template slot-scope="scope">{{ scope.row.book.price }}</template>
              </el-table-column>

              <el-table-column
                prop="number"
                label="数量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input-number size="small" :min="1" :disabled="true">{{ scope.row.order.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="totalPrice"
                label="金额"
                width="120">
                <template slot-scope="scope">{{ scope.row.order.totalPrice }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="dialogScore = true">书籍评分</el-button>

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
                      <el-button type="primary" @click="scoreBook(scope.row.book.id)">确 定</el-button>
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
        input: '',
        id: '',
        totalPrice: '',
        activeName: 'first',
        dialogScore: false,
        payDialog: false,
        value: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

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
            name: '1',
            price: '2',
            storeName: '3',
            number: '4',
            totalPrice: '5',
            state: '已发货',
          }
        ],

        payList: [
          {
            picPath: '',
            name: '1',
            price: '2',
            storeName: '3',
            number: '4',
            totalPrice: '5',
            state: '已发货',
          }
        ],

        sendList: [
          {
            picPath: '',
            name: '1',
            price: '2',
            storeName: '3',
            number: '4',
            totalPrice: '5',
            state: '已发货',
          }
        ],

        getList: [
          {
            picPath: '',
            name: '1',
            price: '2',
            storeName: '3',
            number: '4',
            totalPrice: '5',
            state: '已发货',
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
            .post('', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
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
            .post('', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
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
            .post('', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
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

      orderManage() {
        this.$axios  // 获取未支付的订单
          .post('', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/store', query: {unPayList: data}});
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
            .post('', {
              id: this.id,
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert("支付成功！");
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
          .post('', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("订单取消！");
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
          .post('', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("确认收货！");
              var data = successResponse.data.data;
              this.reload();
              this.activeName = 'third';
              this.$router.push({path: '/order', query: {sendList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      scoreBook(bookId) {
        this.$axios
          .post('', {
            userId: this.$session.get("key"), // 当前用户
            bookId: bookId,
            score: this.bookScore.score,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("感谢您的评分！");
              this.dialogScore = false;
              var data = successResponse.data.data;
              this.reload();
              this.activeName = 'fourth';
              this.$router.push({path: '/order', query: {getList: data}});
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
