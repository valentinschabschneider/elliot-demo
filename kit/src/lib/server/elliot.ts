import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

async function generatePdf(url: string) {
	console.log('Generating PDF for URL:', url);

	const requestUrl = new URL(`${publicEnv.PUBLIC_ELLIOT_URL}/print/soon`);

	requestUrl.searchParams.append('outputType', 'pdf');
	requestUrl.searchParams.append('url', url);
	requestUrl.searchParams.append('injectPolyfill', 'false');

	return fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': privateEnv.ELLIOT_API_KEY
		}
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
			}

			return (await response.json()) as {
				id: string;
			};
		})
		.catch((error) => {
			// Handle errors
			console.error('Error generating PDF:', error);

			throw error; // Re-throw the error to be handled by the caller
		});
}

async function checkStatus(jobId: string) {
	const requestUrl = new URL(`${publicEnv.PUBLIC_ELLIOT_URL}/print/soon/jobs/${jobId}`);

	return fetch(requestUrl, {
		method: 'GET',
		headers: {
			'X-API-KEY': privateEnv.ELLIOT_API_KEY
		}
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(`Failed to check status: ${response.status} ${response.statusText}`);
			}

			return (await response.json()) as {
				state: string;
				error?: string;
			};
		})
		.catch((error) => {
			// Handle errors
			console.error('Error checking status:', error);

			throw error; // Re-throw the error to be handled by the caller
		});
}

async function collectPDF() {
	const requestUrl = new URL(`${publicEnv.PUBLIC_ELLIOT_URL}/print/soon/jobs/<id>/collect`);

	return fetch(requestUrl, {
		method: 'GET',
		headers: {
			'X-API-KEY': privateEnv.ELLIOT_API_KEY
		}
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
			}

			return new Response(await response.arrayBuffer(), {
				headers: {
					'Content-Type': 'application/pdf',
					'Content-Disposition': 'attachment; filename="generated.pdf"'
				}
			});
		})
		.catch((error) => {
			// Handle errors
			console.error('Error generating PDF:', error);
		});
}

export { checkStatus, generatePdf };
