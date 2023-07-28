<template>
  <div class="basic_root">
    <div class="setting_label">Language of Pushed Articles</div>
    <div class="row items-start">
      <div class="selected-button row justify-start items-center" v-for="item in store.setting.language" :key="item">
        <div class="button-text text-major-color">{{ item }}</div>
        <img class="button-icon" src="../../assets/menu/clear.svg" @click="removeLanguage(item)"/>
      </div>
      <div class="selected-button-more row justify-start items-center">
        <q-img class="button-icon" src="../../assets/menu/arrow_down.svg">
          <language-menu-component :options="menuDataRef" @onSelected="getSelected"/>
        </q-img>
      </div>
    </div>
    <q-checkbox dense size="md" class="check-box text-minor-color" v-model="showTrendReason"
                label="Display Article Recommendation Reasons" @update:model-value="setRecommendReason"
                color="orange"/>
    <div class="setting_label" style="margin-top: 40px">Blacklist</div>
    <div class="selected-button row justify-start items-center" @click="goBlackList">
      <div class="button-text text-major-color">View</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRssStore} from 'stores/rss';
import {setRecommendOption} from 'src/api/api';
import LanguageMenuComponent from 'components/rss/LanguageMenuComponent.vue';
import {useRouter} from 'vue-router';

const store = useRssStore();
const router = useRouter()

const showTrendReason = ref();
const menuDataRef = ref<{ title: string, selected: boolean }[]>([]);

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

const removeLanguage = (item : string) => {
  console.log(item)
  const index = store.setting.language.indexOf(item);
  if (index !== -1){
    console.log(index)
    menuDataRef.value.forEach((i) => {
      if (i.title == item){
        i.selected = false
      }
    })
    store.setting.language.splice(index,1)
    setRecommendOption(store.setting)
  }
}

const goBlackList = () => {
  router.push('/blacklist')
}

</script>

<style scoped lang="scss">

.basic_root {
  padding: 32px 16px;

  .setting_label {
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
