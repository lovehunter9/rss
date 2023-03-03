<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin row root">
      <div class="title row items-center justify-center">
        <span class="text"> Add Feed </span>
        <img src="./../assets/close.svg" alt="close" @click="hide" />
      </div>

      <div style="width: 100%" v-if="rssStore.categories.length > 0">
        <div>Category</div>
        <q-select
          class="validatorSelect"
          v-model="category"
          outlined
          :options="rssStore.categories"
        >
          <template v-slot:selected-item="scope">
            <q-item
              v-bind="scope.selected"
              class="row items-center justify-start"
            >
              <div class="row items-center justify-center">
                {{ category?.title }}
              </div>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              class="row items-center justify-start"
            >
              {{ scope.opt.title }}
            </q-item>
          </template>
        </q-select>

        <div>Stoke quantity</div>
        <q-input
          class="searchInput"
          v-model="feedUrl"
          debounce="500"
          borderless
          dense
          color="grey-6"
          input-style="height: 54px;lineHeight: 54px"
        >
          <template v-slot:prepend>
            <span class="cmtText">Feed</span>
          </template>
        </q-input>
      </div>

      <div class="row iterm-center justify-between button">
        <q-btn class="confirm" label="Confirm" @click="onOKClick" />
      </div>
      <!-- <div class="col-2"></div>
      <div class="col-10 q-px-md">
        <div class="title">Stake</div>
        <q-select
          color="purple-12"
          v-model="validator"
          :options="accountStore.validators"
          label="Label"
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>

        <div class="content row flex flex-start q-pl-lg q-mt-lg">
          <q-input
            borderless
            v-model="stakeAmount"
            label="Stake Amount"
            label-color="blue-7"
          />
        </div>

        Available: {{ avaiable }}
      </div>
      <div class="row iterm-center justify-between button">
        <q-btn class="confirm" label="Confirm" @click="onOKClick" />
      </div> -->
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useDialogPluginComponent, Notify, Loading } from 'quasar';
import { useRssStore } from '../stores/rss';
import { Category, FeedCreationRequest } from '../types';
import { create_feed, get_feeds } from '../api/api';
export default {
  name: 'AddFeedDialog',
  props: {},
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    //const loading = ref(false);
    const error = ref('');
    const stakeAmount = ref(0);
    const rssStore = useRssStore();
    const feedUrl = ref('');
    const category = ref<Category | null>(
      rssStore.categories.length > 0 ? rssStore.categories[0] : null
    );

    async function onOKClick() {
      if (!feedUrl.value) {
        Notify.create({
          message: 'Please input Feed',
          position: 'top-right',
          multiLine: true,
          timeout: 100
        });
        return;
      }

      Loading.show();

      try {
        await create_feed({
          category_id: category.value?.id,
          feed_url: feedUrl.value
        } as FeedCreationRequest);

        await get_feeds();

        await rssStore.refresh_category_and_feeds();

        onDialogOK();
      } catch (e) {
        console.log(e);
      } finally {
        Loading.hide();
      }

      // let d1: any = {
      //   from: accountStore.account,
      //   value: Utils.intNumber(stakeAmount.value, 18).toFixed(0),
      // };
      // console.log('d1' + JSON.stringify(d1));

      // Utils.getContract(accountStore.address)
      //   .methods.stake(validator.value)
      //   .estimateGas(d1)
      //   .then((gaslimit: any) => {
      //     console.log('gaslimit ' + gaslimit);
      //     d1.gaslimit = gaslimit;
      //     console.log('d2' + JSON.stringify(d1));
      //     Utils.getContract(accountStore.address)
      //       .methods.stake(validator.value)
      //       .send(d1)
      //       .then((result: any) => {
      //         console.log('stake ' + JSON.stringify(result));
      //         console.log(result.status);
      //         window.open(
      //           accountStore.explorer + '/tx/' + result.transactionHash,
      //           '_blank'
      //         );

      //         Loading.hide();

      //         onDialogOK();
      //       })
      //       .catch((e: Error) => {
      //         console.log(e);
      //         Loading.hide();
      //       });
      //   })
      //   .catch((e: Error) => {
      //     console.log(e);
      //     Loading.hide();
      //   });
    }

    onMounted(async () => {
      //
    });

    const hide = () => {
      dialogRef.value?.hide();
    };

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick,
      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
      // loading,
      rssStore,
      category,
      feedUrl,
      error,
      hide
    };
  }
};
</script>

<style lang="scss">
.root {
  width: 450px;
  padding: 0 30px 30px 30px;
  border-radius: 20px !important;
  .title {
    width: 100%;
    height: 60px;
    .text {
      flex: 1;
      text-align: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
    }
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .validatorSelect {
    border-radius: 4px;
    margin: 15px 0 20px;
  }

  .searchInput {
    height: 56px;
    border: 1px solid #eef0f6;
    padding-left: 20px;
    padding-right: 10px;
    margin: 15px 0 20px;
    background: #eef0f6;
    border-radius: 10px;
    .cmtIcon {
      width: 20px;
      height: 20px;
      margin-top: 15px;
    }
    .cmtText {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #000000;
      margin: 15px 20px 0 5px;
    }
    .cmtMax {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #5784e9;
      margin-top: 15px;
      cursor: pointer;
    }
  }

  .available {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #000000;
  }

  .button {
    width: 100%;
    margin-top: 30px;
    .confirm {
      width: 170px;
      height: 42px;
      border: 0;
      color: #ffffff;
      background: #5784e9;
      border-radius: 10px;
      margin: 0 auto;
    }
  }
}
</style>
