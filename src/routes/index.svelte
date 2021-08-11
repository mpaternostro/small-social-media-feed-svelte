<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$lib/form';
	import { myFormStore } from '$lib/stores';
	import Post from '$lib/post/Post.svelte';

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
			const { post: apiPost } = await res.json();
			if (apiPost) {
				posts.addPost(apiPost);
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
	{#if $users.ids.length > 0 && $users.entities}
		<div class="form-input">
			<label for="userId">Author:</label>
			<div class="form-input--select">
				<select name="userId" bind:value={userId}>
					<option value="" />
					{#each $users.ids as userId}
						<option value={userId}>{$users.entities[userId].username}</option>
					{/each}
				</select>
			</div>
		</div>
	{:else}
		<div class="form-input">
			<label for="userId">Author:</label>
			<div class="form-input--select">
				<select name="userId" bind:value={userId}>
					<option value="">No users found</option>
				</select>
			</div>
		</div>
	{/if}
	<div class="form-input">
		<label for="content">Description:</label>
		<textarea name="content" bind:value={content} rows="3" />
	</div>
	<button disabled={!title || !userId || !content}>Submit</button>
</form>

<h1>Posts</h1>
{#if $posts.ids.length > 0}
	<ul>
		{#each $posts.ids as postId (postId)}
			<li in:fly={{ y: 50 }}>
				<Post
					title={$posts.entities[postId].title}
					username={$users.entities[$posts.entities[postId].userId].username}
					content={$posts.entities[postId].content}
					createdAt={$posts.entities[postId].createdAt}
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
