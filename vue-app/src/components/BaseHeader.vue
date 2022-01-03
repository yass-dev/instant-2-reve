<script>
export default {
	name: "BaseHeader",
}
</script>

<template>
	<div class="base_header">
		<slot></slot>
	</div>
</template>

<style scoped>

.base_header
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	padding: 0.75rem 1rem;
	width: 100%;
	background: #51A1FF;
	color: white;
	z-index: 1;
}

</style>