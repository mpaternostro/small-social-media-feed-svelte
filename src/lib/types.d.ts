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
