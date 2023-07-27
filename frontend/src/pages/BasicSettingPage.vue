<template>
<div>
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

const $q = useQuasar();
const store = useRssStore();

const showTrendReason = ref();

onMounted(() => {
  showTrendReason.value = store.setting.show_recommend_result
})

const setRecommendReason = (value : boolean) => {
  store.setting.show_recommend_result = value
  $q.loading.show();
  setRecommendOption(store.setting)
  console.log(store.setting)
  $q.loading.hide()
}

</script>

<style scoped>
.check-box {
  margin-top: 40px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 18px;
}
</style>
