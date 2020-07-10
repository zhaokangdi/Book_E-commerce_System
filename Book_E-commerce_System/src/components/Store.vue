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
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="图书管理" name="first">
          <div style="margin-left: -80%">
            <el-row>
              <el-button type="primary" plain @click="newBookDialog = true">上架新书</el-button>
              <el-button type="danger" plain style="margin-left: 1%">注销店铺</el-button>
            </el-row>
          </div>

          <div>
            <div>
              <el-table
                :data="books"
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
                  width="400">
                  <template slot-scope="scope">{{ scope.row.book }}</template>
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
                    <el-button size="medium" type="primary" plain @click="bookDialog = true">详情</el-button>
                    <el-button style="margin-left: 10%" size="medium" type="danger" plain @click="handleDelete(scope.$index, scope.row)">下架</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div>
                <el-dialog title="书籍详情" :visible.sync="bookDialog" :data="bookInfo">
                  <el-card>
                    <div>
                      <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="书籍名称">
                          <el-input autocomplete="off" style="width: 450px">{{ bookInfo.name }}</el-input>
                        </el-form-item>

                        <el-form-item label="作者姓名">
                          <el-input autocomplete="off" style="width: 450px">{{ bookInfo.author }}</el-input>
                        </el-form-item>

                        <el-form-item label="出版社名">
                          <el-input autocomplete="off" style="width: 450px">{{ bookInfo.publishHouse }}</el-input>
                        </el-form-item>

                        <el-form-item label="出版日期">
                          <el-date-picker
                            v-model="bookInfo.publishDate"
                            type="date"
                            style="width: 450px"
                            placeholder="请选择出版日期日期">
                          </el-date-picker>
                        </el-form-item>

                        <el-form-item label="书籍单价">
                          <el-input v-model="bookInfo.price" autocomplete="off" style="width: 450px">{{ bookInfo.price }}</el-input>
                        </el-form-item>

                        <el-form-item label="书籍类别">
                          <el-select v-model="value" style="width: 450px" placeholder="">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>

                        <el-form-item label="书籍简介">
                          <el-input autocomplete="off" type="textarea" :rows="6" style="width: 450px">{{ bookInfo.introduction }}</el-input>
                        </el-form-item>
                      </el-form>

                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width: 30%" @click="bookDialog = false">修 改</el-button>
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
            :data="orders"
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
              prop="price"
              label="单价"
              width="80">
              <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column
              prop="user"
              label="用户"
              width="200">
              <template slot-scope="scope">{{ scope.row.user }}</template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="num" size="small" :min="1" :disabled="true">{{ scope.row.number }}</el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="total"
              label="金额"
              width="120">
              <template slot-scope="scope">{{ scope.row.total }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="medium" type="primary" plain @click="orderDialog = true">详情</el-button>
                <el-button style="margin-left: 10%" size="medium" type="success" plain @click="handleDelete(scope.$index, scope.row)">发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div>
      <el-dialog title="新书上架" :visible.sync="newBookDialog">
        <el-card>
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="newBookInfo">
              <el-form-item label="书籍图片">
                <div>
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail cover"
                        style="width: 100%;"
                        :src="file.url" alt=""
                      >
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="书籍名称">
                <el-input v-model="newBookInfo.name" autocomplete="off" style="width: 450px" placeholder="请输入书籍名称"></el-input>
              </el-form-item>

              <el-form-item label="作者姓名">
                <el-input v-model="newBookInfo.author" autocomplete="off" style="width: 450px" placeholder="请输入作者姓名"></el-input>
              </el-form-item>

              <el-form-item label="出版社名">
                <el-input v-model="newBookInfo.publishHouse" autocomplete="off" style="width: 450px" placeholder="请输入出版社名"></el-input>
              </el-form-item>

              <el-form-item label="出版日期">
                <el-date-picker
                  v-model="newBookInfo.publishDate"
                  type="date"
                  style="width: 450px"
                  placeholder="请选择出版日期日期">
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
              <el-button type="primary" style="width: 30%" @click="newBookDialog = false">确 定</el-button>
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
                <el-input v-model="orderInfo.name" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="书籍单价">
                <el-input v-model="orderInfo.price" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="购买数量">
                <el-input v-model="orderInfo.number" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="金额总计">
                <el-input v-model="orderInfo.totalPrice" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="用户姓名">
                <el-input v-model="orderInfo.userName" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="用户地址">
                <el-input v-model="orderInfo.address" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="用户电话">
                <el-input v-model="orderInfo.phone" autocomplete="off" style="width: 450px"></el-input>
              </el-form-item>

              <el-form-item label="下单时间">
                <el-input v-model="orderInfo.time" autocomplete="off" style="width: 450px"></el-input>
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

    data() {
      return {
        input: '',
        activeName: 'first',
        num: 1,
        labelPosition: 'left',
        dialogImageUrl: '',
        newBookDialog: false,
        dialogVisible: false,
        disabled: false,
        bookDialog: false,
        orderDialog: false,

        bookInfo: {
          name: '三体',
          author: '刘慈欣',
          publishHouse: '出版社',
          publishDate: '2019-05-05',
          category: '文学小说',
          introduction: '三体',
        },

        newBookInfo: {
          name: '',
          author: '',
          publishHouse: '',
          publishDate: '',
          category: '',
          introduction: '',
        },

        books: [
          {
            picture: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            book: '三体',
            category: '文学小说',
            author: '刘慈欣',
            price: '￥60',
          }
        ],

        orders: [
          {
            picture: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
            book: '三体',
            price: '￥60',
            user: '滴滴滴',
            number: '1',
            total: '￥60',
          }
        ],

        orderInfo: {
          name: '',
          price: '',
          number: '',
          totalPrice: '',
          userName: '',
          address: '',
          phone: '',
          time: '',
        },

        options: [{
          value: '1',
          label: '文学小说'
        }, {
          value: '2',
          label: '人文社科',
        }, {
          value: '3',
          label: '经管励志'
        }, {
          value: '4',
          label: '少儿童书'
        }, {
          value: '5',
          label: '教辅考试'
        }, {
          value: '6',
          label: '科学技术'
        }, {
          value: '7',
          label: '生活娱乐'
        }, {
          value: '8',
          label: '艺术珍享'
        }],
        value: ''
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      handleDelete(index, row) {
        console.log(index, row);
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
