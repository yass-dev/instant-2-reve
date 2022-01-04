<script>
import Header from '../components/Header.vue';
import ProjectList from '../components/project/ProjectList.vue';
export default {
	components: { Header, ProjectList },
	name: "UserView",
	created()
	{
		let req_id = this.$route.params.id;
		if (req_id == this.$store.state.user.id)
			this.$router.push('/profile');
		else if (this.$store.state.users.find(u => u.id == req_id) === undefined)
		{
			alert("User not found");
			this.$router.push('/')
		}
	},
	computed:
	{
		user()
		{
			return this.$store.state.users.find(u => u.id == this.$route.params.id);
		},

		projects()
		{
			return this.$store.state.project.projects.filter(project =>
			{
				return project.members.find(member => member.id == this.user.id) !== undefined;
			})
		}
	}
}
</script>

<template>
	<div class="user_view">
		<Header/>
		<div class="content">
			<div class="photo_container">
				<img :src="user.photo"/>
			</div>
			<h1>{{ user.username }}</h1>

			<p>{{ user.biography }}</p>

			<section>
				<p class="title">Projets:</p>
				<ProjectList :projects="projects"/>
			</section>

			<div class="message_button">Message</div>
		</div>
	</div>
</template>

<style scoped>

.user_view
{
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: -webkit-fill-available;
}

.content
{
	padding: 1rem;
}

.photo_container
{
	width: 7.5rem;
	height: 7.5rem;
	border-radius: 100%;
	overflow: hidden;
	margin: 0 auto;
}

h1
{
	font-weight: 500;
	font-size: 1.5rem;
	text-align: center;
}

section .title
{
	margin: 0;
	font-size: 1.2rem;
}

.message_button
{
	margin: 1rem auto;
	padding: 0.5rem 2rem;
	background: #52a1ff;
	color: white;
	width: fit-content;
}

</style>