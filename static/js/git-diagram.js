var cumulativeOffset = function (element) {
	var top = 0,
		left = 0;

	// Store the width and height of the first element
	var initialWidth = element.offsetWidth || 0;
	var initialHeight = element.offsetHeight || 0;

	do {
		// Check if the current element has the class 'slides'
		if (element.classList && element.classList.contains("slides")) {
			break; // Stop if the class 'slides' is found
		}

		// Accumulate top and left values
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;

		element = element.offsetParent;
	} while (element);

	// The bottom and right are based on the initial element's dimensions
	var bottom = top + initialHeight;
	var right = left + initialWidth;

	return {
		top: top,
		left: left,
		bottom: bottom,
		right: right,
	};
};

// Function to position the arrow between two elements
function positionArrowBetweenElements(startElem, endElem, arrowElem) {
	// Get positions of the two elements
	var posA = cumulativeOffset(startElem);
	var posB = cumulativeOffset(endElem);

	// Calculate the horizontal midpoint and distance between startElem and endElem
	var middleY = (posA.top + posA.bottom) / 2 + window.scrollY; // Add vertical scroll offset
	var distanceX = posB.left - posA.right;

	// Check if the arrow should point to the left or right
	if (distanceX >= 0) {
		// Right-facing arrow
		arrowElem.style.width = distanceX + "px";
		arrowElem.style.left = posA.right + window.scrollX + "px"; // Add horizontal scroll offset
		arrowElem.style.top = middleY - arrowElem.offsetHeight / 2 + "px";
		arrowElem.classList.remove("left-arrow"); // Remove left arrow class if present
		arrowElem.classList.add("right-arrow"); // Add right arrow class
	} else {
		// Left-facing arrow
		distanceX = posA.left - posB.right; // Calculate the distance for the left-facing arrow
		arrowElem.style.width = distanceX + "px";
		arrowElem.style.left = posB.right + window.scrollX + "px"; // Position from the left element
		arrowElem.style.top = middleY - arrowElem.offsetHeight / 2 + "px";
		arrowElem.classList.remove("right-arrow"); // Remove right arrow class if present
		arrowElem.classList.add("left-arrow"); // Add left arrow class
	}
}

function setupArrows(arrows) {
	function updateArrows() {
		// Update arrows for each arrow element
		arrows.forEach(function (arrowName) {
			const arrow = document.getElementById(arrowName);
			const arrowStart = document.getElementById(arrowName + "-start");
			const arrowEnd = document.getElementById(arrowName + "-end");

			positionArrowBetweenElements(arrowStart, arrowEnd, arrow);
		});
	}

	// Recalculate the arrows' positions when the window is resized or scrolled
	window.addEventListener("resize", updateArrows);
	window.addEventListener("scroll", updateArrows);

	// Initial positioning of the arrows
	window.addEventListener("load", updateArrows);
}

// Example usage: Set up multiple arrows between element pairs
setupArrows([
	"git-add",
	"git-commit",
	"git-push",
	"git-fetch",
	"git-pull",
	"git-checkout",
	"git-merge-local",
	"git-merge-origin",
]);
