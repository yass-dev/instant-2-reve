<script>

import mapState from 'vuex';
import CollapsibleSection from '../../components/CollapsibleSection.vue';
import Header from '../../components/Header.vue';
import UserList from '../../components/UserList.vue';

export default {
	name: "ProjectView",
	components: {CollapsibleSection, Header, UserList},
	data()
	{
		return {
			id: this.$route.params.id,
			// project:
			// {
			// 	name: "Super Big Maraude",
			// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus laoreet augue, a faucibus neque aliquet nec. Curabitur ultricies metus id urna varius, vel pharetra justo tincidunt.",
			// 	steps:
			// 	[
			// 		{
			// 			id: 0,
			// 			name: "Recolte de dons",
			// 			description: "Installer des stands dans les supermarchés.",
			// 			objectives:
			// 			[
			// 				{
			// 					name: "Recolter 100L de lait",
			// 					min: 0,
			// 					max: 100,
			// 					value: 100
			// 				},
			// 				{
			// 					name: "Recolter 50kg de pates",
			// 					min: 0,
			// 					max: 50,
			// 					value: 12
			// 				},
			// 			]
			// 		},
			// 		{
			// 			id: 1,
			// 			name: "Step 2",
			// 			description: "Installer des stands dans les supermarchés.",
			// 			objectives:
			// 			[
			// 				{
			// 					name: "Recolter 100L de lait",
			// 					min: 0,
			// 					max: 100,
			// 					value: 100
			// 				},
			// 				{
			// 					name: "Recolter 50kg de pates",
			// 					min: 0,
			// 					max: 50,
			// 					value: 12
			// 				},
			// 			]
			// 		},
			// 	],
			// 	members: this.$store.state.users,
			// 	feedbacks:
			// 	[
			// 		{
			// 			id: 0,
			// 			content: "Super coooool",
			// 			note: 5,
			// 			user: this.$store.state.users[0],
			// 		},
			// 		{
			// 			id: 1,
			// 			content: "Pas ouf...",
			// 			note: 2,
			// 			user: this.$store.state.users[0],
			// 		},
			// 		{
			// 			id: 2,
			// 			content: "Allah u Akbar",
			// 			note: 4,
			// 			user: this.$store.state.users[0],
			// 		}
			// 	],
			// 	medias: []
			// },
			section: "steps",
			step_refs: []
		}
	},
	computed:
	{
		project()
		{
			return this.$store.state.project.projects.find(project => project.id == this.id);
		},

		step_score: () => (step) =>
		{
			let max = 0;
			let values = 0;
			for (let objective of step.objectives)
			{
				max += objective.max;
				values += objective.value;
			}
			return Math.trunc(values * 100 / max);
		},

		completed_objectives: () => (step) =>
		{
			let count = 0;

			for (let objective of step.objectives)
				if (objective.value >= objective.max)
					count++;
			return count
		},

		objective_is_completed: () => (objective) =>
		{
			return objective.value >= objective.max;
		},

		is_subscribed()
		{
			return this.project.members.find(member => member.id == this.$store.state.user.id);
		}
	},
	methods:
	{
		expand(index)
		{
			if (this.step_refs[index].height == 0)
				this.step_refs[index].height = this.step_refs[index].el.querySelector('.objectives_container').scrollHeight;
			else
				this.step_refs[index].height = 0;
		},

		setStepRef(el)
		{
			if (el)
				this.step_refs.push({el: el, height: 0});
		},

		subscribe()
		{
			this.$store.dispatch('project/subscribe')(this.id);
		}
	},
	beforeUpdate()
	{
		this.itemRefs = []
	},
}
</script>

