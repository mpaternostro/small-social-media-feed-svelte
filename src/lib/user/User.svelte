<script lang="ts">
	export let name = '';
	export let username = '';
</script>

<article>
	<p>{name} @{username}</p>
</article>

<style>
	article {
		margin-bottom: 0.5rem;
		background-color: var(--gray-background);
	}

	p {
		padding: 0.75rem 1.25rem;
		margin: 0;
	}
</style>
