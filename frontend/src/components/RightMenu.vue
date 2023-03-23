<template>
  <div
    class="context-menu"
    ref="contextMenu"
    @blur="onClose"
    tabindex="-1">
    <div v-for="(item, idx) in actions" :key="idx">
      <div class="divide" v-if="!item"/>
      <div v-else class="context-menu__item" @click="clickItem(item.type)">{{ item.label }}
<!--        <div v-else class="context-menu__item row justify-start items-center" @click="clickItem(item.type)">-->
<!--        <img class="context-menu__img" :src="item.img">-->
<!--        <div>{{ item.label }}</div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, nextTick} from 'vue'
import {newsBus, newsBusMessage} from 'src/utils/utils';
import {RIGHT_MENU_TYPE} from 'components/RightMenuInstance';

const props = defineProps({
  data: {default: null},
  onClose: {
    type: Function, default: () => {
      //DO Something
    }
  },
})


// 创建组件ref
const contextMenu = ref<HTMLDivElement | undefined>()
onMounted(async () => {
  // 确保组件已经渲染
  await nextTick()
  // 触发组件focus
  if (contextMenu.value) {
    contextMenu.value.focus()
  }
})

const clickItem = (type: string) => {
  newsBus.emit(newsBusMessage.rightMenuType,props.data,type)
  props.onClose()
}
const actions = [
  // '',
  {
    img: require('../assets/menu/modify.svg'),
    label: 'Edit',
    type: RIGHT_MENU_TYPE.EDIT,
  },
  {
    img: require('../assets/menu/delete2.svg'),
    label: 'Delete',
    type: RIGHT_MENU_TYPE.DELETE,
  },
  // '',
]
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  padding: 4px 4px;
  border-radius: 6px;
  border: 1px solid rgba(222, 222, 222, 0.5);
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  user-select: none;

  &:focus {
    outline: none;
  }

  .divide {
    height: 1px;
    background-color: rgba(222, 222, 222, 0.5);
    margin: 8px auto;
    width: calc(100% - 12px);
  }

  &__item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      color: #FF8642;
      background-color: rgba(255, 134, 66, 0.1);
      border-radius: 6px;
    }
  }

  &__img {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
}
</style>
