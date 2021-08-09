import type { LoadInput } from '@sveltejs/kit';

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface Post {
	id: string;
	title: string;
	userId: string;
	createdAt: Date;
	content: string;
}

export interface Posts {
	[key: string]: Post;
}

export interface User {
	id: string;
	name: string;
	username: string;
	createdAt: Date;
}

export interface Users {
	[key: string]: User;
}

export interface APIPost {
	id: string;
	title: string;
	userId: string;
	createdAt: string;
	content: string;
}

export interface APIUser {
	id: string;
	name: string;
	username: string;
	createdAt: string;
}

interface CustomResponse extends Response {
	json: () => Promise<{
		users?: APIUser[];
		posts?: APIPost[];
		message?: string;
	}>;
}

interface CustomLoadInput extends LoadInput {
	fetch: (info: RequestInfo, init?: RequestInit) => Promise<CustomResponse>;
}
