"use strict";

document.addEventListener("DOMContentLoaded", function () {
	//! Start Scripts
	// Hero
	const title = document.querySelector('.hero__title');
	const subtitle = document.querySelector('.hero__subtitle');
	const btns = document.querySelectorAll('.hero__btns');

	const tl = gsap.timeline({
		defaults: {
			opacity: 0,
			y: 50,
			ease: 'power3.inOut',
		},
	});

	tl.from(title, {
		duration: 1,
		delay: 0.5
	});
	tl.from(subtitle, {
		duration: 1
	});
	tl.from(btns, {
		duration: 1,
		stagger: 0.3
	}, '-=0.5');

	// Heading
	const sectionHeadings = document.querySelectorAll('.section-heading');
	sectionHeadings.forEach((heading) => {
		gsap.from(heading, {
			duration: 0.5,
			opacity: 0,
			scale: 0.5,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: heading,
				start: 'top 80%',
				end: 'bottom top',
				scrub: 1,
			},
		});
	});

	// About List
	const items = document.querySelectorAll('.about-us__item');
	items.forEach((item, index) => {
		gsap.from(item, {
			duration: 0.5,
			y: 100,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: item,
				start: 'top 80%',
				end: 'bottom top',
				scrub: 0.5,
				toggleActions: 'play none none reverse',
				delay: index * 0.4,
			},
		});
	});

	const titleH2 = document.querySelector('.competencies .title-h2');

	gsap.from(titleH2, {
		duration: 0.5,
		opacity: 0,
		x: -100,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: titleH2,
			start: 'top 80%',
			end: 'bottom top',
			scrub: 0.5,
		},
	});


	// Teams
const teamsImg = document.querySelector('.teams__img');
  const teamsContent = document.querySelector('.teams__content');

  gsap.from(teamsImg, {
    duration: 0.5,
    opacity: 0,
    x: -50,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: teamsImg,
      start: 'top 80%',
      end: 'bottom top',
      scrub: 0,
    },
  });

  gsap.from(teamsContent, {
    duration: 0.5,
    opacity: 0,
    x: 50,
    ease: 'power3.out', 
    scrollTrigger: {
      trigger: teamsContent,
      start: 'top 80%',
      end: 'bottom top',
      scrub: 0,
    },
  });

	//! End Scripts
});