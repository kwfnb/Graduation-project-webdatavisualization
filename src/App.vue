<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:21:59
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-12 23:40:41
-->
<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import { selectPlayer } from "./api/data.js";
import axios from "axios";
export default {
  created() {},
  mounted() {
    selectPlayer({}).then((res) => {
      /* opData:{xData:['周一','周二','周三'],list:[{data[12,18,32],name:"刘同学",color:"red",realtimeSort:true}]} */
      let list = [];
      let opData1 = [];
      let opData2 = [];
      let leagueList = ["英超", "西甲", "意甲", "德甲", "法甲"];
      for (let i = 0; i < leagueList.length; i++) {
        list.push(
          res.data.data.filter((item) => {
            return item.leagueName == leagueList[i];
          })
        );
      }

      console.log(list);

      for (let i = 0; i < list.length; i++) {
        let xData = [];
        let play = [];
        let playerGoals = [];
        let playerAssists = [];
        for (let j = 0; j < list[i].length; j++) {
          xData.push(list[i][j].playerName);
          play.push(parseInt(list[i][j].play));
          playerGoals.push(parseInt(list[i][j].playerGoals));
          playerAssists.push(parseInt(list[i][j].playerAssists));
        }

        let opDataItem1 = {
          title: leagueList[i],
          xData: xData,
          list: [
            {
              data: play,
              name: "出场数",
              color: "#F2973A",
              type: "bar",
            },
            {
              data: playerGoals,
              name: "进球数",
              color: "#6B94C9",
              realtimeSort: true,
              type: "bar",
              label: {
                show: true,
                position: "right",
                valueAnimation: true,
              },
            },
          ],
        };
        let opDataItem2 = {
          title: leagueList[i],
          xData: xData,
          list: [
            {
              data: play,
              name: "出场数",
              color: "#F2973A",
              type: "bar",
            },
            {
              data: playerAssists,
              name: "助攻数",
              color: "#00a6ae",
              realtimeSort: true,
              type: "bar",
              label: {
                show: true,
                position: "right",
                valueAnimation: true,
              },
            },
          ],
        };
        opData1.push(opDataItem1);
        opData2.push(opDataItem2);
      }
      let table = [];
      table.push(opData1);
      table.push(opData2);
      this.$store.dispatch("INIT_DATA", table);
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
