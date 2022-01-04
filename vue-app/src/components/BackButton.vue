<script>
export default {
	name: "BackButton",
	props:
	{
		text:
		{
			type: String,
			required: false,
			default: ""
		}
	}
}
</script>

<template>
	<div class="back_button" @click="$router.go(-1)">
		<div class="">
			<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.295 19.716a1 1 0 0 0 1.404-1.425l-5.37-5.29h13.67a1 1 0 1 0 0-2H6.336L11.7 5.714a1 1 0 0 0-1.404-1.424l-6.924 6.822a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"/></svg>
		</div>
		<p v-if="text.length > 0">{{ text }}</p>
	</div>
</template>

<style scoped>

.back_button
{
	display: flex;
	align-items: center;
}

.back_button > div
{
	width: 1.5rem;
	height: 1.5rem;
	color: inherit;
}

.back_button p
{
	margin: 0;
	margin-left: 0.5rem;
}

</style>