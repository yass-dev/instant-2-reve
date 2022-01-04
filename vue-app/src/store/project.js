import Constants from '@/utils/constants.js';
import ProjectService from '@/services/project.service.js';
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
				let projects = res.data.map(ProjectService.fixProject);
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
					let project = ProjectService.fixProject(res.data);
					store.commit('SET_PROJECT', {project_id, project})
					resolve();
				})
				.catch(err =>
				{
					if (err.response)
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
					let project = ProjectService.fixProject(res.data);
					store.commit('SET_PROJECT', {project_id, project})
					resolve();
				})
				.catch(err =>
				{
					if (err.response)
						reject(err.response.data.message);
					else
						reject("Unknown error");
				})
			})
		},

		addFeedback(store, {project_id, note, comment, is_anonyme})
		{
			return new Promise((resolve, reject) =>
			{
				axios.post(`${Constants.API_URL}/projects/${project_id}/feedbacks`, {note, comment, is_anonyme})
				.then(res =>
				{
					let project = ProjectService.fixProject(res.data);
					store.commit('SET_PROJECT', {project_id, project})
					resolve();
				})
				.catch(err =>
				{
					if (err.response)
						reject(err.response.data.message);
					else
						reject("Unknown error");
				})
			})
		}
	}
};