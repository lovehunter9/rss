<template>
	<div
		class="root row items-center justify-between"
		:style="{
			'pointer-events': disable ? 'none' : '',
			border: check ? '1px solid #2787FF' : ''
		}"
		@click="toggle"
	>
		<div class="walletName">
			{{ label }}
		</div>
		<div class="walletCheck row items-center justify-center">
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
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

defineProps({
	label: {
		type: String,
		default: 'ETH',
		required: false
	},
	check: {
		type: Boolean,
		default: false,
		required: false
	},
	disable: {
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
	width: 100%;
	height: 44px;
	cursor: pointer;
	border: 1px solid #ececec;
	border-radius: 10px;
	margin-bottom: 10px;

	&:hover {
		background-color: #f5f5f5;
	}
	.walletCheck {
		width: 52px;
		height: 44px;
		.check {
			width: 12px;
			height: 12px;
		}
	}
	.walletName {
		width: calc(100% - 52px);
		color: #7a7a7a;
		font-size: 14px;
	}
}
</style>
