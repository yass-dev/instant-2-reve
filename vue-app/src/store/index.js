import { createStore } from 'vuex';
import axios from 'axios';
import io from 'socket.io-client';

import Constants from '@/utils/constants.js';
import ProjectStore from '@/store/project.js';
import ChatStore from '@/store/chat.js';
import constants from '../utils/constants';
import ChatService from '@/services/chat.service';

export default createStore(
{
	state:
	{
		is_logged_in: false,
		access_token: null,

		chat_socket: null,

		// Logged in user
		user: {
			id: -1,
			username: "",
			email: "",
			photo: ""
		},
		users:
		[
			{
				id: 4,
				username: "Nao",
				biography: "Petit bio de test",
				photo: "https://pbs.twimg.com/media/EpRuRosWMAAXIy2.png",
			},
			{
				id: 5,
				username: "Adam",
				biography: "Test :)",
				photo: "https://pbs.twimg.com/media/EpRuRosWMAAXIy2.png",
			},
		]
	},

	mutations:
	{
		SET_LOGGED_IN(state, access_token)
		{
			state.is_logged_in = true;
			state.access_token = access_token
		},

		SET_USER(state, user)
		{
			state.user = user;
		},

		SET_USERS(state, users)
		{
			state.users = users;
		},

		SET_CHAT_SOCKET(state, socket)
		{
			state.chat_socket = socket;
		}
	},

	actions:
	{
		initSockets(store)
		{
			let socketOptions =
			{
				transportOptions:
				{
					polling:
					{
						extraHeaders: { Authorization: `Bearer ${store.state.access_token}`,}
					}
				}
			};

			let chat_socket = io(`${constants.API_URL}/chat`, socketOptions);

			chat_socket.on('new_chat', ({chat}) =>
			{
				chat = ChatService.fixChat(chat, store.state.user.id);
				store.commit('chat/ADD_CHAT', chat);
			})

			chat_socket.on('new_message', ({chat_id, message}) =>
			{
				store.commit('chat/ADD_MESSAGE', {chat_id, message});
			})

			store.commit("SET_CHAT_SOCKET", chat_socket);
		},

		disconnectSockets()
		{
			store.state.chat_socket.disconnect();
		},

		login(store, payload)
		{
			return new Promise((resolve, reject) =>
			{
				axios.post(`${Constants.API_URL}/auth/login`, payload)
				.then(res =>
				{
					store.commit("SET_LOGGED_IN", res.data.access_token);
					store.commit("SET_USER", res.data.user);
					store.dispatch('initSockets');
					resolve();
				})
				.catch(err =>
				{
					reject(err.response.data.message);
				})
			})
		},

		loadUsers(store)
		{
			return new Promise((resolve, reject) =>
			{
				axios.get(`${Constants.API_URL}/users`)
				.then(res =>
				{
					store.commit("SET_USERS", res.data);
					resolve();
				})
				.catch(err =>
				{
					reject(err.response.data.message);
				})
			})
		}
	},

	modules:
	{
		project: ProjectStore,
		chat: ChatStore
	}
})
