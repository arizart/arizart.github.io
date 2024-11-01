function ClickToSlideIn(e) {
	if (GetCooldownStatus(cooldown)) {
		return;
	}

	let activeNavBtn = document.querySelector(".nav-btn-active");
	activeNavBtn.classList.remove("nav-btn-active");
	e.target.classList.add("nav-btn-active");

	activePage = Number(e.target.getAttribute("data-target"));
	let page = document.querySelector(`#page${activePage}`);

	SlideInFromSide(page, GetRandomSide());
}

function ScrollToSlideIn(e) {
	if (GetCooldownStatus(cooldown)) {
		return;
	}

	let activeNavBtn = document.querySelector(".nav-btn-active");
	activeNavBtn.classList.remove("nav-btn-active");

	if (0 < e.deltaY) {
		activePage + 1 < 5 ? ++activePage : (activePage = 1);
	} else {
		0 < activePage - 1 ? --activePage : (activePage = 4);
	}

	activeNavBtn = document.querySelector(
		`.nav .nav-btn[data-target="${activePage}"`
	);
	activeNavBtn.classList.add("nav-btn-active");
	let page = document.querySelector(`#page${activePage}`);

	SlideInFromSide(page, GetRandomSide());
}

function SlideInFromSide(page, side) {
	let active = document.querySelector(".slide-active");
	active.className = "page-container";

	pages.forEach(e => e.style.zIndex--);
	page.style.zIndex = pageCount;
	page.classList.add(`slide-from-${side}`);
	setTimeout(() => page.classList.add("slide-active"), 10);
}

function GetRandomSide() {
	const sides = ["top", "right", "bottom", "left"];
	let side;

	do {
		side = sides[Math.floor(Math.random() * sides.length)];
	} while (side == lastSide);

	lastSide = side;
	return side;
}

function GetCooldownStatus(cooldown) {
	const endTime = performance.now();
	const waitTime = endTime - lastRun;

	if (cooldown < waitTime) {
		lastRun = endTime;
		return false;
	}
	return true;
}

function ToggleNavbar() {
	if (navbarExpanded) {
		barIcon.classList.remove("bar-icon-expand");
		navbarWrapper.classList.remove("h-100");
		navbarExpanded = false;
	} else {
		barIcon.classList.add("bar-icon-expand");
		navbarWrapper.classList.add("h-100");
		navbarExpanded = true;
	}
}

function ReachedScrollEnd() {
	return window.scrollY == innerHeight * (pageCount - 1);
}

function ToggleMobileCopyright() {
	if (ReachedScrollEnd()) {
		copyright.classList.add("show-copyright");
	} else {
		copyright.classList.remove("show-copyright");
	}
}

function Init() {
	let largeScreen = "(min-width: 992px)";
	let mobileScreen = "(max-width: 991px)";

	if (window.matchMedia(largeScreen).matches) {
		window.pages;
		window.pageCount = window.lastRun = 0;
		window.lastSide = "";
		window.activePage = 1;
		window.cooldown = 300;

		const navBtns = document.querySelectorAll("#navbar.nav .nav-btn");
		pages = document.querySelectorAll(".page-container");
		let len = (pageCount = pages.length);

		pages.forEach(e => (e.style.zIndex = len--));
		navBtns.forEach(e => {
			e.removeAttribute("href");
			e.addEventListener("click", ClickToSlideIn);
		});
		window.addEventListener("wheel", ScrollToSlideIn);
	} else if (window.matchMedia(mobileScreen).matches) {
		window.navbarExpanded = false;
		window.barIcon = document.querySelector("#bar-icon");
		window.navbarWrapper = document.querySelector(".nav-bar-wrapper");
		window.navBtns = document.querySelectorAll(".nav-btn");
		window.pageCount = document.querySelectorAll(".page-container").length;
		window.copyright = document.querySelector("#copyright");

		barIcon.addEventListener("click", ToggleNavbar);
		navBtns.forEach(e => e.addEventListener("click", ToggleNavbar));
		window.addEventListener("scroll", ToggleMobileCopyright);
	}
}

window.addEventListener("load", Init);
