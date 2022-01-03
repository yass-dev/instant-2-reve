<script>

import { mapState } from 'vuex'
import BackButton from '../../components/BackButton.vue';
import BaseHeader from '../../components/BaseHeader.vue';

export default {
	components: { BaseHeader, BackButton },
	name: "CreateChat",
	data()
	{
		return {
			search: "",
			selected_users: []
		}
	},
	computed:
	{
		...mapState(['users']),
		searched_users()
		{
			if (this.search.length == 0)
				return this.users;
			else
				return this.users.filter(user => user.username.toLowerCase().includes(this.search.toLowerCase()));
		},
	},
	methods:
	{
		selectUser(user)
		{
			let index = this.selected_users.findIndex(u => u.id == user.id);
			if (index == -1)
				this.selected_users.push(user);
			else
				this.selected_users.splice(index, 1);
		},
		async handleNext()
		{
			if (this.selected_users.length == 1)
			{
				let to = this.selected_users[0];
				let existing_chat = await this.$store.dispatch('chat/directExists', to.id);
				if (existing_chat === null)
					this.createDirectChat(to.id);
				else
					this.$router.push(`/chat/${existing_chat.id}`)
			}
			else
			{
				this.$store.commit('chat/SET_GROUP_MEMBERS', this.selected_users);
				this.$router.push({name: 'create_group', params: {users: this.selected_users}});
			}
		},

		createDirectChat(user_id)
		{
			this.$store.dispatch('chat/createDirect', user_id)
			.then(direct =>
			{
				this.$router.push(`/chat/${direct.id}`);
			})
			.catch(err =>
			{
				alert(err);
			})
		}
	}
}
</script>

<template>
	<div class="create_chat">
		<BaseHeader>
			<BackButton/>
			<div class="title">Nouvelle discussion</div>
		</BaseHeader>
		<div class="search_container">
			<input placeholder="Rechercher..." v-model="search" type="text"/>
		</div>
		<!-- <div class="item create_group_button">
			<div class="photo_container">
				<svg version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 310.746 310.746" style="enable-background:new 0 0 310.746 310.746;" xml:space="preserve"> <path id="XMLID_228_" d="M32.622,75.373c0,23.666,18.367,43.109,41.594,44.857c-7.382-13.302-11.594-28.596-11.594-44.857 s4.212-31.556,11.594-44.857C50.989,32.264,32.622,51.707,32.622,75.373z"/> <path id="XMLID_229_" d="M0,227.996c0,8.284,6.716,15,15,15h1.025c11.602-40.229,40.192-73.322,77.464-90.984 c-5.17-1.077-10.482-1.639-15.867-1.639C34.821,150.373,0,185.194,0,227.996z"/> <path id="XMLID_230_" d="M278.124,75.373c0-23.666-18.367-43.109-41.594-44.857c7.382,13.302,11.594,28.596,11.594,44.857 s-4.212,31.556-11.594,44.857C259.757,118.482,278.124,99.039,278.124,75.373z"/> <path id="XMLID_231_" d="M295.746,242.996c8.284,0,15-6.716,15-15c0-42.802-34.821-77.623-77.622-77.623 c-5.385,0-10.697,0.561-15.867,1.639c37.271,17.662,65.862,50.756,77.464,90.984H295.746z"/> <path id="XMLID_232_" d="M155.373,138.123c21.093,0,39.774-10.473,51.157-26.479c7.289-10.25,11.594-22.764,11.594-36.271 s-4.305-26.021-11.594-36.271c-11.383-16.006-30.064-26.479-51.157-26.479c-34.601,0-62.75,28.149-62.75,62.75 S120.772,138.123,155.373,138.123z"/> <path id="XMLID_233_" d="M270.373,283.123c0-14.107-2.56-27.627-7.229-40.127c-13.457-36.025-44.485-63.549-82.606-72.092 c-8.102-1.816-16.522-2.781-25.165-2.781c-63.411,0-115,51.589-115,115c0,8.284,6.716,15,15,15h200 C263.657,298.123,270.373,291.407,270.373,283.123z"/> </svg>
			</div>
			<div class="text">
				<p class="name">Nouveau groupe</p>
				<p class="biography"></p>
			</div>
		</div> -->
		<div class="item" :class="{selected: selected_users.find(u => u == user) !== undefined}"
			@click="selectUser(user)" v-for="user in searched_users">
			<div class="photo_container">
				<img :src="user.photo"/>
			</div>
			<div class="text">
				<p class="name">{{ user.username }}</p>
				<p class="biography">{{ user.biography }}</p>
			</div>
			<div class="selector">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"/></svg>
			</div>
		</div>
		<div class="next_button" @click="handleNext" v-if="selected_users.length > 0">
			<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z"/></svg>
		</div>
	</div>
</template>

<style scoped>

.create_chat
{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: -webkit-fill-available;
	overflow-y: auto;
	position: relative;
}

.title
{
	font-size: 1.2rem;
	width: 100%;
	margin-left: 1rem;
}

.search_container
{
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;
}

.search_container input
{
	font-size: 1rem;
	padding: 0.5rem;
	width: 100%;
	border: solid 1px #00000033;
	outline: none;
}

.create_chat .item
{
	display: flex;
	padding: 1rem;
	width: 100%;
	align-items: center;
}

.photo_container
{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	overflow: hidden;
}

.text
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1rem;
}

.text p
{
	margin: 0;
}

.item .name
{
	font-size: 1.05rem;
	font-weight: 500;
}

.item .biography
{
	font-size: 0.9rem;
	color: grey;
}

.item .selector
{
	margin-left: auto;
	display: flex;
	align-items: center;
	width: 1.25rem;
	height: 1.25rem;
	padding: 0.125rem;
	border-radius: 100%;
	align-self: center;
	border: solid 1px #00000033;
	color: white;
}

.item.selected .selector
{
	background: #52a1ff;
	border: none;
}

.item .selector svg
{
	display: none;
}

.item.selected .selector svg
{
	display: block;
}

.next_button
{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	padding: 0.625rem;
	color: white;
	background: #52a1ff;
}

</style>