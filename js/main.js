
let wrapper = document.querySelector('.wrapper');
let pageSlider = new Swiper('.page', {

	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	direction: 'vertical',
	slidesPerView: 'auto',
	parallax: true,
	freeMode: true,
	breakpoints: {
		1220: {
			freeMode: true,
		},
	},
	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},
	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором
		// будет срабатывать прокрутка мышью.
		//eventsTarget: ".image-slider"
	},
	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,

	// Скорость
	speed: 800,


	// Обновить свайпер
	// при изменении элементов слайдера
	observer: true,

	// Обновить свайпер
	// при изменении родительских
	// элементов слайдера
	observeParents: true,

	// Обновить свайпер
	// при изменении дочерних
	// элементов слайда
	observeSlideChildren: true,

	// Навигация 
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	// Скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		// Возможность перетаскивать скролл
		draggable: true
	},
	slideToClickedSlide: false,
	// resizeObserver: true,
	// Отключаем автоинициализацию
	init: false,
	// centeredSlides: true,

	on: {
		init: function () {
			// pageSlider.params.freeMode = true;
			menuSlider();
			setScrollType();
			kekWait();
			wrapper.classList.add('_loaded');

		},
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function () {
			setScrollType();
			kekWait();
		}
	},
})
const allTitle = document.querySelectorAll('.screen__title');
const allText = document.querySelectorAll('.screen__text');
let test = allText[0].getAttribute('data-swiper-parallax-opacity');
console.log(test);

function kekWait() {
	if (wrapper.classList.contains('_free')) {
		for (i = 0; i < allTitle.length; i++) {

			var zag = allTitle[i];
			zag.setAttribute('data-swiper-parallax-opacity', '1');
			zag.setAttribute('data-swiper-parallax', '');
			zag.setAttribute('data-swiper-parallax-duration', '');
		}

		for (i = 0; i < allText.length; i++) {
			var jija = allText[i];
			jija.setAttribute('data-swiper-parallax-opacity', '1');
			jija.setAttribute('data-swiper-parallax', '');
			jija.setAttribute('data-swiper-parallax-duration', '');
		}

	} else {

		for (i = 0; i < allTitle.length; i++) {

			var zag = allTitle[i];
			zag.setAttribute('data-swiper-parallax-opacity', '0');
			zag.setAttribute('data-swiper-parallax', '50%');
			zag.setAttribute('data-swiper-parallax-duration', '1000');
		}

		for (i = 0; i < allText.length; i++) {
			var jija = allText[i];
			jija.setAttribute('data-swiper-parallax-opacity', '0');
			jija.setAttribute('data-swiper-parallax', '50%');
			jija.setAttribute('data-swiper-parallax-duration', '1000');
		}
		// pageSlider.params.parallax.enabled = true;
	};
};

let menuLinks = document.querySelectorAll('.menu__link');
function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let i = 0; i < menuLinks.length; i++) {
			const menuLink = menuLinks[i];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(i, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}
function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		// pageSlider.params.freeMode = false;
		// pageSlider.params.parallax = false;
	};

	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');

		if (pageSlideContent) {
			let pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				// pageSlider.params.parallax = true;
				// pageSlider.params.freeMode = true;
				break;
			}
		}
	}
	// let dsa = pageSlider.params;
	// console.log(dsa);
}
pageSlider.init();

