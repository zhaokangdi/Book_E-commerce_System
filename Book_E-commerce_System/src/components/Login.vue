<template>
  <div id="poster">
    <div>
      <el-form class="login-container" label-position="left" label-width="0px">
        <h2 class="login_title">哆啦BOOK梦</h2>
        <el-form-item>
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="danger" plain style="float: left; font-weight:bold; width: 40%" @click="dialogRegister = true">注册</el-button>
          <el-button type="primary" plain  style="float: right; font-weight:bold; width: 40%" v-on:click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-dialog title="注册" :visible.sync="dialogRegister" :before-close="handleClose" center>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="普通用户注册" name="user">
            <el-form label-width="80px" :model="userRegister"  ref="userRegister">
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="userRegister.phone" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="name">
                <el-input v-model="userRegister.name" placeholder="请输入用户昵称"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="userRegister.password" placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item label="通讯地址" prop="address">
                <el-input v-model="userRegister.address" placeholder="请输入通讯地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register('user')">立即注册</el-button>
                <el-button @click="resetForm('userRegister')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="商家注册" name="business">
            <el-form label-width="80px" :model="businessRegister" ref="businessRegister">
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="businessRegister.phone" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="name">
                <el-input v-model="businessRegister.name" placeholder="请输入用户昵称"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="businessRegister.password" placeholder="请输入登录密码"></el-input>
              </el-form-item>
              <el-form-item label="通讯地址" prop="address">
                <el-input v-model="businessRegister.address" placeholder="请输入通讯地址"></el-input>
              </el-form-item>
              <el-form-item label="店铺名称" prop="store">
                <el-input v-model="businessRegister.store" placeholder="请输入店铺名称"></el-input>
              </el-form-item>
              <el-form-item label="店铺简介" prop="introduction">
                <el-input type="textarea" :rows="5" v-model="businessRegister.introduction" placeholder="请输入个人简介"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register('business')">立即注册</el-button>
                <el-button @click="resetForm('businessRegister')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        dialogRegister: false,
        activeName: 'user',

        loginForm: {
          username: '',
          password: ''
        },

        userRegister: {
          phone: '',
          name: '',
          password: '',
          address: ''
        },

        businessRegister: {
          phone: '',
          name: '',
          password: '',
          address: '',
          store: '',
          introduction: ''
        }
      }
    },

    methods: {
      login() {
        this.$axios
          .post('/login', {
            id: this.loginForm.username,
            password: this.loginForm.password,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if(successResponse.data.message === "系统管理员") {
                var data = successResponse.data.data
                this.$router.push({path: '/adminMain', query: {userList: data}});
                alert(successResponse.data.message);
              }else {
                this.$session.set("key",this.loginForm.username);
                alert(successResponse.data.message)
                this.$axios
                  .post('/book/renwensheke',{
                    id: this.loginForm.username
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                      var data = successResponse.data.data;
                      this.$router.push({path: '/main', query: {mainList: data}});
                    }
                  })
                  .catch(failResponse => {
                    alert("失败！");
                  })
              }
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {

          })
      },

      register(identify) {
        if(identify == 'user') {
          this.$axios
            .post('/register', {
              id: this.userRegister.phone,
              username: this.userRegister.name,
              password: this.userRegister.password,
              address: this.userRegister.address,
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
                this.dialogRegister = false;
              }
              else{
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {

            })
        }else {
          alert(this.businessRegister.phone)
          alert(this.businessRegister.name)
          this.$axios
            .post('/business/register', {
              phone: this.businessRegister.phone,
              name: this.businessRegister.name,
              password: this.businessRegister.password,
              address: this.businessRegister.address,
              storeName: this.businessRegister.store,
              introduction: this.businessRegister.introduction,
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                alert(successResponse.data.message);
                this.dialogRegister = false;
              }
              else{
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse => {

            })
        }
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  #poster {
    background: url("../assets/background.png") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body{
    margin: 0px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 12% auto 90px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>

