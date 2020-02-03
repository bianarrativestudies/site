/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');
	else {

		breakpoints.on('>medium', function () {
			$body.removeClass('is-mobile');
		});

		breakpoints.on('<=medium', function () {
			$body.addClass('is-mobile');
		});

	}

	// Scrolly.
	$('.scrolly')
		.scrolly({
			speed: 1500,
			offset: $header.outerHeight()
		});

	// Menu.
	$('#menu')
		.append('<a href="#menu" class="close"></a>')
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight() + 1,
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});

	}

	var handler = new MemberHandler();

	handler.fetchData();

	$("#member-text-filter").on("keyup", function () {
		handler.searchTerm = this.value.toLowerCase().trim();
		handler.renderAll();
	});

	$("#top").on("click", function () {
		handler.resetAll();
	});

	$("#sort-surname").on("click", function () {
		handler.sortBySurname();
	});

	$("#sort-institution").on("click", function () {
		handler.sortByInstitution();
	});

	// $('#member-form').on('submit', function (e) {
	// 	e.preventDefault();
	// 	var data = $("#member-form :input").serializeArray();
	// 	handler.processForm(data);
	// });

	$('.search-tag').on('click', function (e) {

		const tag = $(this).text().replace(',', '').trim();

		const url = "members?tag=" + tag + "#top";
		window.location.href = url;
	});

})(jQuery);

function getMembersWithTag(tag) {
	const url = "members?tag=" + tag + "#top";
	window.location.href = url;
}

function clearFilters() {
	const url = "members#top";
	window.location.href = url;
}

function jumpToLetter(letter) {
	const url = "members#" + letter;
	window.location.href = url;
}

var topButton = document.getElementById("backToTop");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}