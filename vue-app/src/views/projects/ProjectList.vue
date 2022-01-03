<script>

export default {
	name: "ProjectList",
	mounted()
	{
		this.$store.dispatch('project/load');
	},
	computed:
	{
		projects()
		{
			return this.$store.state.project.projects;
		},

		rendered_date: () => (project) =>
		{
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			if (project.start_date.getMonth() == project.end_date.getMonth()
				&& project.start_date.getDate() == project.end_date.getDate())
				return project.start_date.getDate() + " " + months[project.start_date.getMonth()].substring(0, 3);
			else
			return project.start_date.getDate() + " " + months[project.start_date.getMonth()].substring(0, 3) + " - " + project.end_date.getDate() + " " + months[project.end_date.getMonth()].substring(0, 3);
		},
	}
}
</script>,

<template>
	<div class="project_list">
		<router-link class="new_project_button" to="/projects/new">Nouveau projet</router-link>
		<form class="search">
			<input type="text" ref="search_input" placeholder="Rechercher un projet..."/>
			<button class="search_button">
				<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95;" xml:space="preserve"> <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1 c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4 c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/> </svg>
			</button>
		</form>
		<router-link class="project" v-for="project in projects" :to="`/projects/${project.id}`">
			<div class="icon">
				<svg version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 405.986 405.986" style="enable-background:new 0 0 405.986 405.986;" xml:space="preserve"> <path d="M186.836,234.861c42.377,18.336,70.009-41.008,70.009-79.686c0-37.342-28.713-59.235-66.032-42.779 c3.116-5.205,8.046-12.653,14.276-19.798h0.007c5.275-6.065,15.605-13.851,15.605-13.851c1.553-1.174,1.386-2.808-0.379-3.631 l-12.488-5.834c-1.764-0.827-4.165-0.224-5.334,1.332c0,0-9.235,13.249-20.104,41.448c-33.604-15.201-65.55,6.091-65.55,43.114 C116.847,193.854,146.598,252.596,186.836,234.861z"/> <path d="M183.288,99.873c1.942-0.163,3.657-1.883,3.815-3.823c0,0,1.246-15.122-9.292-25.672 c-10.573-10.553-25.667-9.296-25.667-9.296c-1.943,0.163-3.656,1.882-3.817,3.822c0,0-1.271,15.13,9.283,25.684 C168.159,101.13,183.288,99.873,183.288,99.873z"/> <path d="M402.341,249.297c-27.2-5.271-53.046-8.969-79.012-11.307c-5.163-0.465-10.392-0.699-15.542-0.699 c-33.736,0-61.283,9.725-87.926,19.129c-7.507,2.65-18.473,5.301-30.083,8.107c-16.946,4.096-34.469,8.33-42.732,12.997 c-7.484,4.228-10.303,9.39-8.376,15.345c2.81,8.687,14.416,12.56,37.631,12.56c15.517,0,34.684-1.724,54.975-3.548 c3.261-0.293,6.576-0.59,9.918-0.885c-27.75,7.471-51.425,11.254-70.485,11.254c-21.89,0-36.169-5.086-40.207-14.323 c-2.852-6.524-0.151-14.735,7.606-23.117l1.151-1.244l-1.645-0.405c-0.853-0.211-85.483-21.107-101.709-24.666 c-3.578-0.785-7.212-1.184-10.801-1.184c-12.894,0-23.373,5.123-24.916,12.18c-0.746,3.41,0.105,10.096,14.211,16.575 l123.708,52.101c4.13,1.525,8.372,3.291,12.863,5.16c13.735,5.715,27.938,11.627,41.135,11.625c5.491,0,10.746-0.572,16.064-1.748 c9.577-2.119,33.763-9.283,59.367-16.867c24.925-7.383,50.7-15.018,61.012-17.338c8.093-1.821,16.434-2.707,25.499-2.707 c15.629,0,30.966,2.627,46.61,5.556l5.328,0.997V250L402.341,249.297z"/> </svg>
			</div>
			<div class="text">
				<div class="date">
					<p>{{ rendered_date(project) }}</p>
					<div class="date_icon">
						<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 8.5v9.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V8.5h18ZM7.25 15a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 15a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm-4.75-4.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.75 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.75 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm1-7.5A3.25 3.25 0 0 1 21 6.25V7H3v-.75A3.25 3.25 0 0 1 6.25 3h11.5Z"/></svg>
					</div>
				</div>
				<p class="name">{{ project.name }}</p>
				<div class="status_members">
					<div class="status" v-if="project.status == 'NOT_STARTED'">
						<div class="status_icon not_started"></div>
						<p>Pas commencé</p>
					</div>
					<div class="status" v-if="project.status == 'IN_PROGRESS'">
						<div class="status_icon in_progress"></div>
						<p>En progression</p>
					</div>
					<div class="status" v-if="project.status == 'FINISHED'">
						<div class="status_icon finished"></div>
						<p>Terminé</p>
					</div>
					<div class="members_container">
						<div class="member" v-for="member in project.members">
							<div class="photo"></div>
						</div>
						<div v-if="project.members.length == 0">Aucun membre</div>
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<style scoped>

.project_list
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

.project
{
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	border-bottom: solid 1px rgba(225, 225, 225, 0.75)
}

.project .icon
{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	padding: 0.5rem;
	margin-right: 0.5rem;
	background: #52a1ff;
	color: white;
	align-self: center;
	flex-grow: 0;
	flex-shrink: 0;
}

.project p
{
	margin: 0;
}

.project .text
{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: -webkit-fill-available;
}

.project .name
{
	font-size: 1.1rem;
	margin: 0.25rem 0;
}

.project .status_members
{
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.project .status
{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.9rem;
	color: #52a1ff;
}

.project .status_icon
{
	position: relative;
	width: 0.75rem;
	height: 0.75rem;
	margin-right: 0.25rem;
	border-radius: 100%;
	background: transparent;
	border: solid 1px #52a1ff;
}

.project .status_icon:after
{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	border-radius: 100%;
	background: #52a1ff;
}

.project .status_icon.not_started:after
{
	background: transparent;
}

.project .status_icon.in_progress:after
{
	clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
}

.project .description
{
	display: flex;
	font-size: 0.9rem;
	color: rgb(128 128 128);
	float: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.project .date_members_container
{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.project .date
{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 0.85rem;
	white-space: nowrap;
	color: rgb(75, 75, 75);
}

.project .date_icon
{
	width: 0.9rem;
	height: 0.9rem;
	margin-left: 0.25rem;
}

.project .members_container
{
	display: flex;
	justify-content: flex-end;
}

.project .member
{
	width: calc(0.9rem * 0.75);	/* Half of the photo to overlay */
}

.project .member .photo
{
	width: 0.9rem;
	height: 0.9rem;
	background: #52a1ff;
	border-radius: 100%;
	border: solid 1px white;
}

</style>