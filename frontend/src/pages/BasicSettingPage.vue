<template>
  <div class="basic_root">
    <div class="language-title">Language of Pushed Articles</div>
    <div class="row items-start">
      <div class="selected-button row justify-start items-center" v-for="item in store.setting.language" :key="item">
        <div class="button-text text-major-color">{{ item }}</div>
        <img class="button-icon" src="../assets/menu/clear.svg"/>
      </div>
      <div class="selected-button-more row justify-start items-center">
        <q-img class="button-icon" src="../assets/menu/arrow_down.svg">
          <language-menu-component :options="menuDataRef" @onSelected="getSelected"/>
        </q-img>
      </div>
    </div>
    <q-checkbox dense size="md" class="check-box text-minor-color" v-model="showTrendReason"
                label="Display Article Recommendation Reasons" @update:model-value="setRecommendReason"
                color="orange"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRssStore} from 'stores/rss';
import {useQuasar} from 'quasar';
import {setRecommendOption} from 'src/api/api';
import LanguageMenuComponent from 'components/rss/LanguageMenuComponent.vue';

const $q = useQuasar();
const store = useRssStore();

const showTrendReason = ref();
const menuDataRef = ref();
const selectedDataRef = ref();

onMounted(() => {
  showTrendReason.value = store.setting.show_recommend_result
  const list = [];
  list.push({
    title : 'en_US',
    selected : store.setting.language.includes('en_US')
  })
  list.push({
    title : 'zh_CN',
    selected : store.setting.language.includes('zh_CN')
  })
  menuDataRef.value = list
  selectedDataRef.value = store.setting.language
})

const setRecommendReason = (value: boolean) => {
  console.log(value)
  store.setting.show_recommend_result = value
  setRecommendOption(store.setting)
}

const getSelected = (data : []) =>{
  console.log(data)
  store.setting.language = data
  setRecommendOption(store.setting)
}

</script>

<style scoped lang="scss">

.basic_root {
  padding: 32px 16px;

  .language-title {
    color: #857C77;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }

  .selected-button {
    margin-top: 8px;
    padding: 8px 16px;
    height: 32px;
    margin-right: 16px;
    width: fit-content;
    background-color: transparent;
    border: 1px solid #E0E0E0;
    border-radius: 6px;

    .button-text {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      margin-right: 8px;
    }
  }

  .selected-button-more {
    margin-top: 8px;
    padding: 8px;
    height: 32px;
    width: fit-content;
    background-color: transparent;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
  }

  .button-icon {
    width: 16px;
    height: 16px;
  }

  .check-box {
    margin-top: 32px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
