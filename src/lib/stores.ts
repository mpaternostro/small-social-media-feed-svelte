import type { APIPost, APIUser, Posts, Users } from '$lib/types';
import { writable, Writable } from 'svelte/store';
import { fromPostApiToPost, fromUserApiToUser } from './mappers/mappers';

interface PostStore {
	ids: string[];
	entities: Posts;
}

interface UserStore {
	ids: string[];
	entities: Users;
}

interface PostWritable<T> {
	addPost: addPostFunction;
	subscribe: Writable<T>['subscribe'];
	set: Writable<T>['set'];
}

interface UserWritable<T> {
	addUser: addUserFunction;
	subscribe: Writable<T>['subscribe'];
	set: Writable<T>['set'];
}

const { subscribe: subscribePosts, set: setPosts, update: updatePosts } = writable<PostStore>({
	ids: [],
	entities: {}
});
const { subscribe: subscribeUsers, set: setUsers, update: updateUsers } = writable<UserStore>({
	ids: [],
	entities: {}
});

type addPostFunction = (apiPost: APIPost) => void;
type addUserFunction = (apiUser: APIUser) => void;

const addPost: addPostFunction = (apiPost: APIPost): void => {
	const post = fromPostApiToPost(apiPost);
	updatePosts(({ ids, entities }) => ({
		ids: [post.id, ...ids],
		entities: { [post.id]: post, ...entities }
	}));
};

const addUser: addUserFunction = (apiUser: APIUser): void => {
	const user = fromUserApiToUser(apiUser);
	updateUsers(({ ids, entities }) => ({
		ids: [user.id, ...ids],
		entities: { [user.id]: user, ...entities }
	}));
};

class MyFormStore {
	posts: PostWritable<PostStore>;
	users: UserWritable<UserStore>;
	constructor() {
		this.posts = { subscribe: subscribePosts, set: setPosts, addPost };
		this.users = { subscribe: subscribeUsers, set: setUsers, addUser };
	}
}

// Export a singleton
export const myFormStore = new MyFormStore();
