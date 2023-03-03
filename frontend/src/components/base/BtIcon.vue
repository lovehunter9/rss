<template>
	<span class="row items-center">
		<img
			:src="require(`../../assets/icon/${src}.svg`)"
			:alt="src"
			:width="width"
			:height="height"
		/>
		<!-- <svg class="icon" :style="style">
      <use :xlink:href="'#icon-' + src"></use>
    </svg> -->
		<slot></slot>
	</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

//const props =
defineProps({
	width: {
		type: Number,
		default: 20,
		required: false
	},
	height: {
		type: Number,
		default: 20,
		required: false
	},
	src: {
		type: String,
		default: '',
		required: true
	},
	isActive: {
		type: Boolean,
		default: false,
		required: false
	},
	color: {
		type: String,
		default: '#212322',
		required: false
	}
});

// const style = {
//   width: props.width + 'px',
//   height: props.height + 'px',
//   color: props.color
// };
</script>

<style lang="scss" scoped>
.icon {
	width: 1rem;
	height: 1rem;
	vertical-align: -0.15rem;
	fill: currentColor;
	overflow: hidden;
}
</style>
