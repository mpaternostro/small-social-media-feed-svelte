<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { myFormStore } from '$lib/stores';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		// const res = await fetch('/posts.json');

		// if (res.ok) {
		// const posts = await res.json();
		const initialPosts = [
			{
				title: 'You would never believe what happened to me!',
				author: 'Charly',
				createdAt: new Date('2021-08-04T19:09:54.511Z'),
				content: 'Last night I was playing with Ringo when he suddenly started behaving strangely.'
			},
			{
				title: "I can't stand this dog anymore!",
				author: 'Ringo',
				createdAt: new Date('2021-08-04T18:10:00.000Z'),
				content: 'Please help me get rid of Charly! 😡'
			}
		];
		const { posts } = myFormStore;
		posts.set(initialPosts);
		return {};
		// }

		// const { message } = await res.json();

		// return {
		// 	error: new Error(message)
		// };
	};
</script>

<script lang="ts">
	import Post from '$lib/post/Post.svelte';

	const { posts } = myFormStore;
</script>

<svelte:head>
	<title>Svelte Social Media Feed</title>
</svelte:head>

<h1>Posts</h1>
{#if $posts.length > 0}
	{#each $posts as post}
		<Post {...post} />
	{/each}
{:else}
	<p>Did not found any posts.</p>
{/if}

<style>
	h1 {
		color: var(--text-color);
	}
</style>
