<script>
import BaseHeader from '../BaseHeader.vue';

export default {
	components: { BaseHeader },
	name: "ChatListHeader",
	data()
	{
		return {
			search: ""
		}
	},
	methods:
	{
		back()
		{
			this.$router.go(-1);
		},

		emitSearch()
		{
			this.$emit('search', this.search);
		}
	}
}
</script>

<template>
	<div class="chat_list_header">
		<BaseHeader>
			<div class="title">
				Discussion
			</div>
			<div class="buttons_container">
				<label class="search_button">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"/></svg>
					<input type="text" v-model="search" @input="emitSearch()" placeholder="Rechercher..."/>
				</label>
				<div class="more_button">
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/></svg>
				</div>
			</div>
		</BaseHeader>
	</div>
</template>

<style scoped>

.title
{
	font-size: 1.2rem;
}

.buttons_container
{
	display: flex;
	width: -webkit-fill-available;
	justify-content: flex-end;
}

.more_button
{
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
}

.more_button
{
	margin-left: 0.5rem;
}

.search_button
{
	position: relative;
}

.search_button svg
{
	position: absolute;
	top: 0;
	right: 0;
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
}

.search_button input
{
	width: 2rem;
	font-family: inherit;
	font-size: 1rem;
	outline: none;
	background: transparent;
	color: inherit;
	border: none;
	border-bottom: solid 1px transparent;
	padding: 0 1.75rem 0.25rem 0.25rem;
}

.search_button input:focus
{
	width: -webkit-fill-available;;
	border-color: white;
}

.search_button input::placeholder
{
	color: white;
}

</style>