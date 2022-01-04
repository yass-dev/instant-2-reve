<script>
export default {
	name: "StepView",
	props:
	{
		steps:
		{
			type: Array,
			required: true
		}
	},
	data()
	{
		return {
			step_refs: []
		}
	},
	computed:
	{
		rendered_date: () => (date) =>
		{
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return date.getDate() + " " + months[date.getMonth()].substring(0, 3);
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
	}
}
</script>

<template>
	<div class="steps_container">
		<div class="step" v-for="(step, index) in steps" :ref="setStepRef">
			<div class="infos" @click="expand(index)">
				<p class="name">{{ step.name }}</p>
				<p>{{ rendered_date(step.start_date) }} - {{ rendered_date(step.end_date) }}</p>
				<div>
					<p>{{ completed_objectives(step) }} / {{ step.objectives.length }} </p>
					<p class="score">{{ step_score(step) }}%</p>
				</div>
			</div>
			<table class="objectives_container" :style="{height: step_refs[index] ? step_refs[index].height + 'px' : 0}">
				<tr class="objective" :class="{completed: objective_is_completed(objective)}" v-for="objective in step.objectives">
					<td>{{ objective.name }}</td>
					<td class="value">{{ objective.value }} / {{ objective.max }}</td>
				</tr>
				<div v-if="step.objectives.length == 0">Aucun objectif inscrits</div>
			</table>
		</div>
	</div>
</template>

<style scoped>

.steps_container
{
	display: flex;
	flex-direction: column;
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

.step .infos > div
{
	display: flex;
	align-items: center;
}

.step .infos > div > *:first-child
{
	margin-right: 0.25rem;
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

</style>