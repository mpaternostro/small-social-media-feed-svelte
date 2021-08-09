import type { APIPost, Post, Posts, APIUser, User, Users } from '$lib/types';

interface PostAccumulator {
	[key: string]: Post;
}

interface UserAccumulator {
	[key: string]: User;
}

export function fromPostApiToPost(apiPost: APIPost): Post {
	return {
		...apiPost,
		createdAt: new Date(apiPost.createdAt)
	};
}

export function fromUserApiToUser(apiUser: APIUser): User {
	return {
		...apiUser,
		createdAt: new Date(apiUser.createdAt)
	};
}

export function reduceApiPostsToPosts(accum: PostAccumulator, currentValue: APIPost): Posts {
	const post = fromPostApiToPost(currentValue);
	return {
		...accum,
		[post.id]: post
	};
}

export function reduceApiUsersToUsers(accum: UserAccumulator, currentValue: APIUser): Users {
	const user = {
		...currentValue,
		createdAt: new Date(currentValue.createdAt)
	};
	return {
		...accum,
		[user.id]: user
	};
}
