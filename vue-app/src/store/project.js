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
	}
};