import io from 'socket.io-client';
import Constants from '../utils/constants';

export default {
	fixProject(project)
	{
		project.start_date = new Date(project.start_date);
		project.end_date = new Date(project.end_date);
		project.steps.map(step =>
		{
			step.start_date = new Date(step.start_date);
			step.end_date = new Date(step.end_date);
			return step;
		})
		return project
	},

	initWebsocket(store)
	{
		let socket = io(`${Constants.API_URL}/project`, Constants.socketOptions(store.state.access_token));

		socket.on('new_project', project =>
		{
			project = this.fixProject(project);
			store.commit('project/ADD_PROJECT', project);
		});

		socket.on('update_project', project =>
		{
			project = this.fixProject(project);
			store.commit('project/SET_PROJECT', project);
		});
	
		store.commit("SET_PROJECT_SOCKET", socket);
	}
}