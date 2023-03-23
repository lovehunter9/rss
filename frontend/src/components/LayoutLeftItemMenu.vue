<template>
  <div class="left-menu-root">
    <q-item clickable :dense="dense"
            :active="store.menu_choice.type === menuType && store.menu_choice.value === menuValue"
            active-class="itemActiveStyle"
            class="menuItem left-menu-title-normal q-mx-sm q-pl-xs q-pr-md q-py-xs" :class="!smallFontSize? 'left-menu-title-normal-font-size' : 'left-menu-title-dense-font-size'" @click="itemOnClick()"
            @mouseover="changeBackground()" @mouseout="returnBackground()">
      <q-item-section class="items-center" avatar>
        <q-icon :name="formatIconName()" size="20px"/>
      </q-item-section>
      <q-item-section class="item-title-margin-left">{{ title ? title : menuTypeName(menuType) }}</q-item-section>
      <q-item-section v-if="showUnReadCount" side>
        <div class="unreadCount">
          {{ unreadCount }}
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang='ts'>
import {useRssStore} from 'src/stores/rss';
import {MenuType, menuTypeName} from '../types'
import {defineProps, PropType, ref} from 'vue';

const props = defineProps({
  menuType: {
    type: Object as PropType<MenuType>,
    require: true,
    default: MenuType.Empty
  },
  menuValue: {
    type: Number,
    require: false,
    default: 0
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
  },
  title: {
    type: String,
    default: '',
    require: false
  },
  imageName: {
    type: String,
    default: '',
    require: false
  },
  smallFontSize: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['itemOnClick']);

const itemOnClick = () => {
  emit('itemOnClick');
};

const store = useRssStore();


const currentMenuType = ref(MenuType.Empty);

const changeBackground = () => {
  currentMenuType.value = props.menuType
}

const returnBackground = () => {
  if (currentMenuType.value === props.menuType) {
    currentMenuType.value = MenuType.Empty
  }
}

const formatIconName = () => {
  let nameTypeName = menuTypeName(props.menuType)
  if (props.imageName) {
    nameTypeName = props.imageName;
    if ((props.menuType === store.menu_choice.type && props.menuValue === store.menu_choice.value) || (currentMenuType.value === props.menuType)) {
      nameTypeName = nameTypeName + '_hover'
    }
  } else {
    nameTypeName = nameTypeName.toLowerCase()
    nameTypeName = nameTypeName.replace(/\s*/g, '');
    if (props.menuType === store.menu_choice.type || (currentMenuType.value === props.menuType)) {
      nameTypeName = nameTypeName + '_hover'
    }
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
    line-height: 14px;
  }

  .left-menu-title-normal-font-size {
    font-size: 14px;
  }

  .left-menu-title-dense-font-size {
    font-size: 12px;
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
    padding: 2px 8px;
    border-radius: 8px;
  }

}


</style>
