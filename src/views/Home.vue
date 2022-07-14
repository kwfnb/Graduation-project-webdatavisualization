<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:21:59
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 00:23:37
-->
<template>
  <div class="home">
    <el-row class="top" style="min-width: 100%">
      <el-col :span="1"></el-col>
      <el-col class="title" :span="3"><b>体育云平台</b> </el-col>

      <el-col class="nav" :span="6"
        ><el-button class="nav-a" @click="nav(0)">首页</el-button
        ><el-button class="nav-a" @click="nav(1)">赛程</el-button>
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="2">
        <el-button v-if="webLogin != 1" @click="nav(3)" round>登录</el-button>
        <div class="avatarlink" v-else>
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <el-link type="warning" @click="exit()">退出登录</el-link>
        </div>
      </el-col>
    </el-row>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      webLogin: 0,
      circleUrl: "",
    };
  },
  mounted() {
    this.webLogin = localStorage.getItem("webLogin");
    if (this.webLogin == 1) {
      this.circleUrl = localStorage.getItem("userPort");
    }
  },
  methods: {
    nav(e) {
      switch (e) {
        case 0:
          this.$router.push({ path: "/HomePage" });
          break;
        case 1:
          this.$router.push({ path: "/schedule" });
          break;
        case 3:
          this.$router.push({ path: "/Login" });
          break;
        default:
          break;
      }
    },
    exit() {
      localStorage.setItem("webLogin", 0);
      localStorage.setItem("userName", "");
      localStorage.setItem("userPort", "");
      localStorage.setItem("userId", "");
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100%;
  .nav {
    font-family: NSimSun;
    font-size: 28px;
    a {
      color: #fff;
      text-decoration: none;
      margin-left: 20px;
    }
    .nav-a {
      border: none;
      background: none;
      color: #fff;
      font-size: 24px;
    }
  }
}
.top {
  z-index: 1000;
  min-width: 100%;
  height: 65px;
  background-color: #4458bd;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .title {
    font-family: NSimSun;
    font-size: 28px;
    color: #fff;
  }
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 635px;
}
.avatarlink {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

<style>
.nav-a {
  border: none;
  background: none;
  font-size: 24px;
}
.nav-a:hover {
  border: none;
  background: none;
  font-size: 24px;
}
</style>
