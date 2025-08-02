import { error } from '@sveltejs/kit';
// import test from '$lib/docs/test.md'

export async function load({ params, parent }) {
	try {
		const posts = await parent();
		const post = posts.find((p) => p.slug === params.slug);

		if (!post) throw new Error('Post not found');

		return {
			content: post
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
