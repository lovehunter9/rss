<template>
  <q-menu :offset="[10, 8]" class="board-mark-menu">
    <q-list class="menu-list">
      <q-item v-for="item in optionsRef " class="menu-item-normal menuItem bg-color-white" dense :key="item.title">
        <q-checkbox dense size="md" class="check-box text-minor-color" v-model="item.selected"
                    @update:model-value="setSelected" :label="item.title" color="orange"/>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang='ts'>
import {PropType, ref} from 'vue';

const props = defineProps({
  options: {
    type: Object as PropType<{ title: string, selected: boolean }[]>,
    required: false,
  }
})

const optionsRef = ref(props.options);

const emit = defineEmits(['onSelected'])

const setSelected = () => {
  let data : string[] = []
  if (optionsRef.value){
    data = optionsRef.value.filter((i) => {
      return i.selected
    }).map((i) => {
      return i.title
    })
  }
  emit('onSelected',data)
}


</script>

<style scoped lang='scss'>
.board-mark-menu {

  .menu-list {
    min-width: 236px;

    .menu-item-normal {
      height: 28px;
    }

    .menu-title {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      margin-left: -30px;
    }

    .add-board-title {
      @extend .menu-title;
      color: $main-style;
    }

    .check-box {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
