<script>
import ProjectList from '../../components/project/ProjectList.vue';

export default {
	name: "ProjectListView",
	components: { ProjectList },
	data()
	{
		return {
			search: ""
		}
	},
	computed:
	{
		projects()
		{
			return this.$store.state.project.projects.filter(project => project.name.toLowerCase().includes(this.search.toLowerCase()));
		},
	},

}
</script>,

<template>
	<div class="project_list_view">
		<router-link class="new_project_button" to="/projects/new">Nouveau projet</router-link>
		<div class="search">
			<input type="text" ref="search_input" placeholder="Rechercher un projet..." v-model="search"/>
			<button class="search_button">
				<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95;" xml:space="preserve"> <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1 c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4 c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/> </svg>
			</button>
		</div>
		<ProjectList :projects="projects"/>
	</div>
</template>

<style scoped>

.project_list_view
{
	display: flex;
	flex-direction: column;
	width: 100%;
}

.new_project_button
{
	width: calc(100% - 2rem);
	padding: 0.5rem 1rem;
	text-align: center;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: 1rem;
    color: white;
    background: #52a1ff;
    border-radius: 0.75rem;
}

.search
{
	display: flex;
	margin: 1rem;
	padding: 0.25rem;
	border-radius: 2rem;
	background: white;
	border: solid 2px #52a1ff;
}

.search input
{
	font-size: 1rem;
	padding: 0.5rem;
	background: transparent;
	border: none;
	outline: none;
	width: -webkit-fill-available;
}

.search_button
{
	width: 2rem;
	padding: 0.25rem 0.5rem;
	border: none;
	outline: none;
	background: #52a1ff;
    color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search_button svg
{
	width: 1rem;
}

</style>