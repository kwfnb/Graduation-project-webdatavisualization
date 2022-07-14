<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:30:30
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-03 07:29:23
-->
<template>
  <div class="frame">
    <div class="frame-top">
      <div></div>
    </div>
    <!-- <div>{{ title }}</div> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      radio1: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.frame {
  width: 500px;
  height: 320px;
  background: #fff;
  border: 1px #ccc solid;
  border-radius: 5px;
  box-shadow: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .frame-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
