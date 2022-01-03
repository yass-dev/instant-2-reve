<script>
import BackButton from '../../components/BackButton.vue';
import BaseHeader from '../../components/BaseHeader.vue';
export default {
	components: { BaseHeader, BackButton },
	name: "CreateGroup",
	props: ['users'],
	data()
	{
		return {
			group_name: "",
		}
	},
	mounted()
	{
		console.log("Mounted with", this);
	},
	methods:
	{
		createGroup(e)
		{
			e.preventDefault();

			let users = this.$store.state.chat.tmp_group_members;
			this.$store.dispatch('chat/createGroup', {name: this.group_name, users_id: users.map(u => u.id)})
			.then(() =>
			{
				this.$router.push('/chat');
			})
			.catch(err =>
			{
				alert(err.message);
			})
		}
	}
}
</script>

<template>
	<div>
		<BaseHeader>
			<BackButton/>
			<div class="title">Nouveau groupe</div>
		</BaseHeader>
		<div class="create_group">
			<form @submit="createGroup">
				<label class="photo_container">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>
					<input type="file" hidden>
				</label>
				<div class="name_field" :class="{active: this.group_name.length > 0}">
					<input type="text" v-model="group_name" placeholder="Nom du groupe"/>
				</div>
				<div class="next_button" @click="createGroup">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"/></svg>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>

.create_group
{
	position: relative;
	height: -webkit-fill-available;
	padding: 1rem;
}

.title
{
	font-size: 1.2rem;
	width: 100%;
	margin-left: 1rem;
}

form
{
	display: flex;
	align-items: center;
}

.photo_container
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	padding: 0.5rem;
	border-radius: 100%;
	background: #52a1ff;
	flex-shrink: 0;
	flex-grow: 0;
	color: white;
	margin-right: 1rem;
}

.name_field
{
	width: 100%;
}

.name_field input
{
	border: none;
	border-bottom: solid 1px #00000044;
	background: transparent;
	width: 100%;
	font-size: 1rem;
	outline: none;
	padding: 0.25rem 0.5rem;
}

.name_field.active input
{
	border-bottom-color: #52a1ff;
}

.next_button
{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	padding: 0.625rem;
	color: white;
	background: #52a1ff;
}

</style>