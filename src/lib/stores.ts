import type { Post } from '$lib/types';
import { writable, Writable } from 'svelte/store';

class MyFormStore {
	posts: Writable<Post[]>;
	constructor() {
		this.posts = writable([]);
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
