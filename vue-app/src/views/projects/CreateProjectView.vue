<script>

import StepEditor from '../../components/create-project/StepEditor';

export default {
	name: "CreateProjectView",
	components: { StepEditor },
	data()
	{
		return {
			name: "",
			description: "",
			steps: [{
				name: "Premiere etape",
				description: "Recolte de dons",
				place: "Université",
				date: new Date(),
			}],

			create_steps: ['BASIC_INFOS', 'STEPS'],
			current_step_index: 0,
		}
	},
	methods:
	{
		addStep()
		{
			this.steps.push({
				name: "Nouvelle etape",
				description: "Recolte de dons",
				place: "Université",
				date: new Date(),
			})
		},
		removeStep(index)
		{
			if (this.steps.length > 1)
				this.steps.splice(index, 1);
			else
				alert("Le nouveau projet doit contenir un moins une étape.");
		},
		create()
		{
			this.$router.push('/projects');
		}
	}
}
</script>

<template>
	<div class="create_project_view">
		<h1>Nouveau projet</h1>
		<div v-if="create_steps[current_step_index] == 'BASIC_INFOS'">
			<div class="field">
				<input type="text" v-model="name" id="name" :class="{active: name.length > 0}"/>
				<label for="name">Nom</label>
			</div>
			<div class="field textarea">
				<textarea v-model="description" id="description" rows="10"></textarea>
				<label for="description">Project name</label>
			</div>
		</div>
		<div class="steps_container" v-else>
			<StepEditor v-for="(step, key) in steps" :key="'project_step_' + key"
						:step="step" @save="steps[key] = $event" @remove="removeStep(key)"/>
			<div class="add_step" @click="addStep()">
				<div class="plus_icon">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z"/></svg>
				</div>
				Ajouter une étape
			</div>
		</div>
		<div class="buttons_container">
			<div class="back_button" @click="current_step_index--" v-if="current_step_index > 0">
				<div>
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"/></svg>
				</div>
				Précédent
			</div>
			<div class="next_button" @click="current_step_index++" v-if="current_step_index < create_steps.length - 1">
				Suivant
				<div>
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0Z"/></svg>
				</div>
			</div>
			<div class="create_button" @click="create()" v-if="current_step_index == create_steps.length - 1">Ajouter</div>
		</div>
	</div>
</template>

<style scoped>

.create_project_view
{
	padding: 1rem;
	background: white;
	min-height: -webkit-fill-available;
}

h1,
h2
{
	font-weight: normal;
	margin: 0;
	text-align: center;
	font-size: 1.75rem;
}

h2
{
	font-size: 1.5rem;
	text-align: left;
}

.field
{
	position: relative;
	margin: 1rem 0;
	padding: 0.5rem 0;
	width: 100%;
}

input
{
	padding: 0.25rem 0.5rem;
	font-size: 1rem;
	outline: none;
	border: none;
	border-bottom: solid 1px #00000033;
	transition: all 0.25s;
	width: 100%;
}

label
{
	position: absolute;
	top: 0.75rem;
	left: 0.5rem;
	font-size: 1rem;
	color: #454545;
	cursor: text;
	width: 100%;
	transition: all 0.25s;
}

input:focus,
input.active
{
	border-bottom-color: rgb(150, 150, 150);
}

input:focus ~ label,
input.active ~ label
{
	top: -0.5rem;
}

a
{
	display: block;
}

.field input
{
	background: transparent;
}

.field.textarea textarea
{
	padding: 0.5rem 1rem;
}

.field.textarea label
{
	top: -0.25rem;
	left: 1rem;
	padding: 0 0.25rem;
	background: white;
	width: fit-content;
}

.field textarea
{
	font-size: 1rem;
	font-family: inherit;
	width: 100%;
	max-width: 100%;
	border: solid 1px #00000033;
}

.buttons_container
{
	display: flex;
}

.buttons_container > div
{
	display: flex;
	align-items: center;
	width: fit-content;
	color: #52a1ff;
	border-radius: 1rem;
}

.buttons_container > div > div
{
	margin: 0 0.25rem;
	width: 1rem;
	height: 1rem;
}

.add_step
{
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem auto;
	width: fit-content;
	color: #52a1ff;
}

.add_step .plus_icon
{
	width: 1.5rem;
	height: 1.5rem;
	margin: 0 0.25rem;
}

.back_button
{
	margin-right: auto;
}

.next_button
{
	margin-left: auto;
}

.buttons_container .create_button
{
	padding: 0.25rem 1rem;
	color: white;
	background: #52a1ff;
	border-radius: 1rem;
}

</style>