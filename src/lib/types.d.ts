/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface Post {
	title: string;
	author: string;
	createdAt: Date;
	content: string;
}

export interface User {
	id: string;
	name: string;
	username: string;
	createdAt: Date;
}

interface CustomResponse extends Response {
	json: () => Promise<{
		users?: User[];
		posts?: Post[];
		message?: string;
	}>;
}

interface CustomLoadInput extends LoadInput {
	fetch: (info: RequestInfo, init?: RequestInit) => Promise<CustomResponse>;
}
