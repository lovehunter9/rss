<template>
  <div class="inputItem row justify-start items-center">
    <q-input
      class="innerInput"
      v-model="inputValue"
      borderless
      dense
      name="search"
      debounce="500"
      :placeholder="placeholder"
      autocomplete="off"
      :readonly = 'isReadOnly'
      @update:model-value="onInput"
    />
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue';

const  props = defineProps({
  text : {
    type : String,
    default : '',
    require : false
  },
  isReadOnly : {
    type : Boolean,
    default : false,
    require : false,
  },
  placeholder: {
    type: String,
    default: '',
    required: false
  }
})

const inputValue = ref(props.text)

const emit = defineEmits(['input'])

function onInput(value : string){
  emit('input',value)
}

</script>

<style lang="scss" scoped>
.inputItem {
  height: 32px;
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 6px;

  .innerInput {
    margin-left: 10px;
    margin-top: -5px;
    margin-right: 20px;
    width: calc(100% - 60px);
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #BDBDBD;
  }

}

</style>
