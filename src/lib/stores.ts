import type { Posts, Users } from '$lib/types';
import { writable, Writable } from 'svelte/store';

interface PostStore {
	ids: string[];
	entities?: Posts;
}

interface UserStore {
	ids: string[];
	entities?: Users;
}

class MyFormStore {
	posts: Writable<PostStore>;
	users: Writable<UserStore>;
	constructor() {
		this.posts = writable({ ids: [], entities: undefined });
		this.users = writable({ ids: [], entities: undefined });
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
