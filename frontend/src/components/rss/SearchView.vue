<template>
  <div class="searchItem row justify-start items-center">
    <q-img
      class="searchImg"
      src="../../assets/search.svg"
    />
    <q-input
      class="searchInput"
      v-model="searchValue"
      borderless
      dense
      name="search"
      debounce="500"
      :placeholder="placeholder"
      autocomplete="off"
    />
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from 'vue';

defineProps({
  placeholder: {
    type: String,
    default: 'Search',
    required: false
  }
})

const searchValue = ref('')

const emit = defineEmits(['onSearch'])

watch(() => searchValue.value, () => {
  emit('onSearch', searchValue.value)
})

</script>

<style lang="scss" scoped>
.searchItem {
  height: 32px;
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 6px;

  .searchImg {
    width: 16px;
    margin-left:10px ;
    margin-top: -5px;
    height: 16px;
  }

  .searchInput {
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
