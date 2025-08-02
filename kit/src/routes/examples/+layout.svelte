<script lang="ts">
	import { env } from '$env/dynamic/public';

	let { children } = $props();
</script>

<svelte:head>
	<script src={`${env.PUBLIC_ELLIOT_URL}/static/pagedjs/browser.js`}></script>
	<script src={`${env.PUBLIC_ELLIOT_URL}/static/handler/image-loading-handler.js`}></script>
	<script
		src={`${env.PUBLIC_ELLIOT_URL}/static/handler/relative-to-absolute-static-files-handler.js`}
	></script>

	<link rel="stylesheet" href={`${env.PUBLIC_ELLIOT_URL}/static/preview.css`} media="screen" />
</svelte:head>

{@render children?.()}
