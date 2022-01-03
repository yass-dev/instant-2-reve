<script>
export default {
	name: "CollapsibleSection",
	props:
	{
		expanded:
		{
			type: Boolean,
			required: false,
			default: false
		},
		name:
		{
			type: String,
			required: true
		}
	},
	data()
	{
		return {
			collapsed: this.expanded == false,
			max_height: 0
		}
	},
	mounted()
	{
		if (!this.collapsed)
			this.max_height = this.$refs.content.scrollHeight + 'px';
	},
	methods:
	{
		collapse()
		{
			if (this.collapsed)
				this.max_height = this.$refs.content.scrollHeight + 'px';
			else
				this.max_height = 0
			this.collapsed = !this.collapsed;
		}
	}
}
</script>

<template>
	<section class="collapsible_section">
		<div class="header" @click="collapse()">
			<p>{{ name }}</p>
			<div class="expand_button">
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z"/></svg>
			</div>
		</div>
		<div class="content" ref="content" :style="{'max-height': max_height}">
			<slot></slot>
		</div>
	</section>
</template>

<style scoped>

.collapsible_section
{
	display: flex;
	flex-direction: column;
	width: 100%;
}

.header
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.5rem;
	font-size: 1.2rem;
}

.header p
{
	margin: 0.5rem 0;
}

.expand_button
{
	width: 1.25rem;
	height: 1.25rem;
	margin: 0 0.5rem;
}

.collapsible_section .content
{
	overflow: hidden;
	transition: all 0.25s;
}

</style>