<script>

import SideBar from './components/SideBar.vue';

export default {
	name: "App",
	components: { SideBar },
	mounted()
	{
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () =>
		{
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	},
	unmounted()
	{
		this.$store.dispatch('disconnectSockets');
	},
}

</script>

<template>
	<div class="app">
		<SideBar v-if="this.$store.state.is_logged_in"/>
		<div class="page_container" :class="{fullscreen: !this.$store.state.is_logged_in}">
			<router-view/>
		</div>
	</div>
</template>

<style>

html
{
	width: 100%;
	height: 100%;
}

#app
{
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background: #FAFAFA;
}

.app
{
	display: flex;
	height: 100vh; /* Fallback for browsers that do not support Custom Properties */
	height: calc(var(--vh, 1vh) * 100);
	overflow: auto;
}

body
{
	margin: 0;
}

.flex
{
	display: flex;
}

*
{
	box-sizing: border-box;
}

svg
{
	width: 100%;
}

img
{
	width: 100%;
	height: 100%;
}

a, a:visited
{
	color: inherit;
	text-decoration: none;
}

.page_container
{
	display: flex;
	flex-direction: column;
	width: 100%;
	transition: all 0.25s;
}

@media screen and (max-width: 550px)
{
	.app
	{
		flex-direction: column-reverse;
	}

	.page_container
	{
		height: -webkit-fill-available;
		overflow-y: auto;
	}

	.page_container.fullscreen
	{
		height: 100vh; /* Fallback for browsers that do not support Custom Properties */
		height: calc(var(--vh, 1vh) * 100);
	}
}

</style>
