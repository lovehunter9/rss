<template>
  <div class="article-search-root row items-center" :class="isOnSearch ? 'border-color-on-search' : 'border-color-normal'">
    <q-btn-dropdown dropdown-icon="img:/imgs/arrow-down.svg" class="select-view" :ripple="false" no-caps dense
      menu-self="top left" menu-anchor="bottom start" :menu-offset="[0, 5]" unelevated>
      <template v-slot:label>
        <div class="row items-center no-wrap justify-between" style="width: 72px;">
          <div class="select-title-item"> All articles </div>
        </div>
      </template>
      <q-list class="rounded-borders">
        <q-item v-for="index in 10" :key="index" clickable v-close-popup>
          <q-item-section>
            <q-item-label>
              {{ index }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-separator color='#EDEEF6' vertical />
    <q-input class="searchInput" v-model="searchValue" borderless dense name="search" debounce="500" autocomplete="off" @focus="isOnSearch = true" @blur="isOnSearch = false">
      <template v-slot:prepend>
        <q-icon size="16px" name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const searchValue = ref('')

const isOnSearch = ref(false)

</script>

<style scoped lang='scss'>
.article-search-root {
  width: 100%;
  height: 34px;
  border: 1px solid;
  border-radius: 6px;

  .select-view {
    // height: 32px;
    width: 126px;
    // margin-left: 16px;
    // border: 1px solid #e0e0e0;
    border-radius: 0px;
    // background-color: red;

    .select-title-item {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #1a130f;
    }
  }

  .searchInput {
    // background-color: red;
    width: calc(100% - 160px);
    margin-left: 10px;
    margin-right: 20px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    margin-top: -1px;
    color: #BDBDBD;
  }
}

.border-color-normal {
  border-color: #E0E0E0;
}
.border-color-on-search {
  translate: 10;
  border-color: #378acb;
}


</style>
