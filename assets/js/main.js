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

	$("#member-surname-filter").on("keyup", function () {
		var value = this.value.toLowerCase().trim();
		handler.filterSurname(value);
	});

	$("#member-institution-filter").on("keyup", function () {
		var value = this.value.toLowerCase().trim();
		handler.filterInstitute(value);
	});

	$("#member-research-filter").on("keyup", function () {
		var value = this.value.toLowerCase().trim();
		handler.filterResearchArea(value);
	});

	$("#top").on("click", function () {
		$('#member-surname-filter').val(null);
		$('#member-institution-filter').val(null);
		$('#member-research-filter').val(null);
		handler.filterResearchArea(null);
	});
	
	$("#sort-surname").on("click", function () {
		handler.sortBySurname();
	});

	$("#sort-institution").on("click", function () {
		handler.sortByInstitution();
	});

	$("#sort-city").on("click", function () {
		handler.sortByCity();
	});

	$('#member-form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();
		var data = $("#member-form :input").serializeArray();
		handler.processForm(data);
    });

})(jQuery);

function filter(tag) {
	const url = "members?tag=" + tag + "#top";
	window.location.href = url;
}

function clearFilters() {
	const url = "members#top";
	window.location.href = url;
}

function jumpToLetter(letter) {
	console.log("Jumping to " + letter)
}