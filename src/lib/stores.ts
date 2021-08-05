import type { Post, User } from '$lib/types';
import { writable, Writable } from 'svelte/store';

class MyFormStore {
	posts: Writable<Post[]>;
	users: Writable<User[]>;
	constructor() {
		this.posts = writable([]);
		this.users = writable([]);
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
