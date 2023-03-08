<template>
  <div class="discover-root column justify-start items-center">
    <div class="top-layout row justify-between items-center">
      <span class="text-title">Discover</span>
      <div class="row justify-end items-center">
        <img class="icon-end" src="../assets/menu/input.svg">
        <img class="icon-end" src="../assets/menu/output.svg">
      </div>
    </div>
    <q-item class="searchItem row justify-start items-center">
      <q-img
        class="searchImg"
        src="../assets/search.svg"
        width="16px"
        height="16px"
      />
      <q-input
        class="searchInput"
        v-model="searchTxt"
        dense
        square
        borderless
        name="search"
        debounce="500"
        placeholder="Search by topic,website,Rss URL"
        autocomplete="off"
      />
    </q-item>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';

const searchTxt = ref<string>('');

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

  .searchItem {
    height: 32px;
    margin-left: 120px;
    margin-right: 120px;
    width: calc(100% - 240px);
    margin-top: 16px;
    border: 1px solid #E0E0E0;
    border-radius: 6px;

    .searchInput {
      margin-left: 10px;
      width: 100%;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 12px;
      color: #BDBDBD;
    }

  }

}
</style>
