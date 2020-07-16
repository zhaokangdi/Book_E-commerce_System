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
          <el-menu-item index="/assistantApply" @click="assistantNoPass()">申请通知</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="未通过" name="first">
          <div>
            <el-table
              :data="notPass"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.username }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.userId }}</template>
              </el-table-column>

              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.useraddress }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="passApply(scope.row.id)">通过申请</el-button>
                  <el-button size="small" style="margin-left: 20%" type="danger" plain @click="refuseApply(scope.row.id)">拒绝申请</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="second">
          <div>
            <el-table
              :data="pass"
              style="width: 100%"
              height="100%">
              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.username }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.userId }}</template>
              </el-table-column>

              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.useraddress }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" style="margin-left: 40%" type="danger" plain @click="deleteAssistant(scope.row.id)">删除助理</el-button>
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
    name: "AssistantApply",
    inject: ['reload'],

    data() {
      return {
        activeName: 'first',

        notPass: [
          {
            id: '',
            username: '',
            userId: '',
            useraddress: '',
          }
        ],

        pass: [
          {
            id: '',
            username: '',
            userId: '',
            useraddress: '',
          }
        ],
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        if(this.activeName === 'first') {
          this.assistantNoPass();
        }else {
          this.$axios  // 获取已通过的助理列表
            .post('/store/all_assistant', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.pass = data;
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
                this.reload()
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

      passApply(id) {
        this.$axios
          .post('/store/assistant_agree', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("已通过申请！");
              this.assistantNoPass();
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      refuseApply(id) {
        this.$axios
          .post('/store/assistant_refuse', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("已拒绝该用户申请！");
              this.assistantNoPass();
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      deleteAssistant(id) {
        alert(id)
        this.$axios
          .post('/store/assistant_delete', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert("已删除该用户申请！");
              //this.assistantNoPass();
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },
    },

    mounted() {
      this.notPass = this.$route.query.notPass;
    }
  }
</script>

<style scoped>

</style>
