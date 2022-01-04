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
	}
}