import { render, screen } from '@testing-library/svelte';
import { myFormStore } from '$lib/stores';
import Homepage from './index.svelte';

describe('Homepage', () => {
	beforeEach(() => {
		const { posts, users } = myFormStore;
		posts.set({ ids: [], entities: {} });
		users.set({ ids: [], entities: {} });
	});
	test('should render without any problems', () => {
		const { posts, users } = myFormStore;
		users.addUser({
			id: '40c0d320-fadc-11eb-ba49-7d6352667dd1',
			name: 'Test',
			username: 'Test1',
			createdAt: '2021-08-11T19:42:33.367Z'
		});
		posts.addPost({
			id: '45ad5a70-fadc-11eb-ba49-7d6352667dd1',
			title: 'Testing',
			userId: '40c0d320-fadc-11eb-ba49-7d6352667dd1',
			content: 'This is a test',
			createdAt: '2021-08-11T19:42:33.367Z'
		});
		render(Homepage);

		expect(screen.getByRole('heading', { name: 'Add New Post' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Test1' })).toBeInTheDocument();
	});

	test("should show default messages if there're no users and posts", () => {
		render(Homepage);

		expect(screen.getByRole('option', { name: 'No users found' })).toBeInTheDocument();
		expect(screen.getByText('Did not found any posts.')).toBeInTheDocument();
	});
});
