export default {
	async fetch(request, env) {
		const { pathname, searchParams } = new URL(request.url);

		let url = env.ELLIOT_URL;
		let method = null;
		let body = null;

		if (pathname.includes("/print")) {
			url +=
				pathname + "?" + "outputType" + "=" + searchParams.get("outputType");

			if (searchParams.get("page")) {
				url +=
					"&url=" +
					"https://elliot-demo.pages.dev" +
					"/" +
					searchParams.get("page") +
					"&injectPolyfill=" +
					"false";
			} else {
				body = await request.text();
				url += "&injectPolyfill=" + "true";
			}

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
				"Content-Type": "text/html",
			},
			body: body,
		};

		const response = await fetch(url, init);

		return response;
	},
};
