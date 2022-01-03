import Constants from '@/utils/constants.js';
import axios from 'axios';

export default {
	namespaced: true,
	state: () =>
	{
		return {
			projects: [],
		};
	},

	mutations:
	{
		SET_PROJECTS(state, projects)
		{
			state.projects = projects;
		},

		SET_PROJECT(state, {project_id, project})
		{
			let index = state.projects.findIndex(project => project.id == project_id);
			if (index !== -1)
				state.projects[index] = project;
		}
	},

	actions:
	{
		load(store)
		{
			axios.get(`${Constants.API_URL}/projects`)
			.then(res =>
			{
				let projects = res.data.map(project =>
				{
					project.start_date = new Date(project.start_date);
					project.end_date = new Date(project.end_date);
					return project;
				});
				store.commit("SET_PROJECTS", projects);
			})
		},

		subscribe(store, project_id)
		{
			return new Promise((resolve, reject) =>
			{
				axios.post(`${Constants.API_URL}/projects/${project_id}/members`)
				.then(res =>
				{
					store.commit('SET_PROJECT', {project_id, project: res.data})
					resolve();
				})
				.catch(err =>
				{
					if (err.response.data)
						reject(err.response.data.message);
					else
						reject("Unknown error");
				})
			})
		},

		unsubscribe(store, project_id)
		{
			return new Promise((resolve, reject) =>
			{
				axios.delete(`${Constants.API_URL}/projects/${project_id}/members`)
				.then(res =>
				{
					store.commit('SET_PROJECT', {project_id, project: res.data})
					resolve();
				})
				.catch(err =>
				{
					if (err.response.data)
						reject(err.response.data.message);
					else
						reject("Unknown error");
				})
			})
		},
	}
};