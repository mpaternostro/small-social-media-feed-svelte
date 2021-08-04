<script lang="ts">
	import type { Post } from '$lib/types';
	export let title: Post['title'];
	export let author: Post['author'];
	export let createdAt: Post['createdAt'];
	export let content: Post['content'];
</script>

<article>
	<p class="title">{title}</p>
	<p class="subtitle"><em>by {author}</em> - {createdAt}</p>
	<p class="subtitle">{content}</p>
</article>

<style>
	article {
		background-color: var(--gray-background);
		padding: 1.25rem 2.5rem 1.25rem 1.5rem;
		margin-bottom: 1.5rem;
	}

	p {
		color: var(--text-color);
	}

	.title {
		font-weight: 600;
		font-size: 1.25rem;
		margin: 0;
	}

	.subtitle {
		margin-top: 0;
	}
</style>
