<template>
  <div class="discover-root column justify-start items-center">
    <div class="top-layout row justify-between items-center">
      <span class="text-title">Discover</span>
      <div class="row justify-end items-center">
        <img class="icon-end" src="../assets/menu/input.svg">
        <img class="icon-end" src="../assets/menu/output.svg">
      </div>
    </div>
    <search-view placeholder="Search by topic,website,Rss URL" class="search-view" @onSearch="onSearch"/>
  </div>
</template>

<script lang="ts" setup>

// import {ref} from 'vue';
import SearchView from 'components/rss/SearchView.vue';

function onSearch(vault : string){
  console.log(vault)
}
</script>

<style lang="scss" scoped>
.discover-root {
  background-color: #FFFFFF;
  height: 100vh;
  width: 100%;

  .top-layout {
    width: 100%;

    .text-title {
      margin-top: 22px;
      margin-left: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #1A130F;
    }

    .icon-end {
      height: 20px;
      width: 20px;
      margin-right: 16px;
      margin-top: 22px;
    }

  }

  .search-view{
    width: calc(100% - 240px);
    margin-top: 16px;
  }

}
</style>
