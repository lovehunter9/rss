<template>
	<div
		class="root row items-center justify-start"
		@click="toggle(name)"
		:style="{
			border: check ? '1px solid #2787FF' : '',
			color: check ? '#2787FF' : '#7a7a7a'
		}"
	>
		<!-- <img class="walletIcon" :src="`images/${name}.svg`" alt=""> -->
		<q-icon class="walletIcon" :name="icon" />
		<div class="walletName">
			{{ name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
	name: {
		type: String,
		default: 'ETH',
		required: false
	},
	icon: {
		type: String,
		default: 'fa-brands fa-facebook',
		required: false
	},
	check: {
		type: Boolean,
		default: false,
		required: false
	}
});
const emit = defineEmits(['toggle']);

const toggle = (name: string) => {
	console.log('toggleName');
	emit('toggle', name);
};
</script>

<style lang="scss" scoped>
.root {
	height: 56px;
	line-height: 56px;
	border-radius: 4px;
	border-radius: 10px;
	border: 1px solid #ececec;
	cursor: pointer;
	color: #7a7a7a;
	&:hover {
		border: 1px solid #2787ff;
	}

	.walletIcon {
		margin-left: 18px;
		margin-right: 8px;
	}

	.walletName {
		font-size: 16px;
		font-weight: 500;
	}
}
</style>
