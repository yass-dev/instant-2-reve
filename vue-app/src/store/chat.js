import Constants from '@/utils/constants.js';
import axios from 'axios';
import ChatService from '@/services/chat.service.js';

export default {
	namespaced: true,
	state: () =>
	{
		return {
			chats: [],

			// On create group to save between views
			tmp_group_members: []
		};
	},

	mutations:
	{
		SET_CHATS(state, chats)
		{
			state.chats = chats;
		},

		SET_GROUP_MEMBERS(state, members)
		{
			state.tmp_group_members = members;
		},

		ADD_MESSAGE(state, {chat_id, message})
		{
			let chat = state.chats.find(chat => chat.id == chat_id);
			if (chat)
				chat.messages.push(message);
		},

		ADD_CHAT(state, chat)
		{
			state.chats.push(chat);
		}
	},

	actions:
	{
		loadChats(store)
		{
			return new Promise((resolve, reject) =>
			{
				axios.get(`${Constants.API_URL}/chat`)
				.then(res =>
				{
					let chats = res.data;
					chats.map(chat => ChatService.fixChat(chat, store.rootState.user.id));
					store.commit('SET_CHATS', res.data);
					resolve();
				})
				.catch(err =>
				{
					reject(err);
				});
			});
		},

		createGroup(store, {users_id, name})
		{
			return new Promise((resolve, reject) =>
			{
				axios.post(`${Constants.API_URL}/chat/groups`, {name, users_id})
				.then(res =>
				{
					let group = res.data;
					chat = ChatService.fixChat(group, store.rootState.user_id);
					store.commit('ADD_CHAT', chat);
					resolve();
				})
				.catch(err =>
				{
					reject(err);
				})
			})
		},

		createDirect(store, user_id)
		{
			return new Promise((resolve, reject) =>
			{
				axios.post(`${Constants.API_URL}/chat/directs`, {user_id: user_id})
				.then(res =>
				{
					let direct = res.data;
					let chat = ChatService.fixChat(direct, store.rootState.user_id);
					store.commit('ADD_CHAT', chat);
					resolve(direct);
				})
				.catch(err =>
				{
					console.error(err);
					reject(err);
				})
			})
		},

		directExists(store, user_id)
		{
			let chat = store.state.chats.find(chat => chat.is_group == false && chat.members.findIndex(member => member.id == user_id) != -1);
			return (chat !== undefined ? chat : null);
		},
	},

	getters:
	{
		getChatById: (store) => (id) =>
		{
			return store.chats.find(chat => chat.id == id);
		}
	}
};