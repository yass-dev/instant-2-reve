<script>

import axios from 'axios';

export default {
	name: "Login",
	data ()
	{
		return {
			publicPath: process.env.BASE_URL,
			username: "yass",
			password: "yass"
		}
	},
	methods:
	{
		login(e)
		{
			e.preventDefault();
			
			this.$store.dispatch('login', {username: this.username, password: this.password})
			.then(() =>
			{
				this.$router.push("/")
			})
			.catch(err =>
			{
				alert(err);
			});
		}
	}
}

</script>

<template>
	<form class="login" @submit="login($event)">
		<div class="avatar">
			<svg fill="currentColor" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"> <path d="M16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Z" transform="translate(0 0)"/> <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm7.9925,22.9258A5.0016,5.0016,0,0,0,19,20H13a5.0016,5.0016,0,0,0-4.9925,4.9258,12,12,0,1,1,15.985,0Z" transform="translate(0 0)"/> </svg>
		</div>
		<div class="field">
			<input type="text" v-model="username" ref="username_input" placeholder="Username" autocomplete/>
		</div>
		<div class="field">
			<input type="password" v-model="password" ref="password_input" placeholder="Password" autocomplete/>
		</div>
		<button class="login_button">Connexion</button>
	</form>
</template>


<style scoped>

.login
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: -webkit-fill-available;
	color: white;
	height: 100vh; /* Fallback for browsers that do not support Custom Properties */
	height: calc(var(--vh, 1vh) * 100);
	background: linear-gradient(45deg, rgb(108 81 255), rgb(81 191 255));
}

.avatar
{
	width: 5rem;
	margin: 1rem;
}

.field
{
	width: 80%;
	margin: 0.5rem 0;
}

.field input
{
	width: 100%;
	padding: 0.75rem 1.25rem;
	border: solid 1px white;
	outline: none;
	font-size: 1rem;
	color: inherit;
	background: transparent;
	border-radius: 2rem;
}

.field input::placeholder
{
	color: white;
}

.login_button
{
	padding: 0.75rem 2rem;
	outline: none;
	font-size: 1rem;
	background: white;
	color: #51A1FF;
	border: solid 1px transparent;
	border-radius: 2rem;
	margin-top: 0.75rem;
}

</style>