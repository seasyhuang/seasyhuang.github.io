/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}


			// Sidebar.
			// 	if ($sidebar.length > 0) {
			//
			// 	var $sidebar_a = $sidebar.find('a');
			//
			// 	$sidebar_a
			// 		.addClass('scrolly')
			// 		.on('click', function() {
			//
			// 			var $this = $(this);
			//
			// 			// External link? Bail.
			// 				if ($this.attr('href').charAt(0) != '#')
			// 					return;
			//
			// 			// Deactivate all links.
			// 				$sidebar_a.removeClass('active');
			//
			// 			// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
			// 				$this
			// 					.addClass('active')
			// 					.addClass('active-locked');
			//
			// 		})
			// 		.each(function() {
			//
			// 			var	$this = $(this),
			// 				id = $this.attr('href'),
			// 				$section = $(id);
			//
			// 			// No section for this link? Bail.
			// 				if ($section.length < 1)
			// 					return;
			//
			// 			// Scrollex.
			// 				$section.scrollex({
			// 					mode: 'middle',
			// 					top: '-20vh',
			// 					bottom: '-20vh',
			// 					initialize: function() {
			//
			// 						// Deactivate section.
			// 							$section.addClass('inactive');
			//
			// 					},
			// 					enter: function() {
			//
			// 						// Activate section.
			// 							$section.removeClass('inactive');
			//
			// 						// No locked links? Deactivate all links and activate this section's one.
			// 							if ($sidebar_a.filter('.active-locked').length == 0) {
			//
			// 								$sidebar_a.removeClass('active');
			// 								$this.addClass('active');
			//
			// 							}
			//
			// 						// Otherwise, if this section's link is the one that's locked, unlock it.
			// 							else if ($this.hasClass('active-locked'))
			// 								$this.removeClass('active-locked');
			//
			// 					}
			// 				});
			// 		});
			// }

			// Scrolly. (for buttons)
				$('.scrolly').scrolly({
					speed: 1000,
					offset: function() {

						// If <=large, >small, and sidebar is present, use its height as the offset.
							if (breakpoints.active('<=large')
							&&	!breakpoints.active('<=small')
							&&	$sidebar.length > 0)
								return $sidebar.height();

						return 0;

					}
				});

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);
