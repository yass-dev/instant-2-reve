<script>
export default {
	name: "SideBar",
}
</script>

<template>
	<div class="side_bar">
		<router-link class="link" to="/files">
			<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 3C4.23122 3 3 4.23122 3 5.75V10.4325C3.52243 10.1564 4.11795 10 4.75 10H10.25C12.3211 10 14 11.6789 14 13.75V19.25C14 19.882 13.8436 20.4776 13.5675 21H18.25C19.7688 21 21 19.7688 21 18.25V8H13.25C12.0074 8 11 6.99264 11 5.75V3H5.75Z"/><path d="M12.5 3V5.75C12.5 6.16421 12.8358 6.5 13.25 6.5H21V5.75C21 4.23122 19.7688 3 18.25 3H12.5Z"/><path d="M10.5 14.5C10.5 15.0523 10.0523 15.5 9.5 15.5C8.94771 15.5 8.5 15.0523 8.5 14.5C8.5 13.9477 8.94771 13.5 9.5 13.5C10.0523 13.5 10.5 13.9477 10.5 14.5Z"/><path d="M5.25 11C3.45507 11 2 12.4551 2 14.25V18.75C2 20.5449 3.45507 22 5.25 22H9.75C11.5449 22 13 20.5449 13 18.75V14.25C13 12.4551 11.5449 11 9.75 11H5.25ZM3.5 14.25C3.5 13.2835 4.2835 12.5 5.25 12.5H9.75C10.7165 12.5 11.5 13.2835 11.5 14.25V18.75C11.5 18.9563 11.4643 19.1543 11.3987 19.3381L9.09099 17.0303C8.21231 16.1517 6.78769 16.1517 5.90901 17.0303L3.60127 19.3381C3.5357 19.1543 3.5 18.9563 3.5 18.75V14.25ZM4.66193 20.3987L6.96967 18.091C7.26256 17.7981 7.73743 17.7981 8.03033 18.091L10.3381 20.3987C10.1543 20.4643 9.9563 20.5 9.75 20.5H5.25C5.04369 20.5 4.84572 20.4643 4.66193 20.3987Z"/></svg>
			<span>Fichiers</span>
		</router-link>
		<router-link class="link" to="/projects">
			<svg fill="currentColor" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="🔍-Product-Icons" stroke="none" stroke-width="1"> <g> <path d="M25,9.5 L25,21.75 C25,23.5449254 23.5449254,25 21.75,25 L6.25,25 C4.45507456,25 3,23.5449254 3,21.75 L3,9.5 L25,9.5 Z M21.75,3 C23.5449254,3 25,4.45507456 25,6.25 L25,8 L3,8 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L21.75,3 Z"></path> </g> </g> </svg>
			<span>Projets</span>
		</router-link>
		<router-link class="link" to="/">
			<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28" version="1.1">> <path d="M12.5921,3.49787 C13.4147,2.83801 14.5853,2.83801 15.4079,3.49787 L23.1579,9.71462 C23.6902,10.1417 24,10.7872 24,11.4697 L24,22.75 C24,23.9926 22.9926,25 21.75,25 L19.25,25 C18.0074,25 17,23.9926 17,22.75 L17,16.25 C17,15.8358 16.6642,15.5 16.25,15.5 L11.75,15.5 C11.3358,15.5 11,15.8358 11,16.25 L11,22.75 C11,23.9926 9.99264,25 8.75,25 L6.25,25 C5.00736,25 4,23.9926 4,22.75 L4,11.4697 C4,10.7872 4.30976,10.1417 4.84212,9.71462 L12.5921,3.49787 Z"/> </svg>
			<span>Home</span>
		</router-link>
		<router-link class="link" to="/chat">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1" fill="currentColor"> <path d="M43,16.976 L43,33.75 C43,36.6494949 40.6494949,39 37.75,39 L10.25,39 C7.35050506,39 4.99976748,36.6494949 4.99976748,33.75 L4.99976748,16.976 L23.3976016,27.0952699 C23.7727049,27.3015767 24.2272951,27.3015767 24.6023984,27.0952699 L43,16.976 Z M37.75,9 C40.6074055,9 42.9316438,11.2827599 42.9985196,14.1240842 L24,24.573411 L5.00176748,14.124 L5.00437905,14.0335954 C5.11786837,11.2344489 7.42299244,9 10.25,9 L37.75,9 Z"/> </svg>
			<span>Messages</span>
		</router-link>
		<router-link class="link" to="/profile">
			<svg fill="currentColor" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M35.7502,28 C38.0276853,28 39.8876578,29.7909151 39.9950978,32.0427546 L40,32.2487 L40,33 C40,36.7555 38.0583,39.5669 35.0798,41.3802 C32.1509,43.1633 28.2139,44 24,44 C19.7861,44 15.8491,43.1633 12.9202,41.3802 C10.0319285,39.6218485 8.11862909,36.9249713 8.00532378,33.3388068 L8,33 L8,32.2489 C8,29.9703471 9.79294995,28.1122272 12.0440313,28.0048972 L12.2499,28 L35.7502,28 Z M24,4 C29.5228,4 34,8.47715 34,14 C34,19.5228 29.5228,24 24,24 C18.4772,24 14,19.5228 14,14 C14,8.47715 18.4772,4 24,4 Z" id="🎨-Color"></path></svg>
			<span>Profile</span>
		</router-link>
	</div>
</template>

<style scoped>

.side_bar
{
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	flex-shrink: 0;
	width: 4.5rem;
	height: 100vh;
	background: #51A1FF;
	color: rgba(255, 255, 255, 0.75);
	padding: 2rem 0;
	z-index: 1;
}

.link
{
	width: 2.25rem;
	height: 2.25rem;
}

@media screen and (max-width: 550px)
{
	.side_bar
	{
		position: sticky;
		top: unset;
		bottom: 0;
		right: 0;
		flex-direction: row;
		width: 100%;
		height: fit-content;
		padding: 0.5rem;
		padding-bottom: 0;
	}

	.link
	{
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: inherit;
		width: 3rem;
		height: 3rem;
		overflow: hidden;
		border-top-left-radius: 100%;
    	border-top-right-radius: 100%;
		transition: all 0.25s, opacity 0.125s, transform cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s;
	}

	.link svg
	{
		width: 1.75rem;
		height: 1.75rem;
		margin-bottom: 1rem;
	}

	.link.router-link-active
	{
		color: white;
		transform: translateY(-1rem);
		padding-top: 0.25rem;
		height: 3.25rem;
		overflow: visible;
	}

	.link span
	{
		position: absolute;
		display: block;
		bottom: -2rem;
		opacity: 0;
		transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	
	.link.router-link-active span
	{
		bottom: -0.25rem;
		opacity: 1;
	}
}

@media screen and (max-height: 350px) and (min-width: 550px)
{
	.side_bar
	{
		padding: 0;
	}
}

</style>
