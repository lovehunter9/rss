<template>
  <div class="tabs-root">
    <q-tabs v-model="tab" align="left" dense class="tabs-bg" indicator-color="color-FF8642" narrowIndicator inline-label
      activeColor="color-FF8642" @update:model-value="updateTab">
      <q-tab class="normal-tab-class" v-for='rowItem in tabs' :key=rowItem.name :name='rowItem.name'
        :disable='rowItem.disable'>
        <q-icon :name="formatIconName(rowItem.tabIconName,tab === rowItem.name)" size="16px"></q-icon>
        <div class="active-base" :class="tab === rowItem.name ? 'text-primary-color' : 'normal-items'">
          {{ rowItem.name }}
        </div>
      </q-tab>
    </q-tabs>
    <q-separator color='#EDEEF6' />
  </div>
</template>

<script setup lang='ts'>
import { PropType, ref } from 'vue';
import { Dark } from 'quasar'

interface TabItem {
  name: string
  disable: boolean,
  tabIconName: string
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

const emits = defineEmits(['updateTab'])

const updateTab = (tab: string) => {
  emits('updateTab',tab)
}

const formatIconName = (iconName: string, isSelected: boolean) => {
  // let nameTypeName = menuTypeName(props.menuType)
  // if (props.imageName) {
  //   nameTypeName = props.imageName;
  //   if ((props.menuType === store.menu_choice.type && props.menuValue === store.menu_choice.value) || (currentMenuType.value === props.menuType)) {
  //     nameTypeName = nameTypeName + '_hover'
  //   }
  // } else {
  //   nameTypeName = nameTypeName.toLowerCase()
  //   nameTypeName = nameTypeName.replace(/\s*/g, '');
  //   if (props.menuType === store.menu_choice.type || (currentMenuType.value === props.menuType)) {
  //     nameTypeName = nameTypeName + '_hover'
  //   }
  // }

  // if(!nameTypeName.endsWith('_hover')) {
  //   nameTypeName = nameTypeName + '_dark'
  // }

  let formatIconName = iconName
  if (isSelected) {
    formatIconName = formatIconName + '_hover'
  } else if (Dark.isActive) {
    formatIconName = formatIconName + '_dark';
  }

  return `img:/imgs/tabs/${formatIconName}.svg`
}


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

  .normal-tab-class {
    padding-left: 0px;
    padding-right: 0px;
    margin-right: 26px;
  }
}
</style>
