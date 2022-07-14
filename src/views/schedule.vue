<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-12 21:59:29
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 10:16:46
-->
<template>
  <div class="schedule">
    <div class="left">
      <div style="margin-bottom: 15px">{{ title }}</div>
      <div class="item" v-for="(item1, index1) in tempList" :key="index1">
        <div class="title">{{ item1.date }} {{ item1.week }}</div>
        <div class="row" v-for="(item2, index2) in item1.list" :key="index2">
          <div class="team">{{ item2.team1 }}</div>
          <div class="num">
            <div class="top">{{ item2.status_text }}</div>
            <div class="main">
              {{ item2.team1_score }}:{{ item2.team2_score }}
            </div>
            <div class="bottom">
              {{ item2.time_start }}
            </div>
          </div>
          <div class="team">{{ item2.team2 }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div>
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="changeOption()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="tableData"
        height="590"
        :default-sort="{ prop: 'integral', order: 'descending' }"
      >
        <el-table-column fixed type="index" label="名次"> </el-table-column>
        <el-table-column fixed prop="teamName" label="球队名称" width="120">
        </el-table-column>
        <el-table-column prop="matchNumber" label="比赛场次" width="80">
        </el-table-column>
        <el-table-column prop="win" label="胜局" width="80"> </el-table-column>
        <el-table-column prop="draw" label="平局" width="80"> </el-table-column>
        <el-table-column prop="lose" label="负局" width="80"> </el-table-column>
        <el-table-column prop="goal" label="进球" width="120">
        </el-table-column>
        <el-table-column prop="fumble" label="失球" width="120">
        </el-table-column>
        <el-table-column prop="integral" label="积分" width="80" sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { selectRanking, searchByMatch } from "../api/data.js";
export default {
  data() {
    return {
      title: "",
      tempList: [],
      tableData: [],
      from: {
        leagueId: "1",
        matchTime: "2021/2022",
      },
      options: [
        {
          value: "1",
          label: "英格兰超级联赛",
        },
        {
          value: "2",
          label: "西班牙甲级联赛",
        },
        {
          value: "3",
          label: "意大利甲级联赛",
        },
        {
          value: "4",
          label: "德国甲级联赛",
        },
        {
          value: "5",
          label: "法国甲级联赛",
        },
        {
          value: "6",
          label: "中国超级联赛",
        },
      ],
      value: "1",
    };
  },
  mounted() {
    this.getData(this.value);
  },
  methods: {
    getData(e) {
      axios
        .get("/api/query", {
          params: {
            /* key: "75d7e3fd2afb0466e0a025ba1c098eb8", */
            key: "b56aa0ab3b55f4409112eba0239e8271",
            type: this.getSche(e),
          },
        })
        .then((res) => {
          console.log(res.data.result.matchs);
          this.tempList = res.data.result.matchs;
          this.title = res.data.result.title;
        })
        .catch((e) => {
          console.log("e", e);
        });
      searchByMatch({
        leagueId: e,
        matchTime: "2021/2022",
      }).then((res) => {
        let list = res.data.data;
        this.tableData = list;
      });
    },
    getSche(e) {
      switch (e) {
        case "1":
          return "yingchao";
        case "2":
          return "xijia";
        case "3":
          return "yijia";
        case "4":
          return "dejia";
        case "5":
          return "fajia";
        case "6":
          return "zhongchao";
      }
    },
    changeOption() {
      this.getData(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 655px;
  .left {
    height: 620px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      border: 1px #d7d7d7 solid;
      background: #d7d7d7;
      /* padding: 0px 5px; */
      .row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        border: 1px #c2c2c2 solid;
        background: #c2c2c2;
        .team {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
        }
        .num {
          width: 120px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          /*           border: 1px #0d6a3d solid;
          background: #0d6a3d; */
          /*      color: #fff; */
          .top {
            flex: 1;
          }
          .main {
            flex: 1;
          }
          .bottom {
            flex: 1;
          }
        }
      }
      .title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 180px;
        margin-bottom: 10px;
      }
    }
  }
  .right {
    flex: 1;
    height: 620px;
  }
}
</style>
