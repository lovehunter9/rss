<template>
  <q-item class="entry-root" dense manualFocus>
    <div class="row justify-start" style="width:100%;">
      <div class="layout-right column justify-start">
        <div class="row justify-start" style="width: 100%;">
          <q-skeleton type="circle" class="entry-icon"/>
          <div class="column feed-layout justify-start margin-left-title">
            <q-skeleton type="text" class="text-feed-name text-major-color"/>
            <q-skeleton type="text" class="text-feed-create text-minor-color"/>
          </div>
        </div>
        <q-skeleton type="text" class="text-entry-title text-major-color"/>
      </div>
    </div>
  </q-item>
  <div class="line"/>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

.entry-root {
  width: 100%;
  padding: 16px;
  margin: 0px;
  border-radius: 0;

  .layout-right {
    margin-left: 8px;
    width: calc(100% - 46px);

    .entry-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%
    }

    .feed-layout {
      max-width: calc(100% - 42px);

      .text-feed-name {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        width: 200px;
        height: 20px;
        font-size: 14px;
        line-height: 14px;
      }

      .text-feed-create {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        width: 100px;
        height: 15px;
        line-height: 14px;
        margin-top: 4px;
      }
    }

    .text-entry-title {
      margin-top: 8px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      height: 50px;
      line-height: 24px;
    }

    .text-entry-desc {
      margin-top: 4px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
}

.line {
  float: right;
  height: 1px;
  width: calc(100% - 32px);
  margin-left: 16px;
  margin-right: 16px;
  background: #E0E0E0;
}

.margin-left-title {
  margin-left: 10px;
}

</style>
