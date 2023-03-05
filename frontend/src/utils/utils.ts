import { ref, onMounted, onBeforeUnmount } from 'vue';
export function useWinSize() {
	const size = ref({
		width:
			document.documentElement.clientWidth || document.body.clientWidth,
		height:
			document.documentElement.clientHeight || document.body.clientHeight
	});

	function onResize() {
		size.value = {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		};
	}

	onMounted(() => {
		addEventListener('resize', onResize);
	});

	onBeforeUnmount(() => {
		removeEventListener('resize', onResize);
	});

	return size;
}

export const useIsMobile = () => {
	const isMobile = ref(false);
	if (
		navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		)
	) {
		isMobile.value = true;
	}
	if (document.body.clientWidth < 800) {
		isMobile.value = true;
	}

	return isMobile.value;
};

