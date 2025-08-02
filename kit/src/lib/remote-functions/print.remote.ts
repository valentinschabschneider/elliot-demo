import { form, query } from '$app/server';
import { env } from '$env/dynamic/public';
import * as elliot from '$lib/server/elliot';
import * as v from 'valibot';

const EXAMPLES = ['test'];

export const generatePdf = form(async (data) => {
	const example = data.get('example');

	if (!example || typeof example !== 'string' || !EXAMPLES.includes(example)) {
		throw new Error('Invalid example provided');
	}

	const exampleUrl = `${env.PUBLIC_ELLIOT_URL}/examples/${example}`;

	const job = await elliot.generatePdf(exampleUrl);

	return job;
});

export const checkStatus = query(v.string(), async (jobId) => {
	const status = await elliot.checkStatus(jobId);

	if (!status) {
		throw new Error('Failed to get status for job');
	}

	return status;
});
