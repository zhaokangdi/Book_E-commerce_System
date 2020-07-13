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
                <template slot-scope="scope">{{ scope.row.user.username }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.user.id }}</template>
              </el-table-column>

              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.user.address }}</template>
              </el-table-column>

              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="passApply(scope.row.assistant.id)">通过申请</el-button>
                  <el-button size="small" style="margin-left: 20%" type="danger" plain @click="refuseApply(scope.row.assistant.id)">拒绝申请</el-button>
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
              height="250">
              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.user.username }}</template>
              </el-table-column>

              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.user.id }}</template>
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
                  <el-button size="small" style="margin-left: 40%" type="danger" plain @click="deleteAssistant(scope.row.assistant.id)">删除助理</el-button>
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
        input: '',
        activeName: 'first',

        notPass: {
          user: {},

          assistant: {
            assistantId: '',
            state: '',
          }
        },

        pass: {
          user: {},

          assistant: {
            assistantId: '',
            state: '',
          }
        },
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
            .post('', {
              phone: this.$session.get("key"), // 当前用户
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
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

      assistantNoPass() {
        this.$axios  // 获取待审核的助理列表
          .post('', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/assistantApply', query: {notPass: data}});
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
          .post('', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/assistantApply', query: {notPass: data}});
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
          .post('', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/assistantApply', query: {notPass: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      deleteAssistant(id) {
        this.$axios
          .post('', {
            id: id,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data;
              this.reload();
              this.activeName = 'second';
              this.$router.push({path: '/assistantApply', query: {pass: data}});
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
