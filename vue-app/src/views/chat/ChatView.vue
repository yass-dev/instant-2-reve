<script>

import ChatViewHeader from '@/components/chat/ChatViewHeader.vue';
import Constants from '@/utils/constants.js';
import axios from 'axios';

export default {
	name: "ChatView",
	components: { ChatViewHeader },
	data()
	{
		return {
			id: this.$route.params.id,
			can_scroll_to_bottom: true,
			chat_endpoint: `${Constants.API_URL}/chat/${this.$route.params.id}`,
			message: "",
			images: [],
			files: [],
			download_url: "",
			download_filename: "",
		}
	},
	mounted()
	{
		this.setScollBarToBottom();
	},
	computed:
	{
		chat()
		{
			return this.$store.getters['chat/getChatById'](this.id);
		},

		messages()
		{
			return this.chat.messages.map((message) =>
			{
				if (message.type == 'image')
				{
					let url = `${this.chat_endpoint}/messages/${message.id}`;
					const headers = new Headers();
					headers.set('Authorization', `Bearer ${this.$store.state.access_token}`);
					fetch(url, { headers })
					.then(data =>
					{
						data.arrayBuffer()
						.then(buffer =>
						{
							let base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => (data + String.fromCharCode(byte)), ''));
							message.content = `data:image/png;base64,${base64}`;
							this.setScollBarToBottom();
						});
					});
				}
				return message;
			});
		}
	},
	watch:
	{
		'messages':
		{
			handler(old, val)
			{
				this.setScollBarToBottom();
			},
			deep: true
		}
	},
	methods:
	{
		convertBlobToBase64(blob)
		{
			return new Promise((resolve, reject) =>
			{
				const reader = new FileReader;
				reader.onerror = reject;
				reader.onload = () => {
					resolve(reader.result);
				};
				reader.readAsDataURL(blob);
			})
		},

		sendMessage(e)
		{
			e.preventDefault();

			if (this.images.length > 0)
				this.sendImageMessages();
			if (this.files.length > 0)
				this.sendFileMessages();
			if (this.message.trim().length > 0)
				this.sendTextMessage();
		},

		sendTextMessage()
		{
			axios.post(`${Constants.API_URL}/chat/${this.id}/messages`, {type: 'text', content: this.message})
			.then(res =>
			{
				this.message = "";
				this.can_scroll_to_bottom = true;
				this.setScollBarToBottom();
			})
			.catch(err =>
			{
				alert(err.response.data.message);
			})
		},

		sendImageMessages()
		{
			let formData = new FormData();
			for (let image of this.images)
				formData.append("images", image.file);
			axios.post(`${Constants.API_URL}/chat/${this.id}/messages/images`, formData,
			{
				headers: {
				'Content-Type': 'multipart/form-data'
				}
			})
			.then(res =>
			{
				this.images = [];
				this.can_scroll_to_bottom = true;
				this.setScollBarToBottom();
			})
			.catch(err =>
			{
				alert(err.response.data.message);
			})
		},

		sendFileMessages()
		{
			let formData = new FormData();
			for (let file of this.files)
				formData.append("files", file);
			axios.post(`${Constants.API_URL}/chat/${this.id}/messages/files`, formData,
			{
				headers: {
				'Content-Type': 'multipart/form-data'
				}
			})
			.then(res =>
			{
				this.files = [];
				this.can_scroll_to_bottom = true;
				this.setScollBarToBottom();
			})
			.catch(err =>
			{
				alert(err.response.data.message);
			})
		},

		setScollBarToBottom()
		{
			if (this.can_scroll_to_bottom && this.$refs.messages_view)
				window.setTimeout(() => (this.$refs.messages_view.scrollTop = this.$refs.messages_view.scrollHeight), 100);
		},

		handleMessagesScroll(e)
		{
			var scroll_height = e.currentTarget.scrollHeight;
			var scroll_top = e.currentTarget.scrollTop;
			var height = e.currentTarget.offsetHeight;
			if(height == 0 || scroll_top >= scroll_height - height)
				this.can_scroll_to_bottom = true;
			else
				this.can_scroll_to_bottom = false;
		},

		setImages(e)
		{
			this.images = [];
			for (let image of this.$refs.images_input.files)
			{
				this.images.push({
					file: image,
					url: URL.createObjectURL(image),
				});
			}
		},

		removeImage(index)
		{
			this.images.splice(index, 1);
		},

		setFiles(e)
		{
			this.files = [...this.$refs.files_input.files];
		},

		removeFile(index)
		{
			this.files.splice(index, 1);
		},

		downloadFile(message)
		{
			axios({
				url: `${this.chat_endpoint}/messages/${message.id}`, //your url
				method: 'GET',
				responseType: 'blob', // important
			})
			.then(response =>
			{
				this.download_url = window.URL.createObjectURL(new Blob([response.data]));
				this.download_filename = message.filename;
				window.setTimeout(() => this.$refs.download_link.click(), 1);
			});
		}
	},
}
</script>

