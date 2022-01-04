<script>

export default {
	name: "Header",
	computed:
	{
		user_photo()
		{
			return this.$store.state.user.photo;
		}
	}
}
</script>

<template>
	<header>
		<div class="left">
			<router-link class="title" to="/">Instant 2 Rêve</router-link>
		</div>
		<router-link to="/profile" class="profile_button">
			<div class="profile_photo">
				<img :src="user_photo"/>
			</div>
		</router-link>
	</header>
</template>

<style scoped>

header
{
	display: flex;
	justify-content: space-between;
	padding: 0.75rem 1rem;
	width: 100%;
	background: #51A1FF;
	color: white;
}

.left
{
	display: flex;
}

.side_bar_toggler
{
	display: none;
}

.title
{
	font-size: 1.5rem;
	font-weight: 600;
	margin: 0;
}

.profile_photo
{
	width: 2rem;
	height: 2rem;
	overflow: hidden;
	border-radius: 100%;
	cursor: pointer;
}

@media screen and (max-width: 550px)
{
	.side_bar_toggler
	{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		margin-right: 1rem;
	}
}

</style>
