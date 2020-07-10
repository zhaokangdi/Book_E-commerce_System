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
      </el-menu>

      <el-menu-item style="margin-top: -5px; margin-left: 20%">
        <el-input
          style="width: 500px"
          placeholder="请输入内容"
          v-model="input">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-menu-item>
    </div>


    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="未通过" name="first">
          <div>
            <el-table
              :data="notPass"
              style="width: 100%"
              height="250">
              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>

              <el-table-column
                prop="price"
                label="地址"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.address }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="payDialog = true">通过申请</el-button>
                  <el-button size="small" style="margin-left: 20%" type="danger" plain @click="handleDelete(scope.$index, scope.row)">拒绝申请</el-button>
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

        <el-tab-pane label="已通过" name="second">
          <div>
            <el-table
              :data="pass"
              style="width: 100%"
              height="250">
              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>

              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.address }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" style="margin-left: 40%" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除助理</el-button>
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AssistantApply",

    data() {
      return {
        input: '',
        activeName: 'first',

        notPass: [{
          name: '滴滴滴',
          phone: '18810760681',
          address: '吉林省',
        }],

        pass: [{
          name: '滴滴滴',
          phone: '18810760681',
          address: '吉林省',
        }],
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

</style>
