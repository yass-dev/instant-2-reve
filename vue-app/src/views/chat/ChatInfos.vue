<script>
import BackButton from '../../components/BackButton.vue'
import BaseHeader from '../../components/BaseHeader.vue'

export default {
	components: { BaseHeader, BackButton },
	name: "ChatInfos",
	data()
	{
		return {
			id: this.$route.params.id,
			show_all_members: false,
			limit: 3,
		}
	},
	computed:
	{
		chat()
		{
			return this.$store.getters['chat/getChatById'](this.id);
		},

		chat_type()
		{
			return (this.chat.is_group ? "Groupe" : "Direct");
		},

		members()
		{
			let members_cpy = [...this.chat.members];
			return (this.show_all_members ? members_cpy : members_cpy.splice(0, this.limit));
		}
	},
}
</script>

<template>
	<div class="chat_infos">
		<BaseHeader>
			<BackButton/>
			<div class="title">{{ chat.name }}</div>
			<div></div>
		</BaseHeader>
		<section class="infos">
			<div class="photo_container">
				<img :src="chat.photo"/>
			</div>
			<h1>{{ chat.name }}</h1>
			<p>{{ chat_type }} - {{ chat.members.length }} participants</p>
		</section>
		<section class="members">
			<p>{{ chat.members.length }} participants</p>
			<div class="members_list">
				<router-link class="member" v-for="member in members" :to="`/users/${member.id}`">
					<div class="photo_container">
						<img :src="member.photo"/>
					</div>
					<div>{{ member.username }}</div>
				</router-link>
				<div class="show_members_button" @click="show_all_members = true" v-if="!show_all_members && chat.members.length - limit > 0">Tout voir ( {{ chat.members.length - limit }} )</div>
				<div class="show_members_button" @click="show_all_members = false" v-if="show_all_members && chat.members.length - limit > 0">Masquer</div>
			</div>
		</section>
		<section>
			<p class="leave_button">Quitter le groupe</p>
		</section>
	</div>
</template>

<style scoped>

.chat_infos
{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: rgb(245, 245, 245);
}

section
{
	background: white;
	margin-bottom: 1rem;
}

.section:last-child
{
	margin-bottom: 0;
}

.title
{
	font-size: 1.2rem;
	margin: 0 1rem;
}

.infos
{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}

.infos > *
{
	margin: 0;
}

.infos .photo_container
{
	width: 7rem;
	height: 7rem;
	max-width: 100%;
	border-radius: 100%;
	overflow: hidden;
	margin: 1rem 0;
}

h1
{
	font-size: 1.5rem;
	font-weight: normal;
	
}

.infos p
{
	color: rgb(140, 140, 140);
}

section.members
{
	padding: 0.5rem 1rem;
}

.member
{
	display: flex;
	align-items: center;
	padding: 0.75rem 0;
}

.member .photo_container
{
	width: 2.5rem;
	height: 2.5rem;
	margin-right: 1rem;
}

.show_members_button
{
	padding: 0.75rem 0;
	text-align: center;
	color: #51A1FF;
}

.leave_button
{
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgb(255, 50, 50);
}

</style>