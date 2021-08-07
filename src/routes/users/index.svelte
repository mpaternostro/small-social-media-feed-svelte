<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { CustomLoadInput } from '$lib/types';
	import { myFormStore } from '$lib/stores';

	export const load: Load = async ({ fetch }: CustomLoadInput) => {
		const res = await fetch('/users.json');

		if (res.ok) {
			const { users: initialUsers } = await res.json();
			const { users } = myFormStore;
			if (initialUsers) {
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
	};
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$lib/form';
	import User from '$lib/user/User.svelte';

	const { users } = myFormStore;
	let name = '';
	let username = '';
</script>

<svelte:head>
	<title>Users - Svelte Social Media Feed</title>
</svelte:head>

<h1>Add new user</h1>
<form
	action="http://localhost:8080/users/add"
	method="POST"
	autocomplete="off"
	use:enhance={{
		result: async (res) => {
			const { user } = await res.json();
			if (user) {
				users.update(({ entities, ids }) => ({
					entities: [user, ...entities],
					ids: [user.id, ...ids]
				}));
			}

			name = '';
			username = '';
		}
	}}
>
	<div class="form-input">
		<label for="name">Real name:</label>
		<input name="name" bind:value={name} required />
	</div>
	<div class="form-input">
		<label for="username">Username:</label>
		<input name="username" bind:value={username} required />
	</div>
	<button disabled={!name || !username}>Submit</button>
</form>

<h1>Users</h1>
{#if $users.entities.length > 0}
	<ul>
		{#each $users.entities as user (user.id)}
			<li in:fly={{ y: -50 }}>
				<User name={user.name} username={user.username} />
			</li>
		{/each}
	</ul>
{:else}
	<p>Did not found any users.</p>
{/if}

<style>
	h1 {
		color: var(--text-color);
	}

	ul {
		width: fit-content;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
