<script>
import Header from '../../components/Header.vue'

export default {
	components: { Header },
	name: "ProjectBase"
}
</script>

<template>
	<div class="project_base">
		<Header/>
		<router-view/>
	</div>
</template>

<style scoped>



</style>