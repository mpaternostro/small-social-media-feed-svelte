<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { CustomLoadInput } from '$lib/types';
	import { reduceApiUsersToUsers, reduceApiPostsToPosts } from '$lib/mappers/mappers';
	import { myFormStore } from '$lib/stores';

	async function loadUsers({ fetch }: CustomLoadInput) {
		const res = await fetch('/users.json');

		if (res.ok) {
			const { users: initialApiUsers } = await res.json();
			if (initialApiUsers) {
				const initialUsers = initialApiUsers.reduce(reduceApiUsersToUsers, {});
				const { users } = myFormStore;
				users.set({
					ids: initialApiUsers.map(({ id }) => id),
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
				const initialPosts = initialApiPosts.reduce(reduceApiPostsToPosts, {});
				const { posts } = myFormStore;
				posts.set({
					ids: initialApiPosts.map(({ id }) => id),
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
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>
		<a href="https://github.com/mpaternostro/small-social-media-feed-svelte">Visit repository</a>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
