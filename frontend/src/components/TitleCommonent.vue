<template>
  <div class="page-title-root row items-center">
    <div class="back-btn row items-center justify-center" @click="backToPrePage">
      <img src="../assets/menu/back_gray_arrow.svg" :width="9" :height="16">
      <div class="title title-margin-left">
        {{ backTitle }}
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
// import { useRouter } from 'vue-router';
import { defineEmits } from 'vue'

defineProps({
  backTitle: {
    type: String,
    require: true,
    default: ''
  }
});

// const router = useRouter()

const emit = defineEmits(['backAction'])

const backToPrePage = () => {
  // router.back()
  emit('backAction')
}


</script>

<style scoped lang='scss'>
.page-title-root {
  height: 64px;
  width: 100%;
}

.title {
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 20px;
color: #1A130F;
}

.title-margin-left {
  margin-left: 12px;
}

.back-btn {
  // width: 32px;
  height: 32px;
  // border-radius: 4px;
  // border: 1px solid #E0E2E9;
}

// .back-btn:hover {
//   background-color: #f5f8fb;
// }
</style>

