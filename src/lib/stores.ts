import type { Post, User } from '$lib/types';
import { writable, Writable } from 'svelte/store';

interface PostStore {
	ids: string[];
	entities: Post[];
}

interface UserStore {
	ids: string[];
	entities: User[];
}

class MyFormStore {
	posts: Writable<PostStore>;
	users: Writable<UserStore>;
	constructor() {
		this.posts = writable({ ids: [], entities: [] });
		this.users = writable({ ids: [], entities: [] });
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
