<template>
  <div class="left-menu-root">
    <q-item clickable :dense="dense" :active="store.menu_choice.type == menuType" active-class="itemActiveStyle"
      class="menuItem left-menu-title-normal q-mx-sm q-pl-xs q-pr-md q-py-xs" @click="itemOnClick()"
      @mouseover="willChange()" @mouseout="changeBack()">
      <q-item-section class="items-center" avatar>
        <q-icon :name="formatIconName()" size="20px"></q-icon>
      </q-item-section>
      <q-item-section class="item-title-margin-left"> {{ menuTypeName(menuType) }}</q-item-section>
      <q-item-section v-if="showUnReadCount" side>
        <div class="unreadCount">
          {{ unreadCount }}
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang='ts'>
import { useRssStore } from 'src/stores/rss';
import { MenuType, menuTypeName } from '../types'
import { defineProps,PropType, ref } from 'vue';

const props = defineProps({
  menuType: {
    type: Object as PropType<MenuType>,
    require: true,
    default: MenuType.Empty
  },
  showUnReadCount: {
    type: Boolean,
    require: true,
    default: true
  },
  unreadCount: {
    type: String,
    default: '0'
  },
  dense: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['itemOnClick']);

const itemOnClick = () => {
	emit('itemOnClick');
};

const store = useRssStore();


const willchangeType = ref(MenuType.Empty);


const willChange = () => {
  willchangeType.value = props.menuType
}

const changeBack = () => {
  if (willchangeType.value === props.menuType) {
    willchangeType.value = MenuType.Empty
  }
}

const formatIconName = () => {
  let nameTypeName = menuTypeName(props.menuType)
  nameTypeName = nameTypeName.toLowerCase()
  nameTypeName = nameTypeName.replace(/\s*/g, '');
  if (props.menuType === store.menu_choice.type || (willchangeType.value === props.menuType)) {
    nameTypeName = nameTypeName + '_hover'
  }
  return `img:/imgs/${nameTypeName}.svg`
}

</script>

<style scoped lang='scss'>

.left-menu-root {
  .itemActiveStyle {
    color: #FF8642;
  }

  .menuItem {
    border-radius: 8px;
  }

  .left-menu-title-normal {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }

  .item-title-margin-left {
    margin-left: -15px;
  }

  .unreadCount {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #847C77;

    background: rgba(26, 19, 15, 0.05);
    padding:2px 8px;
    border-radius: 8px;
  }

}


</style>
