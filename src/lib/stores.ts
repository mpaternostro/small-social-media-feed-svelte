import type { Post, User } from '$lib/types';
import { writable, Writable } from 'svelte/store';

interface UserStore {
	ids: string[];
	entities: User[];
}

class MyFormStore {
	posts: Writable<Post[]>;
	users: Writable<UserStore>;
	constructor() {
		this.posts = writable([]);
		this.users = writable({ ids: [], entities: [] });
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
