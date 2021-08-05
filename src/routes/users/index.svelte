<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { enhance } from '$lib/form';
	import { myFormStore } from '$lib/stores';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/users.json');

		if (res.ok) {
			const { users: initialUsers } = await res.json();
			const { users } = myFormStore;
			users.set(initialUsers);
			return {};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	const { users } = myFormStore;
</script>

<svelte:head>
	<title>Svelte Social Media Feed</title>
</svelte:head>

<h1>Users</h1>
<form
	action="http://localhost:8080/users/add"
	method="POST"
	use:enhance={{
		result: async (res, form) => {
			const { user } = await res.json();
			users.update((allUsers) => [...allUsers, user]);

			form.reset();
		}
	}}
>
	<label for="name">Please enter user real name</label>
	<input name="name" />
	<label for="username">Please enter username</label>
	<input name="username" />
	<button>Submit</button>
</form>
{#if $users.length > 0}
	{#each $users as user}
		<p>{user.name}</p>
	{/each}
{:else}
	<p>Did not found any users.</p>
{/if}

<style>
	h1 {
		color: var(--text-color);
	}
</style>
