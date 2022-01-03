export default {
	/**
	 * Fix created_date, updated_date, date in messages
	 * Fix photo
	 * And sort
	 * @param chat 
	 */
	fixChat(chat, user_id)
	{
		chat.created_date = new Date(chat.created_date);
		chat.updated_date = new Date(chat.updated_date);
		chat.messages.map(message =>
		{
			message.date = new Date(message.date);
			return message;
		});
		if (!chat.is_group)
		{
			let other_user = chat.members.filter(member => member.id != user_id)[0];
			chat.name = other_user.username;
			chat.photo = other_user.photo;
		}
		return chat;
	}
};