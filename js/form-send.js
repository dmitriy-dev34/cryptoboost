"use strict";
document.addEventListener("DOMContentLoaded", function () {
	//! Start Scripts

	const formFeedback = document.querySelector('#form-feedback');
	const lockBodyForm = document.querySelector('.page__body');
	const modalThankyou = document.querySelector('.feedback-thankyou');

	/* ------------------- Send formCTA -------------------- */
	formFeedback.addEventListener("submit", function (event) {
		event.preventDefault();
		const form = this;
		const url = "./mail.php";
		const formData = new FormData(form);

		fetch(url, {
				method: "POST",
				body: formData
			})
			.then(function (response) {
				if (response.ok) {
					modalThankyou.classList.add('active');
					lockBodyForm.classList.add('lock-scroll');
					form.reset();
				}
			})
			.catch(function (error) {
				console.error("Error:", error);
			});
	});
	//! End Scripts
});