class TestHandler extends Paged.Handler {
	constructor(chunker, polisher, caller) {
		super(chunker, polisher, caller);
	}

	afterPageLayout(pageFragment, page) {
		const targetAttribute = "tr-as-tbody";

		const allElements = document.querySelectorAll("tbody");

		// Create an array to store matching elements
		const matchingElements = [];

		console.log(allElements);

		// Loop through all elements and check their computed styles
		allElements.forEach((element) => {
			console.log(element.getAttribute(targetAttribute));
			// Check if the property matches the desired value
			if (element.getAttribute(targetAttribute) != undefined) {
				matchingElements.push(element);
			}
		});

		console.log(matchingElements);

		matchingElements.forEach((tbody) => {
			const trs = Array.from(tbody.getElementsByTagName("tr"));

			console.log(trs);

			trs.forEach((tr) => {
				console.log("yooooo");

				// Create a new node (container) to replace the moved element
				const newNode = document.createElement("tbody");

				console.log(newNode);
				console.log(tbody);
				console.log(tr);

				// Append the element to the new node

				// Replace the original element with the new node
				// parentElement.replaceChild(newNode, tr);
				newNode.appendChild(tr);
				tbody.parentNode.insertBefore(newNode, tbody);
			});

			tbody.remove();
		});
	}
}

Paged.registerHandlers(TestHandler);
