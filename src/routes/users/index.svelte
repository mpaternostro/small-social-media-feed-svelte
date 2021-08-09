<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$lib/form';
	import { myFormStore } from '$lib/stores';
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
{#if $users.ids.length > 0 && $users.entities}
	<ul>
		{#each $users.ids as userId (userId)}
			<li in:fly={{ y: -50 }}>
				<User name={$users.entities[userId].name} username={$users.entities[userId].username} />
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
