import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import store from '@/store/index.js';
import Login from '@/views/Login.vue';
import ProjectBase from '@/views/projects/ProjectBase.vue';
import ProjectListView from '../views/projects/ProjectListView.vue';
import CreateProjectView from '../views/projects/CreateProjectView.vue';
import ProjectView from '../views/projects/ProjectView.vue';
import ChatList from '../views/chat/ChatList.vue';
import ChatView from '../views/chat/ChatView.vue';
import CreateChat from '../views/chat/CreateChat.vue';
import CreateGroup from '../views/chat/CreateGroup.vue';
import ChatInfos from '../views/chat/ChatInfos.vue';
import ChatBase from '../views/chat/ChatBase.vue';
import UserView from '../views/UserView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { requiresAuth: true }
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { requiresAuth: false }
	},
	{
		path: '/register',
		name: 'Register',
		meta: { requiresAuth: false }
	},
	{
		path: '/projects',
		name: 'projects',
		component: ProjectBase,
		meta: { requiresAuth: true },
		children:
		[
			{
				path: '',
				name: "ProjectList",
				component: ProjectListView,
				meta: { requiresAuth: true }
			},
			{
				path: 'new',
				name: 'CreateProjectView',
				component: CreateProjectView,
				meta: { requiresAuth: true }
			},
			{
				path: ':id',
				name: 'ProjectView',
				component: ProjectView,
				props: true,
				meta: { requiresAuth: true }
			},
		]
	},
	{
		path: '/chat',
		name: 'chat',
		component: ChatBase,
		meta: { requiresAuth: true },
		children:
		[
			{
				path: '',
				name: 'ChatList',
				component: ChatList,
				meta: { requiresAuth: true }
			},
			{
				path: ':id',
				name: 'chat_view',
				component: ChatView,
				meta: { requiresAuth: true }
			},
			{
				path: ':id/infos',
				name: 'chat_infos',
				component: ChatInfos,
				meta: { requiresAuth: true }
			},
			{
				path: 'new',
				name: 'create_chat',
				component: CreateChat,
				meta: { requiresAuth: true }
			},
			{
				path: 'new/group',
				name: 'create_group',
				component: CreateGroup,
				meta: { requiresAuth: true },
				props: true
			},
		]
	},
	{
		path: '/users/:id',
		name: 'user_view',
		component: UserView,
		meta : { requiresAuth: true }
	},
	{
		path: '/files',
		name: 'files',
		component: Home,
		meta: { requiresAuth: true }
	},
	{
		path: '/profile',
		name: 'profile',
		component: Home,
		meta: { requiresAuth: true }
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: routes
});

router.beforeEach((to, from, next) =>
{
	if (to.matched.some(record => record.meta.requiresAuth))
	{
		if (!store.state.is_logged_in)
			next('/login');
		else
			next();
	}
	else
		next();
})

export default router
