import type { APIPost, APIUser, Post, User } from '$lib/types';

export function fromPostApiToPost(post: APIPost): Post {
	return {
		...post,
		createdAt: new Date(post.createdAt)
	};
}

export function fromUserApiToUser(user: APIUser): User {
	return {
		...user,
		createdAt: new Date(user.createdAt)
	};
}
