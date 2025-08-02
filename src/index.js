export default {
	async fetch(request, env) {
		function addWatermark(htmlContent, watermarkText) {
			// Create the watermark HTML
			const watermarkHtml = `
			    <div style="
						position: fixed;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%) rotate(-45deg);
						font-size: 100px;
						color: rgba(0, 0, 0, 0.1);
						pointer-events: none;
						z-index: 9999;
						user-select: none;
						white-space: nowrap;
					">
							${watermarkText}
					</div>
			`;

			// Insert the watermark before the closing </body> tag
			const bodyCloseTag = "</body>";
			if (htmlContent.includes(bodyCloseTag)) {
				return htmlContent.replace(bodyCloseTag, watermarkHtml + bodyCloseTag);
			} else {
				// If the </body> tag is missing, append to the end of the file
				return htmlContent + watermarkHtml;
			}
		}

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
				body = addWatermark(await request.text(), "Elliot Demo");
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
