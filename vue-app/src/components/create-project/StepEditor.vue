<script>

import VueDatepickerUi from 'vue-datepicker-ui';
import 'vue-datepicker-ui/lib/vuedatepickerui.css';

export default {
	name: "StepEditor",
	components: { DatePicker: VueDatepickerUi },
	props:
	{
		step:
		{
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			name: this.step.name,
			description:  this.step.description,
			place:  this.step.place,
			date: new Date(),

			edit_mode: false,
			id: this.$.uid
		}
	},
	methods:
	{
		remove()
		{
			this.$emit('remove');
		},

		edit()
		{
			this.edit_mode = true;
		},

		save()
		{
			this.$emit('save',
			{
				name: this.name,
				description: this.description,
				place: this.place,
				date: this.date
			});
			this.edit_mode = false;
		}
	},
	computed:
	{
		current_date()
		{
			let date = new Date();
			let hours = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours());
			let minutes = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes());
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${hours}:${minutes}`;
		}
	}
}
</script>

<template>
	<div class="step_editor">
		<div class="header">
			<p v-if="!edit_mode">{{ name }} </p>
			<div class="field" v-else>
				<input type="text" v-model="name" :class="{active: name.length > 0}" placeholder="Nom de l'étape"/>
			</div>
			<div class="buttons_container">
				<div class="button edit" @click="edit" v-if="!edit_mode">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"/></svg>
				</div>
				<div class="button save" @click="save" v-if="edit_mode">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 3h-1A2.75 2.75 0 0 0 3 5.75v12.5A2.75 2.75 0 0 0 5.75 21H6v-6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 15v6h.25A2.75 2.75 0 0 0 21 18.25V8.286a3.25 3.25 0 0 0-.952-2.299l-2.035-2.035A3.25 3.25 0 0 0 15.75 3v4.5a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 7.5V3Z"/><path d="M14.25 3v4.5a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75V3h6ZM16.5 21v-6a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v6h9Z"/></svg>
				</div>
				<div class="button remove" @click="remove">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"/></svg>
				</div>
			</div>
		</div>
		<div class="content" v-if="edit_mode">
			<div class="field textarea">
				<textarea v-model="description" :id="`description${this.id}`" rows="3" placeholder="Récolte alimentaire..."></textarea>
				<label :for="`description${this.id}`">Petite description</label>
			</div>
			<div class="place_date_container">
				<div class="field">
					<input type="text" v-model="place" :id="`place_${this.id}`" :class="{active: place.length > 0}"/>
					<label for="`place_${this.id}`">Place</label>
				</div>
				<div class="date">
					<label>
						Date
						<input type="datetime-local" :value="current_date"/>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.step_editor
{
	width: 100%;
	margin: 1rem 0;
	color: rgb(75 75 75);
}

.header
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: solid 1px #00000033;
	padding: 0.5rem 0;
}

.header p
{
	margin: 0;
}

.header .field
{
	margin: 0;
	padding: 0;
}

.header .field input
{
	border: none;
}

.header .buttons_container
{
	display: flex;
}

.header .button
{
	width: 1.25rem;
	height: 1.25rem;
	margin: 0 0.25rem;
}

.content
{
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	font-size: 0.9rem;
}

.field
{
	position: relative;
	margin: 0.5rem 0;
	padding: 0.5rem 0;
	width: 100%;
}

input[type="text"]
{
	padding: 0.25rem 0.5rem;
	font-size: inherit;
	outline: none;
	border: none;
	border-bottom: solid 1px #00000033;
	transition: all 0.25s;
	width: 100%;
	background: white;
}

.field label
{
	position: absolute;
	top: 0.75rem;
	left: 0.5rem;
}

label
{
	font-size: inherit;
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

.place_date_container
{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.place_date_container .field
{
	margin-right: 1rem;
}

.date label
{
	display: flex;
}

.date label input
{
	margin: 0 0.5rem;
}

.date input
{
	background: white;
	border: none;
	font-size: inherit;
	font-family: inherit;
	border-bottom: solid 1px #00000033;
}

</style>