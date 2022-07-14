<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 06:36:42
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 01:00:34
-->
<template>
  <div class="main">
    <Frame class="Frame">
      <el-radio-group v-model="radio4" size="mini" @change="change(3)">
        <el-radio-button label="1">英超BIG6</el-radio-button>
        <el-radio-button label="2">西甲五强</el-radio-button>
        <el-radio-button label="3">意甲七姐妹</el-radio-button>
        <el-radio-button label="4">德甲传统五强</el-radio-button>
        <el-radio-button label="5">法甲四豪门</el-radio-button>
      </el-radio-group>
      <piew
        :legend="true"
        :id="'jifenduibi'"
        :opData="opData4"
        :title="'俱乐部积分对比'"
        :radius="'90%'"
        :showCenter="true"
        :emphasis="40"
        :trigger="true"
        :right="true"
        :roseType="true"
      >
      </piew>
    </Frame>
    <Frame class="Frame">
      <dynamicBar
        :title="`历届俱乐部积分排名                                             `"
        :id="'dongtai'"
        :opData="opData5"
        :exchange="true"
        :axisShow="true"
        :inverse="true"
        :max="7"
      ></dynamicBar>
    </Frame>
    <Frame class="zhugongbang">
      <el-radio-group v-model="radio3" size="mini" @change="change(2)">
        <el-radio-button label="1">世界国家队排名</el-radio-button>
        <el-radio-button label="2">亚洲国家队排名</el-radio-button>
      </el-radio-group>
      <linew
        :legend="true"
        :id="'paiming'"
        :opData="opData3"
        :tooltip="true"
        :scale="true"
        :smooth="true"
      >
      </linew>
    </Frame>
    <Frame class="Frame">
      <el-radio-group v-model="radio1" size="mini" @change="change(0)">
        <el-radio-button label="1">英超</el-radio-button>
        <el-radio-button label="2">西甲</el-radio-button>
        <el-radio-button label="3">意甲</el-radio-button>
        <el-radio-button label="4">德甲</el-radio-button>
        <el-radio-button label="5">法甲</el-radio-button>
      </el-radio-group>
      <bar
        :legend="true"
        :id="'sheshoubang'"
        :opData="opData1"
        :title="`2021/2022${opData1.title}射手榜`"
        :bottom="1"
        :exchange="true"
        :inverse="true"
        :max="4"
      >
      </bar>
    </Frame>
    <Frame class="Frame">
      <el-radio-group v-model="radio2" size="mini" @change="change(1)">
        <el-radio-button label="1">英超</el-radio-button>
        <el-radio-button label="2">西甲</el-radio-button>
        <el-radio-button label="3">意甲</el-radio-button>
        <el-radio-button label="4">德甲</el-radio-button>
        <el-radio-button label="5">法甲</el-radio-button>
      </el-radio-group>
      <bar
        :legend="true"
        :id="'zhugongbang'"
        :opData="opData2"
        :title="`2021/2022${opData2.title}助攻榜`"
        :bottom="1"
        :exchange="1"
        :inverse="true"
        :max="4"
      >
      </bar>
    </Frame>
    <Frame class="Frame">
      <piew
        :legend="true"
        :id="'six'"
        :opData="opData6"
        :title="'传奇球员金球奖对比'"
        :radius="['40%', '70%']"
        :showCenter="true"
        :emphasis="30"
        :trigger="true"
        :right="true"
        :grid="grid6"
        :border="true"
      ></piew>
    </Frame>
  </div>
</template>

