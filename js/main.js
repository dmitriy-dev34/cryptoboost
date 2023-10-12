"use strict";

document.addEventListener("DOMContentLoaded", function () {
	//! Start Scripts

	/* ------------------- Preloader -------------------- */
	window.addEventListener('load', function () {
		const preLoader = document.querySelector('.preloader');
		setTimeout(function () {
			preLoader.classList.add('hide');
		}, 500)
	});

	const body = document.body; // переменная body

	// Запрет перетаскивания ссылок и картинок
	document.querySelectorAll("img, a").forEach((element) => {
		element.addEventListener("dragstart", (event) => {
			event.preventDefault();
		});
	});

	/* ------------------- btnScrollTop -------------------- */
	const btnScrollTop = document.getElementById('btnScrollTop');

	window.onscroll = function () {
		scrollFunction()
	};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			btnScrollTop.classList.add('show')
		} else {
			btnScrollTop.classList.remove('show')
		}
	}

	btnScrollTop.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});

	//!Плавный скролл по якорным ссылкам
	const anchors = document.querySelectorAll('a[href*="#"]');
	anchors.forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});

	/* ------------------- Mobile Menu -------------------- */
	const pageBody = document.querySelector('.page__body');
	const btnBurger = document.querySelector('.header__burger');
	const menu = document.querySelector('.header__nav');

	function toggleLockScroll() {
		pageBody.classList.toggle('lock-scroll');
	};

	if (menu && btnBurger) {
		btnBurger.addEventListener('click', e => {
			btnBurger.classList.toggle('active');
			menu.classList.toggle('active');
			toggleLockScroll();
		});

		menu.addEventListener('click', e => {
			if (e.target.classList.contains('menu')) {
				toggleLockScroll();
				menu.classList.remove('active');
				btnBurger.classList.remove('active');
			}
		});

		window.addEventListener('click', e => {
			const target = e.target;
			if (
				!target.closest('.header__nav') &&
				!target.closest('.btn-burger') &&
				menu.classList.contains('active')
			) {
				toggleLockScroll();
				menu.classList.remove('active');
				btnBurger.classList.remove('active');
			}
		});
	};

	/* ------------------- Header Fixed -------------------- */
	const header = document.querySelector('.header');
	let headerHeight = header.offsetHeight;

	// Функция для обновления высоты хедера в зависимости от ширины экрана
	function updateHeaderHeight() {
		if (window.innerWidth <= 480) {
			headerHeight = 72; // Установите желаемую высоту для мобильного хедера
		} else {
			headerHeight = 81; // Установите желаемую высоту для десктопного хедера
		}
	};

	window.addEventListener('resize', () => {
		updateHeaderHeight();
	});

	function scrollToAnchor(anchor) {
		const offset = headerHeight - 1;
		const anchorParts = anchor.split('#');
		const targetId = anchorParts[1];

		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			const targetOffset = targetElement.offsetTop;
			window.scrollTo({
				top: targetOffset - offset,
				behavior: 'smooth'
			});
		}
		return false;
	};

	window.addEventListener('scroll', () => {
		if (window.scrollY > headerHeight) {
			header.classList.add('header-fixed');
			document.body.style.paddingTop = `${headerHeight}px`;
		} else {
			header.classList.remove('header-fixed');
			document.body.style.paddingTop = 0;
		}

		const anchorLinks = document.querySelectorAll('.menu__link');

		anchorLinks.forEach(link => {
			const anchor = link.getAttribute('href');
			const target = document.querySelector(anchor);

			if (target) {
				const targetTop = target.offsetTop - headerHeight;
				const targetBottom = targetTop + target.offsetHeight;

				if (window.scrollY >= targetTop && window.scrollY < targetBottom) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			}
		});
	});

	document.querySelectorAll('.link-anhor').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const anchor = link.getAttribute('href');
			scrollToAnchor(anchor);
			menu.classList.remove('active');
			btnBurger.classList.remove('active');
			pageBody.classList.remove('lock-scroll');
		});
	});

	// Вызовем функцию для первоначальной установки высоты хедера
	updateHeaderHeight();

	/* ------------------- Compitencies Slider -------------------- */
	const competenciesSlider = new Swiper('.competencies-slider', {
		direction: 'horizontal',
		loop: true,
		spaceBetween: 32,
		slidesPerView: 3,
		slidesPerGroup: 1,
		autoplay: {
			delay: 5000,
		},

		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		navigation: {
			nextEl: '.slider-info',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			1025: {
				spaceBetween: 32,
				slidesPerView: 3,
			},

			600: {
				spaceBetween: 24,
				slidesPerView: 2,
			},

			0: {
				spaceBetween: 16,
				slidesPerView: 1,
			},
		},
	});

	/* ------------------- FAQ -------------------- */
	const accordionItems = document.querySelectorAll('.accordion__item');
	const accordionHead = document.querySelectorAll('.accordion__head');
	const accordionBody = document.querySelectorAll('.accordion__body');

	accordionHead.forEach(item => item.addEventListener('click', () => {
		const activeContent = document.querySelector('#' + item.dataset.tab);
		const parentItem = item.closest('.accordion__item');

		if (activeContent.classList.contains('active')) {
			activeContent.classList.remove('active');
			item.classList.remove('active');
			activeContent.style.maxHeight = 0;
			parentItem.classList.remove('active');
		} else {
			accordionItems.forEach(accordionItem => {
				const content = accordionItem.querySelector('.accordion__body');
				const head = accordionItem.querySelector('.accordion__head');

				if (content.classList.contains('active')) {
					content.classList.remove('active');
					head.classList.remove('active');
					content.style.maxHeight = 0;
					accordionItem.classList.remove('active');
				}
			});

			item.classList.add('active');
			parentItem.classList.add('active');
			activeContent.classList.add('active');
			activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
		}
	}));


	/* ------------------- Number Animation -------------------- */
	const animateNumbers = () => {
		const statNumbers = document.querySelectorAll('.number-animation');

		statNumbers.forEach(statNumber => {
			const data = parseInt(statNumber.dataset.n, 10);
			const duration = 2000; // Длительность анимации в миллисекундах
			const sym = statNumber.dataset.sym || ''; // Дополнительный символ, если есть

			const start = performance.now();
			const animate = (timestamp) => {
				const progress = Math.min((timestamp - start) / duration, 1);
				const currentCount = Math.ceil(progress * data);
				statNumber.textContent = currentCount + sym;

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};

			requestAnimationFrame(animate);
		});
	};

	const checkScroll = () => {
		if (window.scrollY > 90) {
			window.removeEventListener('scroll', checkScroll);
			animateNumbers();
		}
	};

	window.addEventListener('scroll', checkScroll);


	/* ------------------- Modal -------------------- */
	const modalBtn = document.querySelectorAll('.js-modal-btn');
	const modals = document.querySelectorAll('.modal');
	const lockBody = document.querySelector('.page__body');
	const closeModalThanks = document.querySelectorAll('.close-message');

	function openModal(elem) {
		elem.classList.add('active');
		if (hasScrollbar()) {
			body.style.width = `calc(100vw - ${window.innerWidth - document.documentElement.clientWidth}px)`;
		}
		lockBody.classList.add('lock-scroll');
	};

	function closeModal(e) {
		if (e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__overlay')) {
			e.target.closest('.modal').classList.remove('active');
			body.style.width = '';
			lockBody.classList.remove('lock-scroll');
		}
	};

	function hasScrollbar() {
		return document.body.scrollHeight > window.innerHeight;
	};

	modalBtn.forEach(btn => {
		btn.addEventListener('click', (e) => {
			let data = e.target.dataset.modalOpen;

			modals.forEach(modal => {
				if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.js-modal-btn').dataset.modalOpen) {
					openModal(modal)
				}
			})
		})
	});

	modals.forEach(modal => {
		modal.addEventListener('click', e => closeModal(e))
	});

	closeModalThanks.forEach(button => {
		button.addEventListener('click', () => {
			modals.forEach(modalThank => {
				body.style.width = '';
				modalThank.classList.remove('active');
				lockBody.classList.remove('lock-scroll');
			});

		});
	});

	window.addEventListener('keydown', e => {
		modals.forEach(modal => {
			if (e.key === "Escape" && modal.classList.contains('active')) {
				modal.classList.remove('active');
				body.style.width = '';
				lockBody.classList.remove('lock-scroll');
			}
		})
	});
	/* ------------------- / Modal -------------------- */

	/* ------------------- Page Banner Paralax -------------------- */
	const bannerImg = document.querySelector('.competencies-banner img');
	const parallaxCoefficient = 0.5;
	function handleScroll() {
		const scrollTop = window.scrollY;
		const offset = scrollTop * parallaxCoefficient;
		bannerImg.style.transform = `translateY(${offset}px)`;
	}
	window.addEventListener('scroll', handleScroll);


	//! End Scripts
});