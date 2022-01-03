<script>
import BackButton from '../BackButton.vue';
import BaseHeader from '../BaseHeader.vue';
export default {
	components: { BaseHeader, BackButton },
	name: "ChatViewHeader",
	props:
	{
		chat:
		{
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			show_more_popup: false
		}
	},
	methods:
	{
		back()
		{
			this.$router.go(-1);
		}
	}
}
</script>

<template>
	<div class="chat_view_header">
		<BaseHeader>
			<BackButton/>
			<div class="chat_name">{{ chat.name }}</div>
			<div class="more_container">
				<div class="more_button" @click="show_more_popup = !show_more_popup">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/></svg>
				</div>
				<div class="more_popup" v-if="show_more_popup">
					<router-link :to="`/chat/${chat.id}/infos`">Infos</router-link>
					<p>Rechercher</p>
				</div>
			</div>
		</BaseHeader>
	</div>
</template>

<style scoped>

.chat_view_header > *
{
	display: flex;
	flex: 0 1 auto;
}

.chat_name
{
	font-size: 1.2rem;
}

.more_button
{
	width: 1.5rem;
	height: 1.5rem;
}

.more_popup
{
	position: fixed;
	top: 2.5rem;
	right: 0.5rem;
	background: white;
	color: rgb(50, 50, 50);
	text-align: center;
	padding: 0.5rem 0;
	border-radius: 0.125rem;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0,.26),0 2px 10px 0 rgba(0, 0, 0,.16);
}

.more_popup > *
{
	padding: 0.5rem 1rem;
	margin: 0;
}

.more_popup > *:hover
{
	background: #f5f5f5;
}

.leave_group_button
{
	color: rgb(255, 30, 30);
}

</style>