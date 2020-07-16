<template>
  <el-container style="height: 590px; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px; height: 15%">
      <h1 class="main_title">哆啦BOOK梦后台管理系统</h1>
    </el-header>

    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246); width: 200px; height: 100%">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="margin-left: -40%"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class= "el-icon-s-management"></i>
              <span>系统管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item @click="userFunction()">用户列表</el-menu-item>
              <el-menu-item @click="businessFunction()">商家列表</el-menu-item>
              <el-menu-item @click="storeFunction()">店铺列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/applyCheck" @click="checkFunction()">
            <i class="el-icon-s-check"></i>
            <span slot="title">申请审核</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-card class="box-card" style="width: 100%; height: 99%">
          <div>
            <el-table
              :data="applyInfo"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="昵称"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column
                prop="storeName"
                label="店铺名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.storeName }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="联系方式"
                width="100px">
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
                  <el-button size="small" type="primary" plain @click="infoApply(scope.row.phone)">详情</el-button>
                  <el-button size="small" type="success" plain @click="passApply(scope.row.phone)">通过</el-button>
                  <el-button size="small" type="danger" plain @click="deleteApply(scope.row.phone)">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-dialog title="申请详情" :visible.sync="businessInfoDialog">
          <el-card>
            <div>
              <el-form :label-position="labelPosition" label-width="80px" :model="apply">
                <el-form-item label="用户昵称">
                  <el-input autocomplete="off" style="width: 450px" v-model="apply.name" disabled></el-input>
                </el-form-item>

                <el-form-item label="联系方式">
                  <el-input autocomplete="off" style="width: 450px" v-model="apply.phone" disabled></el-input>
                </el-form-item>

                <el-form-item label="通讯地址">
                  <el-input autocomplete="off" style="width: 450px" v-model="apply.address" disabled></el-input>
                </el-form-item>

                <el-form-item label="店铺名称">
                  <el-input autocomplete="off" style="width: 450px" v-model="apply.storeName" disabled></el-input>
                </el-form-item>

                <el-form-item label="店铺简介">
                  <el-input type="textarea" :rows="5" style="width: 450px" v-model="apply.introduction" disabled></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" style="width: 30%" @click="businessInfoDialog = false">确 定</el-button>
                <el-button style="width: 30%; margin-left: 20%" @click="businessInfoDialog = false">关 闭</el-button>
              </div>
            </div>
          </el-card>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "ApplyCheck",
    inject: ['reload'],

    data() {
      return {
        businessInfoDialog: false,
        labelPosition: 'left',

        applyInfo: [],
        apply: {
          name: '',
          phone: '',
          address: '',
          storeName: '',
          introduction: '',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      handleDelete(index, row) {
        console.log(index, row);
      },

      userFunction() {
        this.$axios
          .post('/user/all') // 请求用户列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/adminMain', query: {userList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      businessFunction() {
        this.$axios
          .post('/business/all') // 请求商家列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/businessList', query: {businessList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      storeFunction() {
        this.$axios
          .post('/store/all') // 请求店铺列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/storeList', query: {storeList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      checkFunction() {
        this.$axios
          .post('/business/applied') // 请求申请列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.applyInfo = data;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      infoApply(phone) {
        this.$axios
          .post('/business/info', {
            phone: phone,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.apply = successResponse.data.data;
              this.businessInfoDialog = true;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      passApply(phone) {
        this.$axios
          .post('/store/agree', {
            phone: phone,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/applyCheck', query: {applyList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      },

      deleteApply(phone) {
        this.$axios
          .post('/store/reject', {
            phone: phone,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/applyCheck', query: {applyList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("显示失败！");
          })
      }
    },

    mounted: function () {
      this.applyInfo = this.$route.query.applyList;
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .main_title {
    color: #505458;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
