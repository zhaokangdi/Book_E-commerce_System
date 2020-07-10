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
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="未支付" name="first">
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
                show-overflow-tooltip>
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
                  <el-button size="small" type="success" plain @click="payDialog = true">继续支付</el-button>
                  <el-button size="small" type="danger" plain @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
                </template>
               </el-table-column>
            </el-table>

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
        </el-tab-pane>

        <el-tab-pane label="已支付" name="second">
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
                show-overflow-tooltip>
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
                  <el-input-number v-model="num" size="small" :min="1" :disabled="true">{{ scope.row.number }}</el-input-number>
                </template>
              </el-table-column>

              <el-table-column
                prop="total"
                label="金额"
                width="120">
                <template slot-scope="scope">{{ scope.row.total }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已发货" name="third">
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
                width="400">
                <template slot-scope="scope">{{ scope.row.book }}</template>
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
                width="120">
                <template slot-scope="scope">{{ scope.row.price }}</template>
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
                  <el-button size="small" type="success" plain @click="">确认收货</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已收货" name="fourth">
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
                width="400">
                <template slot-scope="scope">{{ scope.row.book }}</template>
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
                width="120">
                <template slot-scope="scope">{{ scope.row.price }}</template>
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
                  <el-button size="small" type="primary" plain @click="dialogScore = true">书籍评分</el-button>

                  <el-dialog title="书籍评分" :visible.sync="dialogScore">
                    <el-form :model="score">
                      <el-form-item label="书籍名称">
                        <el-input v-model="score.name" autocomplete="off" style="width: 500px" :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="用户评分">
                        <div class="block" style="margin-top: 10px">
                          <el-rate
                            v-model="value"
                            :colors="colors">
                          </el-rate>
                        </div>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogScore = false">取 消</el-button>
                      <el-button type="primary" @click="dialogScore = false">确 定</el-button>
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

    data() {
      return {
        input: '',
        activeName: 'first',
        num: 1,
        dialogScore: false,
        payDialog: false,
        value: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

        tableData: [{
          picture: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
          book: '三体',
          storeName: '哈尔的书屋',
          price: '￥60',
          number: 3,
          total: '￥60'
        }],

        score: {
          name: '',
          score: '',
        },
      }
    },

    methods: {
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
