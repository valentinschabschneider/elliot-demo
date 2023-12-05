export default {
	async fetch(request, env) {
		const { pathname, searchParams } = new URL(request.url);

		let url = env.ELLIOT_URL;
		let method = null;

		if (pathname.includes("/print")) {
			url +=
				pathname +
				"?" +
				"outputType" +
				"=" +
				searchParams.get("outputType") +
				"&url=" +
				"https://elliot-demo.pages.dev" +
				"/" +
				searchParams.get("page") +
				"&injectPolyfill=" +
				"false";

			method = "POST";
		}

		if (pathname.includes("/jobs")) {
			url += "/print/soon" + pathname;

			method = "GET";
		}

		const init = {
			method: method,
			headers: {
				"X-API-KEY": env.ELLIOT_API_KEY,
			},
		};

		const response = await fetch(url, init);

		return response;
	},
};
