<template>
  <div class="tabs-root">
    <q-tabs v-model="tab" align="left" dense class="tabs-bg" indicator-color="color-FF8642" narrowIndicator inline-label
      activeColor="color-FF8642">
      <q-tab class="normal-tab-class" v-for='rowItem in tabs' :key=rowItem.name :name='rowItem.name'
        :disable='rowItem.disable'>
        <q-icon :name="tab === rowItem.name ? rowItem.selectedIcon : rowItem.normalIcon" size="16px"></q-icon>
        <div :class="tab === rowItem.name ? 'active-items' : 'normal-items'">
          {{ rowItem.name }}
        </div>
      </q-tab>
    </q-tabs>
    <q-separator color='#EDEEF6' />
  </div>
</template>

<script setup lang='ts'>
import { PropType, ref } from 'vue';

interface TabItem {
  name: string
  normalIcon: string
  selectedIcon: string
  disable: boolean
}

const props = defineProps({
  tabs: {
    type: Object as PropType<TabItem[]>,
    require: true,
    default: [] as TabItem[]
  },
  defaultPosition: {
    type: Number,
    default: 0,
  }
})

const tab = ref(props.tabs[props.defaultPosition].name)

</script>

<style scoped lang='scss'>
.tabs-root {
  width: 100%;
  height: 36px;
  margin-top: 12px;

  .tabs-bg {
    width: 100%;
    height: 36px;
  }

  .active-base {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    margin-left: 6px;
    text-transform: capitalize;
  }

  .active-items {
    @extend .active-base;
    color: #FF8642
  }

  .normal-items {
    @extend .active-base;
    color: #1A130F;
  }

  .normal-tab-class {
    padding-left: 0px;
    padding-right: 0px;
    margin-right: 26px;
  }
}
</style>
