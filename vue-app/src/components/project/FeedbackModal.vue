<script>
export default {
	name: "FeedbackModal",
	props:
	{
		project_id:
		{
			type: Number,
			required: true
		}
	},
	data()
	{
		return {
			note: 3,
			comment: "",
			is_anonyme: false
		}
	},
	methods:
	{
		addFeedback(e)
		{
			e.preventDefault();

			this.$store.dispatch('project/addFeedback', {project_id: this.project_id, note: this.note, comment: this.comment, is_anonyme: this.is_anonyme})
			.then(() =>
			{
				this.close();
			})
			.catch(err =>
			{
				alert(err);
			})
		},

		close()
		{
			this.$emit('close');
		}
	}
}
</script>

<template>
	<div class="feedback_modal">
		<div class="fade" @click="close()"></div>
		<div class="modal">
			<p class="title">Ajouter un feedback</p>
			<form @submit="addFeedback">
				<div class="field">
					<label for="radio_1">A quel point êtes-vous satisfait du projet ?</label>
					<div class="stars_container">
						<div class="star" :class="{selected: i <= note}" v-for="i in 5">
							<label :for="`radio_${i}`">
								<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z"/></svg>
							</label>
							<input type="radio" :id="`radio_${i}`" :value="i" v-model="note" hidden/>
						</div>
					</div>
				</div>
				<div class="field comment_field">
					<label for="comment">Laissez un commentaire</label>
					<textarea id="comment" rows="5" v-model="comment"></textarea>
				</div>
				<div class="field anonyme_field">
					<input type="checkbox" v-model="is_anonyme" id="anonyme"/>
					<label for="anonyme">Rester anonyme</label>
				</div>
				<button class="submit_button">Envoyer</button>
			</form>
		</div>
	</div>
</template>

<style scoped>

.fade
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #00000020;
}

.modal
{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: max-content;
	padding: 1rem;
	background: white;
}

.title
{
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
}

.field
{
	display: flex;
	flex-direction: column;
	position: relative;
	margin: 1rem 0;
}

.field > label
{
	margin: 0.5rem 0;
}

.field textarea
{
	width: 100%;
	padding: 0.5rem;
}

.stars_container
{
	display: flex;
	justify-content: center;
}

.star
{
	width: 2.25rem;
	height: 2.25rem;
	color: transparent;
}

.star.selected
{
	color: #ffe62c;
}

.star svg
{
	stroke: #6a6a6a;
	stroke-width: 1px;
}

input,
textarea
{
	outline: none;
	font-size: 1rem;
	font-family: inherit;
}

.comment_field
{
	padding: 0.5rem 0;
}

.comment_field label
{
	position: absolute;
	top: 0;
	left: 1rem;
	background: white;
	margin: 0 0;
	padding: 0 0.5rem;
	transform: translateY(-0.125rem);
}

.comment_field textarea
{
	padding: 0.75rem;
	font-size: 0.95rem;
}

.anonyme_field
{
	flex-direction: row;
	align-items: center;
}

.anonyme_field label
{
	margin: 0 0.5rem;
}

.submit_button
{
	display: block;
	padding: 0.5rem 1rem;
	background: #52a1ff;
	color: white;
	margin-left: auto;
	border: none;
	outline: none;
	font-size: 1rem;
}

</style>