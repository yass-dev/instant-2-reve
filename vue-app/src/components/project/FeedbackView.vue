<script>
export default {
	name: "FeedbackView",
	props:
	{
		feedbacks:
		{
			type: Array,
			required: true
		}
	}
}
</script>

<template>
	<div class="feedbacks_container">
		<div class="feedback" v-for="feedback in feedbacks">
			<div class="header">
				<div class="user" v-if="!feedback.is_anonyme">
					<div class="photo_container">
						<img :src="feedback.user.photo"/>
					</div>
					<div class="name">{{ feedback.user.username }}</div>
				</div>
				<div v-else>Anonyme</div>
				<div class="note_container">
					<div class="note" :class="{active: i <= feedback.note}" v-for="i in 5">
						<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z"/></svg>
					</div>
				</div>
			</div>
			<p>{{ feedback.comment }}</p>
		</div>
	</div>
</template>

<style scoped>

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
	font-weight: 500;
}

.feedback .user
{
	display: flex;
	align-items: center;
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

</style>