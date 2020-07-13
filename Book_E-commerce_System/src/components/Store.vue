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
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick()">
        <el-tab-pane label="图书管理" name="first">
          <div style="margin-left: -73%">
            <el-row>
              <el-button type="success" plain v-if="(storeExist() === '0') || (storeExist() === '1')" disabled>新增店铺</el-button>
              <el-button type="success" plain v-else @click="addStore()">新增店铺</el-button>
              <el-button type="primary" plain v-if="(storeExist() === '1') || (storeExist() === '2')" disabled>上架新书</el-button>
              <el-button type="primary" plain v-else @click="newBookDialog = true">上架新书</el-button>
              <el-button type="danger" plain v-if="(storeExist() === '1') || (storeExist() === '2')" disabled>注销店铺</el-button>
              <el-button type="danger" plain v-else @click="deleteStore()">注销店铺</el-button>
            </el-row>
          </div>

          <div>
            <div>
              <el-table
                :data="booksList"
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
                  prop="name"
                  width="400">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column
                  prop="category"
                  label="类别"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.category }}</template>
                </el-table-column>

                <el-table-column
                  prop="author"
                  label="作者"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.author }}</template>
                </el-table-column>

                <el-table-column
                  prop="number"
                  label="单价"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.price }}</template>
                </el-table-column>

                <el-table-column
                  prop="operation">
                  <template slot-scope="scope">
                    <el-button size="medium" type="primary" plain @click="moreInfo(scope.row.id)">详情</el-button>
                    <el-button style="margin-left: 10%" size="medium" type="danger" plain @click="deleteBook(scope.row.id)">下架</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div>
                <el-dialog title="书籍详情" :visible.sync="bookDialog" :model="bookInfo">
                  <el-card>
                    <div>
                      <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="书籍名称">
                          <el-input v-model="bookInfo.name" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="作者姓名">
                          <el-input v-model="bookInfo.author" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="出版社名">
                          <el-input v-model="bookInfo.publishingHouse" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="出版日期">
                          <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="bookInfo.publishingDate"
                            type="date"
                            style="width: 450px">
                          </el-date-picker>
                        </el-form-item>

                        <el-form-item label="书籍单价">
                          <el-input v-model="bookInfo.price" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="书籍类别">
                          <el-select v-model="bookInfo.category" style="width: 450px">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>

                        <el-form-item label="书籍简介">
                          <el-input v-model="bookInfo.introduction" autocomplete="off" type="textarea" :rows="6" style="width: 450px"></el-input>
                        </el-form-item>
                      </el-form>

                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width: 30%" @click="updateBook(bookInfo.id)">修 改</el-button>
                        <el-button style="width: 30%; margin-left: 20%" @click="bookDialog = false">取 消</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-dialog>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="用户订单" name="second">
          <el-table
            :data="orderList"
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
              prop="name"
              width="300">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column
              prop="price"
              label="单价"
              width="80">
              <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column
              prop="user"
              label="用户"
              width="200">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.number" size="small" :min="1" :disabled="true">{{ scope.row.number }}</el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="total"
              label="金额"
              width="120">
              <template slot-scope="scope">{{ scope.row.totalPrice }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="medium" type="primary" plain @click="orderMoreInfo(scope.row.id)">详情</el-button>
                <el-button style="margin-left: 10%" size="medium" type="success" plain v-if="scope.row.state === '已发货'" @click="sendBook(scope.row.id)" disabled>发货</el-button>
                <el-button style="margin-left: 10%" size="medium" type="success" plain v-if="scope.row.state === '已支付'" @click="sendBook(scope.row.id)">发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div>
      <el-dialog title="店铺申请" :visible.sync="addStoreDialog">
        <el-form :model="storeApply">
          <el-form-item label="店铺名称" >
            <el-input v-model="storeApply.storeName" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>

          <el-form-item label="店铺简介" >
            <el-input v-model="storeApply.introduction" type="textarea" :rows="5" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="width: 100px" type="primary" @click="addStore()">申 请</el-button>
          <el-button style="width: 100px; margin-left: 20%" @click="addStoreDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="新书上架" :visible.sync="newBookDialog">
        <el-card>
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="newBookInfo">
              <el-form-item label="书籍图片">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>

              <el-form-item label="书籍名称">
                <el-input v-model="newBookInfo.name" autocomplete="off" style="width: 450px" placeholder="请输入书籍名称"></el-input>
              </el-form-item>

              <el-form-item label="作者姓名">
                <el-input v-model="newBookInfo.author" autocomplete="off" style="width: 450px" placeholder="请输入作者姓名"></el-input>
              </el-form-item>

              <el-form-item label="出版社名">
                <el-input v-model="newBookInfo.publishingHouse" autocomplete="off" style="width: 450px" placeholder="请输入出版社名"></el-input>
              </el-form-item>

              <el-form-item label="出版日期">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="newBookInfo.publishingDate"
                  type="date"
                  style="width: 450px"
                  placeholder="请选择出版日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="书籍单价">
                <el-input v-model="newBookInfo.price" autocomplete="off" style="width: 450px" placeholder="请输入书籍单价"></el-input>
              </el-form-item>

              <el-form-item label="书籍类别">
                <el-select v-model="newBookInfo.category" style="width: 450px" placeholder="请选择书籍类别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="书籍简介">
                <el-input v-model="newBookInfo.introduction" autocomplete="off" type="textarea" :rows="6" style="width: 450px" placeholder="请输入书籍简介"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 30%" @click="addBook()">确 定</el-button>
              <el-button style="width: 30%; margin-left: 20%" @click="newBookDialog = false">取 消</el-button>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="订单详情" :visible.sync="orderDialog">
        <el-card>
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="orderInfo">
              <el-form-item label="书籍名称">
                <el-input v-model="orderInfo.book.name" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="书籍单价">
                <el-input v-model="orderInfo.book.price" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="购买数量">
                <el-input v-model="orderInfo.order.number" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="金额总计">
                <el-input v-model="orderInfo.order.totalPrice" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="用户昵称">
                <el-input v-model="orderInfo.user.username" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="用户地址">
                <el-input v-model="orderInfo.user.address" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="用户电话">
                <el-input v-model="orderInfo.user.id" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>

              <el-form-item label="订单时间">
                <el-input v-model="orderInfo.order.placeDate" autocomplete="off" style="width: 450px" disabled></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 30%" @click="orderDialog = false">确 定</el-button>
              <el-button style="width: 30%; margin-left: 20%" @click="orderDialog = false">关 闭</el-button>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Store",
    inject: ['reload'],

    data() {
      return {
        input: '',
        activeName: 'first',
        num: 1,
        value: '',
        labelPosition: 'left',

        dialogImageUrl: '',
        dialogVisible: false,

        addStoreDialog: false,
        newBookDialog: false,
        bookDialog: false,
        orderDialog: false,

        booksList: [],

        bookInfo: {
          id: '',
          name: '三体',
          author: '刘慈欣',
          publishingHouse: '出版社',
          publishingDate: '2019-05-05',
          price: '￥60',
          category: '文学小说',
          introduction: '三体',
        },

        storeApply: {
          storeName: '',
          introduction: '',
        },

        newBookInfo: {
          picture: '',
          name: '',
          author: '',
          publishingHouse: '',
          publishingDate: '',
          category: '',
          introduction: '',
        },

        orderList: [
          {
            picture: '',
            name: '1',
            price: '2',
            userName: '3',
            number: '4',
            totalPrice: '5',
            state: '已发货',
          }
        ],

        orderInfo: {
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
          }
        },

        options: [
          {
            value: '社会历史',
            label: '社会历史',
          },

          {
            value: '军事科学',
            label: '军事科学'
          },

          {
            value: '卫生保健',
            label: '卫生保健'
          },

          {
            value: '艺术珍藏',
            label: '艺术珍藏'
          },],
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleClick(tab, event) {
        if(this.activeName === 'first') {
          this.storeManage();
        }else {
          this.$axios  // 获取已支付和已发货的订单
            .post('', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
                var data = successResponse.data.data;
                this.orderList = data;
              }else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }
      },

      handleDelete(index, row) {
        console.log(index, row);
      },

      storeManage() {
        this.$axios  // 获取图书
          .post('', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/store', query: {booksList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      addStore() {
        alert(this.storeApply.storeName + this.storeApply.introduction);
        this.addStoreDialog = false;
      },

      deleteStore() {
        this.$axios // 删除店铺
          .post('', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message); // 删除成功
            }
          })
          .catch(failResponse => {
            alert('数据获取失败！');
          })
      },

      storeExist() {
        this.$axios // 是否存在店铺
          .post('store/exist', {
            phone: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              return successResponse.data.message;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('数据获取失败！');
          })
      },

      storeExist() {
        if(this.$session.get("key") > 10) {
          return '0';
        }else {
          return false;
        }
      },

      addBook() {
        this.$axios
          .post('', {
            phone: this.$session.get("key"), // 当前用户
            picture: this.newBookInfo.picture,
            name: this.newBookInfo.name,
            author: this.newBookInfo.author,
            publishingHouse: this.newBookInfo.publishingHouse,
            publishingDate: this.newBookInfo.publishingDate,
            price: this.newBookInfo.price,
            category: this.newBookInfo.category,
            introduction: this.newBookInfo.introduction,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message); // 新书已上架
              this.storeManage();
              this.newBookDialog = false;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      moreInfo() {
        this.bookDialog = true;
      },

      updateBook(id) {
        alert(this.bookInfo.publishingDate +  this.bookInfo.category);
        this.bookDialog = false;
      },

      deleteBook(id) {
        this.$axios
          .post('', {
            phone: this.$session.get("key"), // 当前用户
            id: id, // 删除书籍编号
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/store', query: {bookList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      orderMoreInfo(id) {
        this.$axios // 订单详情
          .post('', {
            phone: this.$session.get("key"), // 当前用户
            id: id, // 查询订单编号
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              this.orderInfo = successResponse.data.data;
              this.orderDialog = true;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },
   /**
      orderMoreInfo(id) {
        this.orderDialog = true;
      },
**/
      sendBook(id) {
        this.$axios
          .post('', {
            id: id, // 订单编号
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message); // 已发货
              var data = successResponse.data.data; // 重新加载订单
              this.reload();
              this.orderList = data;
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      }
    },

    mounted() {
      this.booksList = this.$route.query.booksList;
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
