<script lang="ts">
	// your script goes here
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Posts</a></li>
			<li><a href="/users">Users</a></li>
			<li><a href="/notifications">Notifications</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		background-color: var(--emerald);
	}

	ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8rem;
		height: 3.25rem;
	}

	li:hover {
		background-color: var(--dark-emerald);
	}

	a {
		color: #fff;
	}
</style>
