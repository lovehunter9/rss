<template>
  <div class="root column justify-center items-center">
    <img class="empty" src="../../assets/empty.svg">
    <span class="title">{{ 'Personalize your Feedly' }}</span>
    <span
      class="label">{{
        'The most interesting articles published by the feeds you personally follow will be here'
      }}</span>
    <q-btn class="add-btn" flat dense label="Add feeds" @click="addFeed"/>
  </div>
</template>

<script lang="ts" setup>

import AddFeedDialog from 'components/dialog/AddFeedDialog.vue';
import {useQuasar} from 'quasar';

const $q = useQuasar()

const addFeed = () => {
  $q.dialog({
    component: AddFeedDialog,
    componentProps: {}
  })
    .onOk(() => {
      console.log('OK');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
};

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

  .add-btn{
    margin-top: 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #FFFFFF;
    text-transform: capitalize;
    padding: 8px 16px;
    background: #FF8642;
  }
}


</style>
