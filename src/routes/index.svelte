<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { CustomLoadInput } from '$lib/types';
	import { myFormStore } from '$lib/stores';

	async function loadUsers({ fetch }: CustomLoadInput) {
		const res = await fetch('/users.json');

		if (res.ok) {
			const { users: initialApiUsers } = await res.json();
			if (initialApiUsers) {
				const initialUsers = initialApiUsers.map(fromUserApiToUser);
				const { users } = myFormStore;
				users.set({
					ids: initialUsers.map(({ id }) => id),
					entities: initialUsers
				});
			}
			return {};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	}

	async function loadPosts({ fetch }: CustomLoadInput) {
		const res = await fetch('/posts.json');

		if (res.ok) {
			const { posts: initialApiPosts } = await res.json();
			if (initialApiPosts) {
				const initialPosts = initialApiPosts.map(fromPostApiToPost);
				const { posts } = myFormStore;
				posts.set({
					ids: initialPosts.map(({ id }) => id),
					entities: initialPosts
				});
			}
			return {};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	}

	export const load: Load = async (loadInput: CustomLoadInput) => {
		const users = await loadUsers(loadInput);
		if (users.error) {
			return users;
		}
		const posts = await loadPosts(loadInput);
		if (posts.error) {
			return posts;
		}
		return {};
	};
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$lib/form';
	import Post from '$lib/post/Post.svelte';
	import { fromPostApiToPost, fromUserApiToUser } from '$lib/mappers/mappers';

	const { posts, users } = myFormStore;
	let title = '';
	let userId = '';
	let content = '';
</script>

<svelte:head>
	<title>Posts - Svelte Social Media Feed</title>
</svelte:head>

<h1>Add New Post</h1>
<form
	action="http://localhost:8080/posts/add"
	method="POST"
	autocomplete="off"
	use:enhance={{
		result: async (res) => {
			const { post } = await res.json();
			if (post) {
				posts.update(({ entities, ids }) => ({
					entities: [post, ...entities],
					ids: [post.id, ...ids]
				}));
			}

			title = '';
			userId = '';
			content = '';
		}
	}}
>
	<div class="form-input">
		<label for="title">Post Title:</label>
		<input name="title" bind:value={title} placeholder="What's on your mind?" />
	</div>
	<div class="form-input">
		<label for="userId">Author:</label>
		<div class="form-input--select">
			<select name="userId" bind:value={userId}>
				<option value="" />
				{#each $users.entities as user}
					<option value={user.id}>{user.username}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="form-input">
		<label for="content">Description:</label>
		<textarea name="content" bind:value={content} rows="3" />
	</div>
	<button disabled={!title || !userId || !content}>Submit</button>
</form>

<h1>Posts</h1>
{#if $posts.entities.length > 0}
	<ul>
		{#each $posts.entities as post}
			<li in:fly={{ y: 50 }}>
				<Post
					title={post.title}
					username={$users.entities.find(({ id }) => id === post.userId)?.username}
					content={post.content}
					createdAt={post.createdAt}
				/>
			</li>
		{/each}
	</ul>
{:else}
	<p>Did not found any posts.</p>
{/if}

<style>
	h1 {
		color: var(--text-color);
	}

	input,
	textarea {
		width: 100%;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
