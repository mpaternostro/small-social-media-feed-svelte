<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit';
	import type { User as UserType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { enhance } from '$lib/form';
	import { myFormStore } from '$lib/stores';

	interface UsersResponse extends Response {
		json: () => Promise<{
			users?: UserType[];
			message?: string;
		}>;
	}

	interface UserLoadInput extends LoadInput {
		fetch: (info: RequestInfo, init?: RequestInit) => Promise<UsersResponse>;
	}

	export const load: Load = async ({ fetch }: UserLoadInput) => {
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
					entities: [...entities, user],
					ids: [...ids, user.id]
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
{#if $users && $users.entities.length > 0}
	<ul>
		{#each $users.entities as user (user.id)}
			<li in:fly={{ y: 50 }}>
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

	.form-input {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	.form-input input {
		margin-top: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		border: 1px solid #d1d5db;
		width: 300px;
		font-size: 0.875rem;
	}

	.form-input input:hover {
		border: 1px solid #b5b5b5;
	}

	.form-input input:focus {
		outline-offset: -2px;
		outline: 2px solid transparent;
		border-color: var(--emerald);
		box-shadow: inset 0px 0px 1px #313131;
	}

	button {
		padding: 0.5rem 1rem;
		color: white;
		background-color: var(--blue);
		border: none;
		border-radius: 0.375rem;
	}

	button:hover {
		background-color: var(--dark-blue);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	ul {
		width: fit-content;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
