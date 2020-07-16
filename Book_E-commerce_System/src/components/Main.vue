<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/main" @click="main()">首页</el-menu-item>
        <el-menu-item @click="shopCart()" >购物车</el-menu-item>
        <el-menu-item @click="orderManage()">订单</el-menu-item>
        <el-menu-item @click="personalInfoSetting()">个人设置</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的店铺</template>
          <el-menu-item @click="storeManage()">店铺管理</el-menu-item>
          <el-menu-item @click="storeInfoSetting()">店铺信息</el-menu-item>
          <el-menu-item @click="assistantNoPass()">申请通知</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div style="margin-top: 2px">
      <div class="box">
        <div class="left">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>图书词云</span>
            </div>
            <div v-for="o in putList" :key="o" class="text item">
              <el-button type="danger" plain size="mini" style="height: 20px; line-height: 5px; font-size: 12px"> {{ o }} </el-button>
            </div>
          </el-card>
        </div>

        <div class="center">
          <el-carousel :interval="5000" arrow="always" height="290px">
            <el-carousel-item v-for="item in imgs" v-bind:key="item.url" >
              <img :src="item.url" style="width: 100%; height: 100%"/>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>为您推荐</span>
            </div>
            <div v-for="o in mainList.recommendBooks" :key="o" class="text item">
              <el-button type="primary" plain size="mini" style="height: 20px; line-height: 5px; font-size: 12px" @click="bookInfo(o.bookId)"> {{ o.name}} </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div style="margin-top: 295px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="人文社科" name="first">
          <el-row style="height: 250px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in mainList.bookList" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.publishingDate}}</span>
                <span>{{item.publishingHouse}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.introduction}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.picPath" alt="封面">
                </div>
                <div class="info">
                  <div class="title">
                    <a>{{item.name}}</a>
                    <el-button type="primary" size="mini" @click="bookInfo(item.id)">查看</el-button>
                  </div>
                </div>
                <div class="author" style="color: red">{{item.price}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="社会历史" name="second">
          <el-row style="height: 250px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in SHbooks" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.publishingDate}}</span>
                <span>{{item.publishingHouse}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.introduction}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.picPath" alt="封面">
                </div>
                <div class="info">
                  <div class="title">
                    <a>{{item.name}}</a>
                    <el-button type="primary" size="mini" @click="bookInfo(item.id)">查看</el-button>
                  </div>
                </div>
                <div class="author" style="color: red">{{item.price}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="军事科学" name="third">
          <el-row style="height: 250px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in JSbooks" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.publishingDate}}</span>
                <span>{{item.publishingHouse}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.introduction}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.picPath" alt="封面">
                </div>
                <div class="info">
                  <div class="title">
                    <a>{{item.name}}</a>
                    <el-button type="primary" size="mini" @click="bookInfo(item.id)">查看</el-button>
                  </div>
                </div>
                <div class="author" style="color: red">{{item.price}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="卫生保健" name="fourth">
          <el-row style="height: 250px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in WSbooks" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.publishingDate}}</span>
                <span>{{item.publishingHouse}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.introduction}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.picPath" alt="封面">
                </div>
                <div class="info">
                  <div class="info">
                    <div class="title">
                      <a>{{item.name}}</a>
                      <el-button type="primary" size="mini" @click="bookInfo(item.id)">查看</el-button>
                    </div>
                  </div>
                </div>
                <div class="author" style="color: red">{{item.price}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="艺术珍赏" name="fifth">
          <el-row style="height: 250px; margin-left: 7px; margin-top: 20px">
            <el-tooltip effect="dark" placement="right" v-for="item in YSbooks" :key="item.id">
              <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
              <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                <span>{{item.author}}</span>
                <span>{{item.publishingDate}}</span>
                <span>{{item.publishingHouse}}</span>
              </p>
              <p slot="content" style="width: 300px" class="abstract">{{item.introduction}}</p>

              <el-card style="width: 135px; margin-bottom: 20px;height: 233px; float: left; margin-right: 14px" class="book" bodyStyle="padding:10px" shadow="hover">
                <div class="cover">
                  <img :src="item.picPath" alt="封面">
                </div>
                <div class="info">
                  <div class="title">
                    <a>{{item.name}}</a>
                    <el-button type="primary" size="mini" @click="bookInfo(item.id)">查看</el-button>
                  </div>
                </div>
                <div class="author" style="color: red">{{item.price}}</div>
              </el-card>
            </el-tooltip>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Main",
    inject: ['reload'],

    data() {
      return {
        activeIndex: '1',
        activeName: 'first',

        assistantDialog: false,

        platform: 'pc',
        imgs: [
          {url: require('../assets/1.png')},
          {url: require('../assets/2.png')},
          {url: require('../assets/3.png')},
        ],

        mainList: {
          bookList: [
            {
              id: '',
              picPath: '',
              name: '',
              price: '',
              author: '',
              publishingDate: '',
              publishingHouse: '',
              introduction: '',
            }
          ],

          recommendBooks: [
            {
              bookId: '',
              name: '',
            }
          ]
        },


        bookList: {
          id: '',
          picPath: '',
          name: '',
          price: '',
          author: '',
          publishingDate: '',
          publishingHouse: '',
          introduction: '',
        },

        recommendBooks: {
          bookId: '',
          name: '',
        },

        RWbooks: [
          {
            id: '',
            picPath: '',
            name: '',
            price: '',
            author: '',
            publishingDate: '',
            publishingHouse: '',
            introduction: '',
          },
        ],

        SHbooks: [
          {
            id: '',
            picPath: '',
            name: '',
            price: '',
            author: '',
            publishingDate: '',
            publishingHouse: '',
            introduction: '',
          },
        ],

        JSbooks: [
          {
            id: '',
            picPath: '',
            name: '',
            price: '',
            author: '',
            publishingDate: '',
            publishingHouse: '',
            introduction: '',
          },
        ],

        WSbooks: [
          {
            id: '',
            picPath: '',
            name: '',
            price: '',
            author: '',
            publishingDate: '',
            publishingHouse: '',
            introduction: '',
          },
        ],

        YSbooks: [
          {
            id: '',
            picPath: '',
            name: '',
            price: '',
            author: '',
            publishingDate: '',
            publishingHouse: '',
            introduction: '',
          },
        ],

        putList: [
          '红楼梦',
          '活着',
          '百年孤独',
          '1984',
          '飘',
        ],
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        if(this.activeName === 'first') {
          this.main();
        }else if(this.activeName === 'second') {
          this.$axios
            .post('/book/shehuilishi')
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.SHbooks = data;
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }else if(this.activeName === 'third') {
          this.$axios
            .post('/book/junshikexue')
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.JSbooks = data;
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }else if(this.activeName === 'fourth') {
          this.$axios
            .post('/book/weishengbaojian')
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.WSbooks = data;
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }else {
          this.$axios
            .post('/book/yishuzhenshang')
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var data = successResponse.data.data;
                this.YSbooks = data;
              }
            })
            .catch(failResponse => {
              alert("失败！");
            })
        }
      },

      main() {
        this.$axios
          .post('/book/renwensheke', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/main', query: {mainList: data}});
            }
          })
          .catch(failResponse => {
            alert("失败！");
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

      orderManage() {
        this.$axios
          .post('/order/userweizhifu', {
            userId: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data
              this.$router.push({path: '/order', query: {unPayList: data}})
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
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

      assistantNoPass() {
        this.$axios  // 获取待审核的助理列表
          .post('/store/all_assistant_application', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if((successResponse.data.message === "普通用户") || (successResponse.data.message === "助理")) {
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

      bookInfo(bookId) {
        this.$axios
          .post('/book/info', {
            id: bookId,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/bookInfo', query: {bookInfo: data}});
            } else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },
    },

    mounted() {
      this.mainList = this.$route.query.mainList;
    }
  }
</script>

<style scoped>
  .box{
    position: relative;
  }

  .left{
    position:absolute;
    left: 0;
    width:150px;
  }

  .right{
    position:absolute;
    right: 0;
    width:150px;
  }

  .center{
    position: absolute;
    left: 150px;
    right:150px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,

  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
