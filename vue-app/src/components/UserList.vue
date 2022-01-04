<script>
export default {
	name: "UserList",
	props:
	{
		users:
		{
			type: Array,
			required: true,
		}
	}
}
</script>

<template>
	<div class="user_list">
		<router-link class="item" v-for="user in users" :to="`/users/${user.id}`" :key="`user_${user.id}`">
			<div class="photo_container">
				<img :src="user.photo"/>
			</div>
			<div class="text">
				<p class="name">{{ user.username }}</p>
				<p class="biography">{{ user.biography }}</p>
			</div>
			<div></div>
		</router-link>
	</div>
</template>

<style scoped>

.item
{
	display: flex;
	padding: 1rem;
	width: 100%;
	align-items: center;
	border-bottom: solid 1px #00000020;
}

.item:last-child
{
	border-bottom: none;
}

.photo_container
{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	overflow: hidden;
}

.text
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1rem;
}

.text p
{
	margin: 0;
}

.item .name
{
	font-size: 1.05rem;
	font-weight: 500;
}

.item .biography
{
	font-size: 0.9rem;
	color: grey;
}

</style>