<template>
	<div class="chat_view">
		<img class="background" src="./bg.png"/>
		<ChatViewHeader :chat="chat"/>
		<div class="messages_view" ref="messages_view" @scroll="handleMessagesScroll">
			<div class="message" :class="{me: message.sender.id == this.$store.state.user.id}" v-for="message in messages">
				<span v-if="message.type == 'text'">{{ message.content }}</span>
				<img :src="message.content" v-if="message.type == 'image'"/>
				<span v-if="message.type == 'file'">{{ message.filename }}</span>
				<div class="download_button" v-if="message.type == 'file'" @click="downloadFile(message)"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 20.5h13.498a.75.75 0 0 1 .101 1.493l-.101.007H5.25a.75.75 0 0 1-.102-1.494l.102-.006h13.498H5.25Zm6.633-18.498L12 1.995a1 1 0 0 1 .993.883l.007.117v12.59l3.294-3.293a1 1 0 0 1 1.32-.083l.094.084a1 1 0 0 1 .083 1.32l-.083.094-4.997 4.996a1 1 0 0 1-1.32.084l-.094-.083-5.004-4.997a1 1 0 0 1 1.32-1.498l.094.083L11 15.58V2.995a1 1 0 0 1 .883-.993L12 1.995l-.117.007Z"/></svg></div>
			</div>
		</div>
		<form @submit="sendMessage">
			<div class="preview_container" v-if="images.length > 0 || files.length > 0">
				<div class="images_preview" v-if="images.length > 0">
					<div class="image_container" v-for="(image, index) in images">
						<div class="close_button" @click="removeImage(index)">
							<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"> <path d="M165,0C120.926,0,79.492,17.163,48.328,48.327c-64.334,64.333-64.334,169.011-0.002,233.345 C79.49,312.837,120.926,330,165,330c44.072,0,85.508-17.163,116.672-48.328c64.334-64.334,64.334-169.012,0-233.345 C250.508,17.163,209.072,0,165,0z M239.246,239.245c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394 L165,186.213l-53.033,53.033c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394 c-5.859-5.857-5.859-15.355,0-21.213L143.787,165l-53.033-53.033c-5.859-5.857-5.859-15.355,0-21.213 c5.857-5.857,15.355-5.857,21.213,0L165,143.787l53.031-53.033c5.857-5.857,15.355-5.857,21.213,0 c5.859,5.857,5.859,15.355,0,21.213L186.213,165l53.033,53.032C245.104,223.89,245.104,233.388,239.246,239.245z"/> </svg>
						</div>
						<img :src="image.url"/>
					</div>
				</div>
				<div class="files_preview" v-if="files.length > 0">
					<div class="file" v-for="(file, index) in files">
						<span>{{ file.name }}</span>
						<div class="close_button" @click="removeFile(index)">
							<svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"> <path d="M165,0C120.926,0,79.492,17.163,48.328,48.327c-64.334,64.333-64.334,169.011-0.002,233.345 C79.49,312.837,120.926,330,165,330c44.072,0,85.508-17.163,116.672-48.328c64.334-64.334,64.334-169.012,0-233.345 C250.508,17.163,209.072,0,165,0z M239.246,239.245c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394 L165,186.213l-53.033,53.033c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394 c-5.859-5.857-5.859-15.355,0-21.213L143.787,165l-53.033-53.033c-5.859-5.857-5.859-15.355,0-21.213 c5.857-5.857,15.355-5.857,21.213,0L165,143.787l53.031-53.033c5.857-5.857,15.355-5.857,21.213,0 c5.859,5.857,5.859,15.355,0,21.213L186.213,165l53.033,53.032C245.104,223.89,245.104,233.388,239.246,239.245z"/> </svg>
						</div>
					</div>
				</div>
			</div>
			<div class="message_bar">
				<input type="text" class="message_input" v-model="message" placeholder="Message"/>
				<label class="camera_button">
					<input type="file" ref="images_input" accept="image/*" @change="setImages" multiple hidden/>
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>
				</label>
				<label class="attach_button">
					<input type="file" ref="files_input" @change="setFiles" multiple hidden/>
					<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 2a6 6 0 0 1 4.396 10.084l-.19.194-8.727 8.727-.053.05-.056.045a3.721 3.721 0 0 1-5.253-5.242l.149-.164.015-.011 7.29-7.304a1 1 0 0 1 1.416 1.413l-7.29 7.304-.012.008a1.721 1.721 0 0 0 2.289 2.553l.122-.1.001.001 8.702-8.7.159-.165a4 4 0 0 0-5.753-5.554l-.155.16-.018.012-9.326 9.33a1 1 0 0 1-1.414-1.415L11.6 3.913l.046-.043A5.985 5.985 0 0 1 16 2Z"/></svg>
				</label>
			</div>
			<button class="send_button">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z"/></svg>
			</button>
		</form>
		<a class="download_link" :href="download_url" ref="download_link" :download="download_filename"></a>
	</div>