<script>
// @ is an alias to /src
import Frame from "@/components/Frame.vue";
import bar from "@/components/echarts/bar.vue";
import linew from "@/components/echarts/line.vue";
import piew from "@/components/echarts/pie.vue";
import dynamicBar from "@/components/echarts/dynamicBar.vue";
import {
  selectRanking,
  selectMatchByTeam,
  selctNumberawards,
  getFootball,
} from "../api/data.js";
export default {
  components: {
    Frame,
    bar,
    linew,
    piew,
    dynamicBar,
  },
  data() {
    return {
      timer: null,
      radio1: "1",
      radio2: "1",
      radio3: "1",
      radio4: "1",
      dataList: [
        ["曼联", "曼城", "利物浦", "阿森纳", "切尔西", "热刺", "纽卡斯尔联"],
        [
          "巴萨罗那",
          "皇家马德里",
          "马德里竞技",
          "巴伦西亚",
          "塞维利亚",
          "毕尔巴鄂",
        ],
        [
          "AC米兰",
          "国际米兰",
          "尤文图斯",
          "罗马",
          "拉齐奥",
          "那不勒斯",
          "佛罗伦萨",
        ],
        ["拜仁慕尼黑", "多特蒙德", "勒沃库森", "沃尔夫斯堡", "门兴"],
        ["巴黎", "马赛", "里昂", "摩纳哥"],
      ],
      opData1: {},
      opData2: {},
      opData3: {},
      opData4: {
        list: [
          { value: 562, name: "刘同学" },
          { value: 1000, name: "王同学" },
        ],
      },
      opData5: {
        xData: [
          "曼联",
          "曼城",
          "利物浦",
          "阿森纳",
          "切尔西",
          "热刺",
          "纽卡斯尔联",
          "巴萨罗那",
          "皇家马德里",
          "马德里竞技",
          "巴伦西亚",
          "塞维利亚",
          "毕尔巴鄂",
          "拜仁慕尼黑",
          "多特蒙德",
          "勒沃库森",
          "沃尔夫斯堡",
          "门兴",
          "巴黎",
          "马赛",
          "里昂",
          "摩纳哥",
        ],
        list: [
          {
            data: [
              1012, 1018, 1032, 1012, 1018, 1032, 1012, 1018, 1032, 1012, 1018,
              1032, 1012, 1018, 1032, 1012, 1018, 1032, 1032, 1032, 1032, 1032,
            ],
            name: "",
            realtimeSort: true,
            label: true,
            itemStyle: [
              "#F1896D",
              "#F9E3A7",
              "#D6BCA1",
              "#F1896D",
              "#F9E3A7",
              "#D6BCA1",
              "#F1896D",
              "#F9E3A7",
              "#D6BCA1",
              "#F2973A",
            ],
          },
        ],
      },
      opData6: {
        list: [
          { value: 562, name: "刘同学" },
          { value: 680, name: "王同学" },
        ],
      },
      grid6: {
        left: "0",
        bottom: "120%",
        containLabel: true,
      },
    };
  },
  mounted() {
    this.opData1 = this.$store.getters.opdata1Table[0];
    this.opData2 = this.$store.getters.opdata2Table[0];
    this.rankingChang("世界");
    this.dataComparison(1);
    /* setTimeout(this.dataSet(), 0); */
    this.initData();

    selctNumberawards().then((res) => {
      console.log(res.data.data);
      let list = res.data.data;
      this.opData6.list = [];
      for (let i = 0; i < list.length; i++) {
        this.opData6.list.push({
          value: list[i].numberAwards,
          name: list[i].playerName,
        });
      }
    });
  },
  methods: {
    change(e) {
      switch (e) {
        case 0:
          this.opData1 = this.$store.getters.opdata1Table[this.radio1 - 1];
          break;
        case 1:
          this.opData2 = this.$store.getters.opdata2Table[this.radio2 - 1];
          break;
        case 2:
          this.rankingChang(this.radio3 == 1 ? "世界" : "亚洲");
          break;
        case 3:
          this.dataComparison(this.radio4);
          break;
        default:
          break;
      }
    },
    rankingChang(t) {
      this.opData3 = {
        xData: [2018, 2019, 2020, 2021, 2022],
        list: [],
      };
      for (let i = 0; i < 10; i++) {
        this.opData3.list.push({
          data: [],
          name: "",
          step: "middle",
        });
      }

      let timeList = [2018, 2019, 2020, 2021, 2022];
      for (let i = 0; i < timeList.length; i++) {
        selectRanking({ continent: t, rankingTime: timeList[i] }).then(
          (res) => {
            let list = res.data.data;
            let sortedList = list.sort(function (a, b) {
              return a["teamId"] - b["teamId"];
            });
            for (let j = 0; j < sortedList.length; j++) {
              this.opData3.list[j].name = sortedList[j].teamName;
              this.opData3.list[j].data.push(sortedList[j].integral);
            }
          }
        );
      }
    },
    dataComparison(t) {
      this.opData4.list = [];
      for (let i = 0; i < this.dataList[t - 1].length; i++) {
        selectMatchByTeam({ teamName: this.dataList[t - 1][i] }).then((res) => {
          this.opData4.list.push({
            value: res.data.data.integral,
            name: res.data.data.teamName,
          });
        });
      }
    },
    initData() {
      this.opData5 = {
        xData: [
          "曼联",
          "曼城",
          "利物浦",
          "阿森纳",
          "切尔西",
          "热刺",
          "纽卡斯尔联",
          "巴萨罗那",
          "皇家马德里",
          "马德里竞技",
          "巴伦西亚",
          "塞维利亚",
          "毕尔巴鄂",
          "拜仁慕尼黑",
          "多特蒙德",
          "勒沃库森",
          "沃尔夫斯堡",
          "门兴",
          "巴黎",
          "马赛",
          "里昂",
          "摩纳哥",
        ],
        list: [
          {
            data: [],
            name: "",
            realtimeSort: true,
            label: true,
            itemStyle: [],
          },
        ],
      };
      let itemStyle = [
        "#5470C6",
        "#91CC75",
        "#FAC858",
        "#EE6666",
        "#73C0DE",
        "#3BA272",
        "#FC8452",
      ];
      for (let i = 0; i < this.opData5.xData.length; i++) {
        let num = Math.round(Math.random() * 6);
        this.opData5.list[0].data.push(Math.round(Math.random() * 1000));
        this.opData5.list[0].itemStyle.push(itemStyle[num]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 655px;
  flex-wrap: wrap;
  background-color: rgb(247, 247, 247);
}
</style>
