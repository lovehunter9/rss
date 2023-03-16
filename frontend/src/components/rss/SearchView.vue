<template>
    <q-input
      class="searchInput"
      v-model="searchValue"
      standout
      outlined
      dense
      name="search"
      debounce="500"
      :placeholder="placeholder"
      autocomplete="off"
    >
    <template v-slot:prepend>
        <q-icon size="16px" name="search" />
      </template>
  </q-input>
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

.searchInput {
    margin-left: 10px;
    margin-right: 20px;
    width: calc(100% - 60px);
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #BDBDBD;
  }

</style>
