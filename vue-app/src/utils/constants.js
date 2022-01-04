export default {
	API_URL: `http://${window.location.hostname}:3000`,
	socketOptions(access_token)
	{
		return {
			transportOptions:
			{
				polling:
				{
					extraHeaders: { Authorization: `Bearer ${access_token}`,}
				}
			}
		}
	}
}