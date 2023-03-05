<template>
	<div class="root column items-center justify-center" @click="toggle">
		<div class="walletCheck">
			<img class="walletIcon" src="walletIcon/ETH.svg" alt="" />
			<img
				class="check"
				:src="
					check
						? 'walletIcon/checked.svg'
						: 'walletIcon/unChecked.svg'
				"
				alt=""
			/>
		</div>
		<div class="walletName">
			{{ name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

defineProps({
	name: {
		type: String,
		default: 'ETH',
		required: false
	},
	icon: {
		type: String,
		default: 'removeFile',
		required: false
	},
	check: {
		type: Boolean,
		default: false,
		required: false
	}
});
const emit = defineEmits(['toggle']);

const toggle = () => {
	console.log('toggleName');
	emit('toggle');
};
</script>

<style lang="scss" scoped>
.root {
	width: 52px;
	height: 79px;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #f5f5f5;
	}
	.walletCheck {
		width: 32px;
		height: 32px;
		position: relative;
		margin-bottom: 8px;
		.walletIcon {
			width: 32px;
			height: 32px;
		}
		.check {
			width: 12px;
			height: 12px;
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
	.walletName {
		color: #7a7a7a;
		font-size: 14px;
	}
}
</style>
