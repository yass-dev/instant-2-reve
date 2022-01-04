<script>

import mapState from 'vuex';
import BackButton from '../../components/BackButton.vue';
import CollapsibleSection from '../../components/CollapsibleSection.vue';
import Header from '../../components/Header.vue';
import FeedbackModal from '../../components/project/FeedbackModal.vue';
import FeedbackView from '../../components/project/FeedbackView.vue';
import StepView from '../../components/project/StepView.vue';
import UserList from '../../components/UserList.vue';

export default {
	name: "ProjectView",
	components: {CollapsibleSection, Header, UserList, FeedbackView, StepView, FeedbackModal, BackButton},
	data()
	{
		return {
			id: this.$route.params.id,
			section: "steps",
			show_feedback_modal: false
		}
	},
	computed:
	{
		project()
		{
			return this.$store.state.project.projects.find(project => project.id == this.id);
		},

		is_subscribed()
		{
			return this.project.members.find(member => member.id == this.$store.state.user.id);
		},
	},
	methods:
	{
		subscribe()
		{
			this.$store.dispatch('project/subscribe', this.id)
			.catch(err => alert(err));
		},

		unsubscribe()
		{
			this.$store.dispatch('project/unsubscribe', this.id);
		},
	},
}
</script>

<template>
	<div class="project_view">
			<BackButton :text="`Tous les projets`"/>
			<h1>{{ project.name }}</h1>
			<!-- <p class="status">{{ project.status }}</p> -->
			<p class="description">{{ project.description }}</p>
			<div class="subscribe_button" @click="subscribe" v-if="!is_subscribed">S'inscrire</div>
			<div class="unsubscribe_button" @click="unsubscribe" v-else>Se désinscrire</div>
			<div class="nav">
				<p :class="{selected: section == 'steps'}" @click="section = 'steps'">Etapes</p>
				<p :class="{selected: section == 'members'}" @click="section = 'members'">Membres</p>
				<p :class="{selected: section == 'feedbacks'}" @click="section = 'feedbacks'">Feedbacks</p>
			</div>
			<section v-show="section == 'steps'">
				<h2>Étapes</h2>
				<StepView :steps="project.steps"></StepView>
			</section>
			<section v-if="section == 'members'">
				<h2>Members</h2>
				<UserList :users="project.members"/>
			</section>
			<section v-if="section == 'feedbacks'">
				<h2>Feedbacks</h2>
				<FeedbackView :feedbacks="project.feedbacks"></FeedbackView>
				<div class="add_feedback_button" @click="show_feedback_modal = true" v-if="is_subscribed">Ajouter un feedback</div>
			</section>
			<FeedbackModal :project_id="project.id" @close="show_feedback_modal = false" v-if="show_feedback_modal"></FeedbackModal>
		</div>
</template>

<style scoped>

.project_view
{
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
}

.back_button
{
	color: #52a1ff;
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

h2
{
	font-weight: normal;
	margin: 0.5rem 0;
}

.add_feedback_button
{
	width: 100%;
	text-align: center;
	background: #52a1ff;
	color: white;
	padding: 0.5rem;
	margin: 0.5rem 0;
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