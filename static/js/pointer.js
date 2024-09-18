const circle = document.createElement("div");
circle.style.width = "20px";
circle.style.height = "20px";
circle.style.borderRadius = "50%";
circle.style.backgroundColor = "red";
circle.style.position = "absolute";
circle.style.pointerEvents = "none";
circle.style.display = "none";
circle.style.zIndex = "1000";
document.body.appendChild(circle);

let isCircleVisible = false;

let lastMouseX = 0;
let lastMouseY = 0;
let lastTimestamp = 0;

function toggleCircle(event) {
	if (event.code === "ScrollLock") {
		isCircleVisible = !isCircleVisible;
		circle.style.display = isCircleVisible ? "block" : "none";
		document.body.style.cursor = isCircleVisible ? "none" : "default";
	}
}

function updateCirclePosition(event) {
	if (isCircleVisible) {
		const currentTime = Date.now();
		const deltaTime = currentTime - lastTimestamp;

		const deltaX = event.pageX - lastMouseX;
		const deltaY = event.pageY - lastMouseY;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		const speed = distance / (deltaTime || 1);

		const newSize = Math.min(100, Math.max(20, speed * 10));

		circle.style.width = `${newSize}px`;
		circle.style.height = `${newSize}px`;
		circle.style.left = `${event.pageX - newSize / 2}px`;
		circle.style.top = `${event.pageY - newSize / 2}px`;

		lastMouseX = event.pageX;
		lastMouseY = event.pageY;
		lastTimestamp = currentTime;
	}
}

document.addEventListener("mousemove", updateCirclePosition);
document.addEventListener("keydown", toggleCircle);