</template>

<style scoped>

.chat_view
{
	display: flex;
	flex-direction: column;
	height: 100%;
}

.background
{
	position: absolute;
	top: 0;
	left: 0;
	/* background: #e5ddd5; */
	background: #52a1ff;
	opacity: 0.125;
	z-index: 0;
}

.messages_view
{
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 0 0.25rem;
	height: -webkit-fill-available;
	overflow: auto;
}

.message
{
	display: flex;
	align-items: center;
	background: white;
	box-shadow: 0 1px .5px rgba(0, 0, 0, .13);
	border-radius: 1rem;
	padding: 0.5rem 1rem;
	max-width: 90%;
	width: fit-content;
	margin: 0.25rem 0;
}

.message:not(.me)
{
	margin-right: auto;
	border-bottom-left-radius: 0;
}

.message.me
{
	background: #dcf8c6;
	margin-left: auto;
	border-bottom-right-radius: 0;
}

.message span
{
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

form
{
	display: flex;
	align-items: center;
	position: relative;
}

form .message_bar
{
	display: flex;
	align-items: center;
	border-radius: 2rem;
	padding: 0.5rem 1rem;
	background: white;
	margin: 0.25rem;
	width: calc(100% - 3rem);
}

.message_input
{
	width: -webkit-fill-available;
	border: none;
	font-size: 1rem;
	outline: none;
}

.camera_button,
.attach_button
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.75rem;
	height: 1.75rem;
	margin: 0 0.25rem;
}

.attach_button
{
	margin-right: 0;
}

.send_button
{
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	width: 2.25rem;
	height: 2.25rem;
	outline: none;
	border: none;
	border-radius: 100%;
	background: #52a1ff;
	color: white;
}

.preview_container
{
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(-100%);
	padding: 0.5rem 1rem;
	width: 100%;
}

.images_preview,
.files_preview
{
	display: flex;
	align-items: center;
	padding-top: 0.5rem;
	overflow-x: auto;
}

.images_preview .image_container
{
	position: relative;
	height: 3.5rem;
	margin: 0 0.5rem;
}

.images_preview .image_container:first-child
{
	margin-left: 0;
}

.preview_container .close_button
{
	position: absolute;
	top: 0;
	right: 0;
	width: 1rem;
	height: 1rem;
	transform: translate(50%, -50%);
	color: #52a1ff;
	background: white;
	border-radius: 100%;
}

.files_preview .file
{
	position: relative;
	padding: 0.125rem 0.5rem;
	border-radius: 1rem;
	background: #52a1ff;
	color: white;
	margin: 0 0.5rem;
}

.files_preview .file span
{
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: auto;
	max-width: 10rem;
}

.files_preview .file:first-child
{
	margin-left: 0;
}

.download_button
{
	background: #52a1ff;
	border-radius: 100%;
	padding: 0.25rem;
	width: 1.75rem;
	height: 1.75rem;
	color: white;
	flex: 0 0 auto;
	margin-left: 0.5rem;
}

.download_link
{
	display: none;
}

</style>