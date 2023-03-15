<template>
  <div class="sss">
    <q-select standout outlined hide-dropdown-icon :loading="loading" :model-value="model" use-input hide-selected
      fill-input :options="options" @filter="filterFn" @input-value="setModel"
      :placeholder="placeholder" style="width: 100%;font-size: 12px;" class="select_height">
      <template v-slot:prepend>
        <q-icon size="16px" name="search" />
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" @click="itemClick(scope.opt)">
          <q-item-section>
            <q-item-label>
              <span class="optimized_itmes">{{ scope.opt }}</span>
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
  </div>
</template>

<script lang="ts" setup>
// import { Feed } from 'src/types';
import { ref } from 'vue';

const loading = ref(false);

const options = ref<any[]>([]);

const model = ref<string>('');

const placeholder = ref('Search by topic,website,Rss URL')

const filterFn = async (val: string, update: (arg0: () => void) => void, abort: () => void) => {
  if (model.value.length === 0) {
    options.value = []
    abort()
    return
  }
  update(() => {
    options.value = ['111', '222', '333']
  })
};

const itemClick = (name: string) => {
  console.log(model.value);

  model.value = name;
  // model.value = undefined
}

const setModel = (v: any) => {
  console.log(1111);
  model.value = v
}


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
<style lang="scss" scoped>
// .select_height {
//   // height: 40px;
//   // min-height: 40px;
//   height: 32px;
//   // width: 100%;
//   // border: 1px solid #E0E0E0;
//   // border-radius: 6px;
// }


.popup_content_select {
  .optimized_itmes {
    font-family: 'Source Han Sans CN';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #44588F;
  }
}
</style>
