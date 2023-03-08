<template>
  <div class="root column justify-center items-center">
    <img class="empty" src="../../assets/empty.svg">
    <span class="title">{{ 'Personalize your Feedly' }}</span>
    <span
      class="label">{{
        'The most interesting articles published by the feeds you personally follow will be here'
      }}</span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;

  .empty {
    width: 180px;
    height: 124px;
  }

  .title {
    text-align: center;
    margin-top: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #1A130F;
  }

  .label {
    width: 375px;
    text-align: center;
    margin-top: 12px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #857C77;
  }
}


</style>
