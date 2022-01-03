<script>
import { mapGetters, mapState } from 'vuex';
import ChatListHeader from '@/components/chat/ChatListHeader.vue';

export default {
	name: "ChatList",
	components: { ChatListHeader },
	data()
	{
		return {
			search: ""
		}
	},
	computed:
	{
		chats()
		{
			let chats = this.$store.state.chat.chats;
			chats.map(chat =>
			{
				if (!chat.is_group)
				{
					let other_user = chat.members.filter(member => member.id != this.$store.state.user.id)[0];
					chat.name = other_user.username;
					chat.photo = other_user.photo;
				}
				return chat;
			})
			return chats;
		},
		updated_date: () => (date) =>
		{
			let today = new Date();
			if (date.getDate() == today.getDate() &&
				date.getMonth() == today.getMonth() &&
				date.getFullYear() == today.getFullYear())
			{
				let hours = (date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`);
				let minutes = (date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`);
				return `${hours}:${minutes}`;
			}
		},
		searched_chats()
		{
			return this.chats.filter(chat => chat.name.toLowerCase().includes(this.search.toLowerCase()))
		}
	},
	methods:
	{
		setSearch(e)
		{
			this.search = e;
		}
	}
}
</script>

<template>
	<div class="chat_list">
		<ChatListHeader @search="setSearch"/>
		<router-link :to="`/chat/${chat.id}`" class="chat_item" v-for="chat in searched_chats">
			<div class="photo_container">
				<img :src="chat.photo"/>
			</div>
			<div class="text">
				<div class="flex">
					<p class="name">
						{{ chat.name }}
					</p>
					<p class="updated_date">{{ updated_date(chat.updated_date) }}</p>
				</div>
				<!-- <p class="last_message">{{ chat.last_message.author }} : {{ chat.last_message.content }}</p> -->
			</div>
		</router-link>
		<router-link to="/chat/new" class="create_chat_button">
			<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.644-1.142l-4.29 1.117a.85.85 0 0 1-1.037-1.036l1.116-4.289A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2Zm1.252 11H8.75l-.102.007a.75.75 0 0 0 0 1.486l.102.007h4.502l.101-.007a.75.75 0 0 0 0-1.486L13.252 13Zm1.998-3.5h-6.5l-.102.007a.75.75 0 0 0 0 1.486L8.75 11h6.5l.102-.007a.75.75 0 0 0 0-1.486L15.25 9.5Z"/></svg>
		</router-link>
	</div>
</template>

<style scoped>

.chat_list
{
	position: relative;
	display: flex;
	flex-direction: column;
	height: -webkit-fill-available;
	overflow-y: auto;
}

.chat_item
{
	display: flex;
	align-items: center;
	padding: 0 0.5rem;
	margin: 0.75rem 0;
}

.chat_item > *
{
	margin: 0 0.5rem;
}

.chat_item .photo_container
{
	width: 3rem;
	height: 3rem;
	flex-shrink: 0;
	flex-grow: 0;
	border-radius: 100%;
	overflow: hidden;
}

.chat_item .text
{
	width: 100%;
}

.chat_item .text > div
{
	display: flex;
	justify-content: space-between;
}

.chat_item p
{
	margin: 0;
}

.chat_item .name
{
	font-weight: 500;
}

.chat_item .updated_date
{
	font-size: 0.8rem;
	color: grey;
}

.chat_item .last_message
{
	font-size: 0.85rem;
	color: grey;
	margin-top: 0.125rem;
}

.create_chat_button
{
	position: fixed;
	bottom: 4rem;
	right: 1rem;
	padding: 0.5rem;
	width: 3.25rem;
	height: 3.25rem;
	background: #51A1FF;
	color: white;
	border-radius: 100%;
}

</style>