<template>
  <div class="entry-search-root">
    <q-select v-if="isUseSelect" standout outlined hide-dropdown-icon :loading="loading" :model-value="model" use-input
      hide-selected fill-input :options="options" @filter="filterFn" @input-value="setModel" :placeholder="placeholder"
      style="width: 100%;font-size: 12px;" :menuOffset="[0, 5]">
      <template v-slot:prepend>
        <q-icon size="16px" name="search" />
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" @click="itemClick(scope.opt)"
          :style="`width: ${itemWidth > 0 ? (itemWidth + 'px') : '100%'};`">
          <q-item-section>
            <q-item-label>
              <span class="optimized_itmes">{{ scope.opt.name }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-input v-else v-model="model" standout outlined dense :debounce="1000">
      <template v-slot:prepend>
        <q-icon size="16px" name="search" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  itemWidth: {
    default: 0,
    require: false,
    type: Number
  },
  placeholder: {
    type: String,
    require: false,
    default: 'Search by topic,website,Rss URL'
  },
  filterDataFunc: {
    type: Function,
    require: false,
  },
  isUseSelect: {
    type: Boolean,
    require: false,
    default: true
  }
})

const loading = ref(false);

const options = ref<any[]>([]);

const model = ref<string>('');

onMounted(() => {
  if (!props.isUseSelect) {
    watch(model, async () => {
      let result = []
      if (props.filterDataFunc  && model.value.length > 0) {
        result = await props.filterDataFunc(model.value)
      }
      emit('showAllValue',result)
    })
  }
})


const filterFn = async (val: string, update: (arg0: () => void) => void, abort: () => void) => {
  if (model.value.length === 0) {
    options.value = []
    abort()
    return
  }
  update(async () => {
    // options.value = ['111', '222', '333']
    let result: any
    if (props.filterDataFunc) {
      result = await props.filterDataFunc(model.value)
    }
    if (result) {
      options.value = result
    }
    console.log(result);
  })
};

const itemClick = (value: any) => {
  model.value = '';
  emit('showDetail', value, options.value)
}

const setModel = (v: any) => {
  model.value = v
}

const emit = defineEmits(['showDetail', 'showAllValue'])


</script>
<style lang="scss">
.popup_content_select {
  padding: 5px 5px;

  .q-focus-helper {
    background: #44588F !important;
    border-radius: 4px !important;
  }

  .q-item {
    min-height: 44px;
    padding: 4px 4px;
  }
}
</style>