<template>
	<div class="project_view">
			<h1>{{ project.name }}</h1>
			<!-- <p class="status">{{ project.status }}</p> -->
			<p class="description">{{ project.description }}</p>
			<div class="subscribe_button" v-if="!is_subscribed">S'inscrire</div>
			<div class="unsubscribe_button" v-else>Se désinscrire</div>
			<div class="nav">
				<p :class="{selected: section == 'steps'}" @click="section = 'steps'">Etapes</p>
				<p :class="{selected: section == 'members'}" @click="section = 'members'">Membres</p>
				<p :class="{selected: section == 'feedbacks'}" @click="section = 'feedbacks'">Feedbacks</p>
			</div>
			<section v-show="section == 'steps'">
				<h2>Étapes</h2>
				<div class="step" v-for="(step, index) in project.steps" :ref="setStepRef">
					<div class="infos" @click="expand(index)">
						<p class="name">{{ step.name }}</p>
						<p>{{ completed_objectives(step) }} / {{ step.objectives.length }} </p>
						<p class="score">{{ step_score(step) }}%</p>
					</div>
					<table class="objectives_container" :style="{height: step_refs[index] ? step_refs[index].height + 'px' : 0}">
						<tr class="objective" :class="{completed: objective_is_completed(objective)}" v-for="objective in step.objectives">
							<td>{{ objective.name }}</td>
							<td class="value">{{ objective.value }} / {{ objective.max }}</td>
						</tr>
					</table>
				</div>
			</section>
			<section v-if="section == 'members'">
				<h2>Members</h2>
				<UserList :users="project.members"/>
			</section>
			<section v-if="section == 'feedbacks'">
				<h2>Feedbacks</h2>
				<div class="feedbacks_container">
					<div class="feedback" v-for="feedback in project.feedbacks">
						<div class="header">
							<div class="user">
								<div class="photo_container">
									<img :src="feedback.user.photo"/>
								</div>
								<div class="name">{{ feedback.user.username }}</div>
							</div>
							<div class="note_container">
								<div class="note" :class="{active: i <= feedback.note}" v-for="i in 5">
									<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z"/></svg>
								</div>
							</div>
						</div>
						<p>{{ feedback.content }}</p>
					</div>
				</div>
			</section>
		</div>
</template>

<style scoped>

.project_view
{
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
}

h1
{
	font-weight: normal;
    text-align: center;
	margin-bottom: 0;
}

.status
{
	margin: 0;
}

.description
{
	margin: 1rem;
	text-align: center;
}

.nav
{
	display: flex;
	justify-content: space-around;
	color: #52a1ff;
	overflow-x: auto;
}

.nav > *
{
	position: relative;
	padding-bottom: 0.5rem;
	margin: 1rem 0.5rem;
}

.nav > *:after
{
	content: '';
	position: absolute;
	bottom: 0rem;
	left: 50%;
	transform: translateX(-50%);
	width: 0;
	height: 0.125rem;
	background: #52a1ff;
	transition: all 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.nav > .selected:after
{
	width: 100%;
}

.step
{
	display: flex;
	flex-direction: column;
	border-bottom: solid 1px #00000033;
	padding: 0.5rem 0;
}

.step:last-child
{
	border-bottom: none;
}

.step .infos
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
}

.step p
{
	margin: 0;
}

.step .name
{
	margin: 0
}

.step .score
{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	background: #52a1ff;
	color: white;
}

.step .objectives_container
{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 0;
	transition: all 0.25s;
}

.step .objective
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem 0.5rem 2rem;
}

.step .objective:not(.completed)
{
	font-weight: 500;
	color: #52a1ff;
}

.step .objective.completed
{
	color: #3fdb00;
	font-weight: 500;
}

h2
{
	font-weight: normal;
	margin: 0.5rem 0;
}

.feedbacks_container
{
	display: flex;
	flex-direction: column;
}

.feedback
{
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-bottom: solid 1px #00000020;
}

.feedback:last-child
{
	border: none;
}

.feedback .header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.feedback .user
{
	display: flex;
	align-items: center;
}

.feedback .user .name
{
	font-weight: 500;
}

.feedback .photo_container
{
	width: 2.5rem;
	height: 2.5rem;
	margin-right: 1rem;
}

.feedback .note_container
{
	display: flex;
}

.feedback .note
{
	width: 1rem;
	height: 1rem;
	color: transparent;
}

.feedback .note svg
{
	stroke: #212121;
	stroke-width: 1px;
}

.feedback .note.active
{
	color: #ffe62c;
}

.feedback p
{
	margin-bottom: 0;
}

.subscribe_button,
.unsubscribe_button
{
	margin: 1rem 0;
	padding: 0.5rem 1rem;
	background: #52a1ff;
	color: white;
	font-weight: 500;
	text-align: center;
	width: 100%;
}

</style>