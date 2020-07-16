<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item @click="showMain()">首页</el-menu-item>
        <el-menu-item @click="shopCart()">购物车</el-menu-item>
        <el-menu-item @click="orderManage()">订单</el-menu-item>
        <el-menu-item index="/personalSetting" @click="personalInfoSetting()">个人设置</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的店铺</template>
          <el-menu-item @click="storeManage()">店铺管理</el-menu-item>
          <el-menu-item @click="storeInfoSetting()">店铺信息</el-menu-item>
          <el-menu-item @click="assistantNoPass()">申请通知</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>


    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div>
            <el-form label-width="80px" :model="personInfo">
              <el-form-item label="用户昵称">
                <el-input v-model="personInfo.name" style="width: 600px; margin-right: 45%" disabled></el-input>
              </el-form-item>

              <el-form-item label="用户身份">
                <el-input v-model="personInfo.role" style="width: 600px; margin-right: 45%" disabled></el-input>
                <el-button type="primary" plain v-if="personInfo.role === '普通用户'" @click="assistantDialog = true">助理申请</el-button>
                <el-button type="primary" plain v-else disabled>助理申请</el-button>
              </el-form-item>

              <el-form-item label="家庭住址">
                <el-input v-model="personInfo.address" style="width: 600px; margin-right: 45%" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div>
      <el-dialog title="助理申请" :visible.sync="assistantDialog">
        <el-form :model="assistantApply">
          <el-form-item label="店铺编号" >
            <el-input v-model="assistantApply.storeId" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="width: 100px" type="primary" @click="apply()">申 请</el-button>
          <el-button style="width: 100px; margin-left: 20%" @click="assistantDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonalSetting",
    inject: ['reload'],

    data() {
      return {
        activeName: 'first',

        assistantDialog: false,

        assistantApply: {
          storeId: '',
        },

        personInfo: {
          userId:'',
          name:'',
          role:'',
          address:''
        },

        personPassword: {
          oldPassword: '',
          newPassword: '',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
              this.reload();
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

      apply() {
        this.$axios
          .post('/user/apply_assistant', {
            userId: this.$session.get("key"), // 当前用户
            storeId: this.assistantApply.storeId,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              this.assistantDialog = false;
              this.personalInfoSetting();
            }
            else{
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },
    },

    mounted() {
      this.personInfo = this.$route.query.personalInfo;
    }
  }
</script>

<style scoped>

</style>
