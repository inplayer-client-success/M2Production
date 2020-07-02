

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function () {

	// MOBILE MENU
	var toggle = $('#toggle');

	$('#menu a').on('click', function () {
		console.log()
		if ($(window).width() < 790) {
			$('#toggle').click();
		}

	});

	toggle.on('click', function () {
		$(this).toggleClass('is-active');

		$("#menu").addClass('flex');
		$('#menu').toggleClass('slideInDown slideOutUp');
		$('body').toggleClass('overflow');
	})



	$('#preview-item').html('<div id="inplayer-' + getParameterByName('id') + '" class="inplayer-paywall""></div>');


	// ACCORDION 
	$(".toggle").click(function (e) {
		e.preventDefault();
		let inner = $(this).next(".inner");

		if ($(this).hasClass("active")) {
			inner.removeClass("show");
			inner.slideUp(350);
			$(this).removeClass("active");
		} else {
			$(this)
				.closest(".accordion")
				.find("a.active")
				.removeClass("active");
			$(this)
				.closest(".accordion")
				.find(".inner")
				.not(inner)
				.removeClass("show")
				.slideUp(350);
			inner.slideDown(350);
			inner.addClass("show");
			$(this).addClass("active");
		}
	});

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('.page-scroll').on('click', function (event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 250, 'easeOutSine');
		event.preventDefault();
	});


	// back to top button

	var offset = 550;
	var duration = 300;

	$(window).scroll(function () {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
		} else {
			$('.back-to-top').fadeOut(duration);
		}

	});

	$('.back-to-top').click(function (event) {
		event.preventDefault();

		$('html, body').animate({ scrollTop: 0 }, duration);
		return false;
	})


})


