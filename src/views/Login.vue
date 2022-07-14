<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-05 02:59:12
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 00:24:55
-->
<template>
  <div class="login">
    <div class="header">{{ title }}</div>
    <div class="main">
      <el-form
        class="main_form"
        ref="form"
        label-width="80px"
        label-position="top"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            placeholder="请输入登录名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            prefix-icon="el-icon-setting"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="" v-if="showType" prop="phone">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入手机号"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="" v-if="showType">
          <el-input
            prefix-icon="el-icon-unlock"
            placeholder="请输入验证码"
            v-model="form.SMSnum"
          >
            <el-button slot="append" @click="SMSin()" :loading="loading"
              >发送短信</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!showType"
            style="width: 100%"
            type="primary"
            v-model="form.name"
            class="elBtn"
            @click="login()"
            >登录</el-button
          >
          <el-button
            v-if="showType"
            style="width: 100%"
            type="primary"
            v-model="form.name"
            class="elBtn"
            @click="zhuche()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <el-link
        v-if="!showType"
        type="primary"
        @click="
          () => {
            this.showType = true;
            this.title = '注册窗口';
          }
        "
        >未有账号，前往注册</el-link
      >
      <el-link
        v-if="showType"
        @click="
          () => {
            this.showType = false;
            this.title = '登录窗口';
          }
        "
        type="primary"
        >已有账号，前往登录</el-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  SMSverification,
  insertUser,
  getFootball,
  selectUserByName,
} from "../api/data.js";
import Frame from "../components/Frame.vue";
export default {
  name: "Login",
  components: {
    Frame,
  },
  data() {
    return {
      loading: false,
      title: "登录窗口",
      showType: false,
      DuiMa: "",
      form: {
        username: "",
        password: "",
        phone: "",
        SMSnum: "",
      },
      dyForm: {},
      rules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "请输入5到12位的登录名",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "请输入8到16位的密码",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    /* axios({
      url: "http://apis.juhe.cn/fapig/football/query?key=75d7e3fd2afb0466e0a025ba1c098eb8&type=xijia",
      method: "get",
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(res);
    }); */
  },
  methods: {
    login() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          selectUserByName({
            userName: this.form.username,
          }).then((res) => {
            if (res.data.data == null) {
              this.$message.error("无此用户");
            } else {
              if (this.form.password == res.data.data.userPassword) {
                localStorage.setItem("webLogin", 1);
                localStorage.setItem("userName", res.data.data.userName);
                localStorage.setItem("userPort", res.data.data.userPort);
                localStorage.setItem("userId", res.data.data.userId);

                this.$router.push({
                  path: "/homePage",
                });
                location.reload();
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
              } else {
                this.$message.error("密码错误");
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    zhuche() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.DuiMa, this.form.SMSnum);
          if (this.DuiMa == this.form.SMSnum) {
            insertUser({
              userName: this.form.username,
              userPassword: this.form.password,
              userPort:
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fys_bnew_img%2F00%2F10%2F83%2F54xXAJVRIn.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649907546&t=2f679a501757b90e10437b4e2583a44d",
              userPhone: this.form.phone,
              userLevel: "1",
            }).then((res) => {
              this.$router.push({ path: "/HomePage" });
            });
          } else {
            this.$message.error("验证码错误请重新输入");
          }
        } else {
          return false;
        }
      });
    },
    SMSin() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.DuiMa = "";
          for (let i = 0; i < 4; i++) {
            this.DuiMa += Math.floor(Math.random() * 10);
          }
          SMSverification({
            content: `【体育云平台】你的验证码是：${this.DuiMa}，3分钟内有效！`,
            mobile: this.form.phone,
          }).then(() => {
            setTimeout(() => {
              this.DuiMa = "";
            }, 180000);
            this.loading = true;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 100%;
  min-height: 655px;
  /* background-color: rgb(247, 247, 247); */
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallpaperm.cmcm.com%2F9e4b494b06945e721f84cab63c3b7e53.jpg&refer=http%3A%2F%2Fwallpaperm.cmcm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651699278&t=06257bb3c6ee8defa30bcdce17468c11");
  background-size: 100%;
}
.main {
  width: 400px;
  height: 480px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  background-color: #fff;
  flex-direction: column;
  border: 1px #fff solid;
  border-radius: 5px;

  &_form {
    width: 80%;
    margin-top: 80px;
  }
}
.header {
  position: fixed;
  top: 170px;
  font-family: YouYuan;
  font-size: 40px;
}
.elBtn {
  background-color: #4458bd;
}
</style>
