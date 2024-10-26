function ClickToSlideIn(e) {
	if (GetCooldownStatus(cooldown)) {
		return;
	}

	let activeNavBtn = document.querySelector(".active-nav-btn");
	activeNavBtn.classList.remove("active-nav-btn");
	e.target.classList.add("active-nav-btn");

	activePage = e.target.getAttribute("data-target");
	let page = document.querySelector(`#page${activePage}`);

	SlideInFromSide(page, GetRandomSide());
}

function ScrollToSlideIn(e) {
	if (GetCooldownStatus(cooldown)) {
		return;
	}

	let activeNavBtn = document.querySelector(".active-nav-btn");
	activeNavBtn.classList.remove("active-nav-btn");

	if (0 < e.deltaY) {
		activePage + 1 < 5 ? ++activePage : (activePage = 1);
	} else {
		0 < activePage - 1 ? --activePage : (activePage = 4);
	}

	activeNavBtn = document.querySelector(
		`#navbar a[data-target="${activePage}"`
	);
	activeNavBtn.classList.add("active-nav-btn");
	let page = document.querySelector(`#page${activePage}`);

	SlideInFromSide(page, GetRandomSide());
}

function SlideInFromSide(page, side) {
	let active = document.querySelector(".slide-in-active");

	if (active) {
		active.className = "page-container";
	}

	pages.forEach(e => e.style.zIndex--);
	page.style.zIndex = pageCount;
	page.classList.add(`slide-from-${side}`);
	setTimeout(() => page.classList.add("slide-in-active"), 10);
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

function Init() {
	let screenWidth = window.matchMedia("(min-width: 769px)");

	if (screenWidth.matches) {
		window.pages;
		window.pageCount = window.lastRun = 0;
		window.lastSide = "";
		window.activePage = 1;
		window.cooldown = 300;

		const navBtns = document.querySelectorAll("#navbar a");
		pages = document.querySelectorAll(".page-container");
		let len = (pageCount = pages.length);

		pages.forEach(e => (e.style.zIndex = len--));
		navBtns.forEach(e => e.addEventListener("click", ClickToSlideIn));
		window.addEventListener("wheel", ScrollToSlideIn);
	}
}

window.addEventListener("load", Init);
