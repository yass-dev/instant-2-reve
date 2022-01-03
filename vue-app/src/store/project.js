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
			axios.post(`${Constants.API_URL}/projects/${project_id}/members`)
			.then(res =>
			{
				
				resolve();
			})
			.catch(err =>
			{
				alert(err.status);
			})
		}
	}
};