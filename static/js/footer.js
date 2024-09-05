const footer = document.getElementById("footer");
const logo = document.getElementById("logo");

const sectionImages = {
    none: "static/img/no_image.svg",
	git: "static/img/logo_git.svg",
	github: "static/img/logo_github.svg",
	godot: "static/img/logo_godot.svg",
};

Reveal.on("slidechanged", (event) => {
	const slide = event.currentSlide;
	const hideFooter = slide.hasAttribute("data-hide-footer");
	if (hideFooter) {
		footer.classList.add("nv-hidden");
		footer.classList.remove("nv-visible");
		logo.classList.remove("nv-fade-in");
		logo.classList.remove("nv-fade-out");

		setTimeout(() => {
            logo.src = sectionImages.none;
		}, 150);
	} else {
		footer.classList.remove("nv-hidden");
		footer.classList.add("nv-visible");
		const section = slide.getAttribute("data-section");
		if (section) {
			const footerImage = sectionImages[section];

			logo.classList.add("nv-fade-out");

			setTimeout(() => {
				logo.src = footerImage;

				logo.onload = () => {
					logo.classList.remove("nv-fade-out");
					logo.classList.add("nv-fade-in");
				};
			}, 150);
		} else {
			logo.src = "";
		}
	}
});

const preloadedImages = [];

window.onload = () => {
	for (const key in sectionImages) {
		const img = new Image();
		img.src = sectionImages[key];
		preloadedImages.push(img);
	}
};
