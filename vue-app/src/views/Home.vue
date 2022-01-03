<script>

import Header from '../components/Header.vue';

export default {
	name: "Home",
	components: { Header },
	data()
	{
		return {
			events:
			[
				{
					id: 0,
					date: new Date(),
					title: "Projet - Big Maraude à Dijon",
					description: "Big maraude le mardi 4 janvier a dijon, venez nombreux !!!!"
				},
			],
			projects:
			[
				{
					id: 0,
					date: new Date(),
					title: "Projet - Big Maraude à Dijon",
					description: "Big maraude le mardi 4 janvier a dijon, venez nombreux !!!!"
				}
			]
		}
	},
	mounted()
	{
		this.$store.dispatch('chat/loadChats');
		this.$store.dispatch('loadUsers')
		.catch(err =>
		{
			alert(err);
		});
	}
}
</script>

<template>
	<div>
		<Header></Header>
		<div class="home">
			<div class="frame">
				<p class="title">Agenda</p>
				<div class="item_list">
					<router-link to="/" class="item" v-for="event in events.concat(events)">
						<div class="date">
							<span class="number">{{ event.date.getDate() }}</span>
							<span class="month">{{ event.date.toLocaleString('default', { month: 'long' }) }}</span>
						</div>
						<div class="content">
							<p class="title">{{ event.title }}</p>
							<p class="description">{{ event.description }}</p>
						</div>
					</router-link>
				</div>
			</div>
			<div class="frame">
				<p class="title">Projets à venir</p>
				<router-link class="item_list" to="/">
					<div class="item" v-for="project in projects">
						<div class="date">
							<span class="number">{{ project.date.getDate() }}</span>
							<span class="month">{{ project.date.toLocaleString('default', { month: 'long' }) }}</span>
						</div>
						<div class="content">
							<p class="title">{{ project.title }}</p>
							<p class="description">{{ project.description }}</p>
						</div>
					</div>
				</router-link>
			</div>
			<div class="frame" id="message_frame">
				<p class="title">Messages récents</p>
				<router-link class="item_list" to="/">
					<div class="item" v-for="project in projects">
						<div class="date">
							<span class="number">{{ project.date.getDate() }}</span>
							<span class="month">{{ project.date.toLocaleString('default', { month: 'long' }) }}</span>
						</div>
						<div class="content">
							<p class="title">{{ project.title }}</p>
							<p class="description">{{ project.description }}</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>

.home
{
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem;
}

.frame
{
	padding: 1rem;
	width: calc(50% - 2rem);
	min-width: 15rem;
	max-width: 100%;
	background: white;
	margin: 0.5rem;
	flex-grow: 1;
	font-size: 0.9rem;
}

.frame p
{
	margin: 0;
}

.frame > .title
{
	font-size: 1.25rem;
	margin: 0;
	margin-bottom: 1rem;
}

.frame .item_list
{
	display: flex;
	flex-direction: column;
}

.frame .item
{
	display: flex;
	border: solid 1px #51A1FF;
	margin: 0.25rem 0;
}

.frame .date
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.25rem 0.5rem;
	width: 4rem;
	height: 4rem;
	background: #51A1FF;
	color: white;
	font-size: 0.8rem;
}

.frame .date .number
{
	font-size: 1.5rem;
}

.frame .content
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.125rem 0.25rem;
	width: calc(100% - 5rem);
}

.frame .content p
{
	margin: 0.125rem 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.frame .content .title
{
	font-size: 1.1rem;
}

.frame .description
{
	font-size: 0.85rem;
}

.frame#message_frame
{
	width: 100%;
}

@media screen and (max-width: 400px)
{
	.home
	{
		padding: 0.25rem;
	}
}

</style>
