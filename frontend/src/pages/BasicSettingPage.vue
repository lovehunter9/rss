<template>
<div>
  <q-checkbox dense size="md" class="check-box text-minor-color" v-model="showTrendReason"
              label="Display Article Recommendation Reasons" @update:model-value="setRecommendReason"
              color="orange"/>
</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getShowRecommendReason, setShowRecommendReason} from 'src/utils/utils';

const showTrendReason = ref();

onMounted(() => {
  showTrendReason.value = getShowRecommendReason()
})

const setRecommendReason = (value : boolean) => {
  setShowRecommendReason(value)
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
