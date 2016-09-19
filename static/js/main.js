$(function () {
	'use strict';

	/* ==========================================================================
   Preload
   ========================================================================== */

	$(window).load(function () {
		$('#status').fadeOut();

		$('#preloader').delay(1000).fadeOut('slow');
	});

	/* ==========================================================================
   On Scroll animation
   ========================================================================== */

	if ($(window).width() > 992) {
		new WOW().init();
	}

	/* ==========================================================================
   Smooth Scroll
   ========================================================================== */

	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: (target.offset().top - 40)
				}, 1000);
				return false;
			}
		}
	});

	/* ==========================================================================
   App screenshot slider
   ========================================================================== */

	$('.screenshot-slider').owlCarousel({
		autoPlay: 3000, // Set AutoPlay speed
		items: 4,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [979, 3]
	});

	/* ==========================================================================
   Tweet
   ========================================================================== */

	$('.tweet').twittie({
		username: 'envatomarket', // change username here
		dateFormat: '%b. %d, %Y',
		template: '{{tweet}} {{user_name}}',
		count: 10
	}, function () {
		var item = $('.tweet ul');

		item.children('li').first().show().siblings().hide();
		setInterval(function () {
			item.find('li:visible').fadeOut(500, function () {
				$(this).appendTo(item);
				item.children('li').first().fadeIn(500);
			});
		}, 5000);
	});

	/* ==========================================================================
   review
   ========================================================================== */

	$('.review-slider').owlCarousel({
		paginationSpeed: 400,
		singleItem: true

	});

	/* ==========================================================================
   team
   ========================================================================== */

	$('.team-slider').owlCarousel({
		items: 3,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [979, 2]

	});

	/* ==========================================================================
	 sub form
	 ========================================================================== */

	function loading () {
		$('#mc-notification').show().html('Sending...');
	}

	function formResult (data) {
	}

	function onSubmit () {
		$('#mc-form').submit(function () {
			var action = $(this).attr('action');
			loading();
			$.ajax({
				url: action,
				type: 'POST',
				data: {
					email: $('#mailchimp-email').val(),
				},
				success: function (data) {
					$('.success-mc p').html(data.message);
					$('#mc-form input').val('');
					$('.success-mc').fadeIn();
					setTimeout(function () {
						$('.success-mc').fadeOut();
					}, 3000);
				},
				error: function (data) {
					$('.error-mc p').html(data.responseJSON.message);
					$('#mc-form input').val('');
					$('.error-mc').fadeIn();
					setTimeout(function () {
						$('.error-mc').fadeOut();
					}, 3000);
				}
			});
			return false;
		});
	}
	onSubmit();

	/* ==========================================================================
	   Contact Form
	   ========================================================================== */

	$('#contact-form').validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},

			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
			email: {
				required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
				email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
			},
			message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: 'POST',
				data: $(form).serialize(),
				url: '/sendmessage',
				success: function () {
					$('#contact-form :input').attr('disabled', 'disabled');
					$('#contact-form').fadeTo('slow', 0.15, function () {
						$(this).find(':input').attr('disabled', 'disabled');
						$(this).find('label').css('cursor', 'default');
						$('.success-cf').fadeIn();
					});
					$('#contact-form')[0].reset();
				},
				error: function () {
					$('#contact-form').fadeTo('slow', 0.15, function () {
						$('.error-cf').fadeIn();
					});
				}
			});
		}
	});

	/* ==========================================================================
   ScrollTop Button
   ========================================================================== */

	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('.scroll-top a').fadeIn(200);
		} else {
			$('.scroll-top a').fadeOut(200);
		}
	});

	$('.scroll-top a').click(function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/* ==========================================================================
   parallax scrolling
   ========================================================================== */

	if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
		if ($(window).width() > 992) {skrollr.init({forceHeight: false});}$(window).on('resize', function () {if ($(window).width() <= 992) {skrollr.init().destroy();}});$(window).on('resize', function () {if ($(window).width() > 992) {skrollr.init({forceHeight: false});}});
	}

	/* ==========================================================================
   sticky nav
   ========================================================================== */

	var menu = $('.navbar');

	var stickyNav = menu.offset().top;

	$(window).scroll(function () {
		if ($(window).scrollTop() > $(window).height()) {
			menu.addClass('stick');
		} else {
			menu.removeClass('stick');

		}
	});

	/* ==========================================================================
   Fade
   ========================================================================== */

	$(window).scroll(function (e) {
		var s = $(window).scrollTop(),
			d = $(document).height(),
			c = $(window).height(),
			opacityVal = (s / 400);
		$('.main .overlay').css('opacity', opacityVal);
	});

	/* ==========================================================================
   gallery
   ========================================================================== */

	var images = [{
        url: "img/gallery/01.jpg",
		mUrl: "img/gallery/m01.jpg",
		tUrl: "img/gallery/thumbnails/01@2x.jpg",
        alt: "Calamari",
		caption: "Calamari<br />The Blue Door Restaurant & Bar<br />San Jose, CA"
    }, {
        url: "img/gallery/02.jpg",
		mUrl: "img/gallery/m02.jpg",
		tUrl: "img/gallery/thumbnails/02@2x.jpg",
        alt: "Eggs in Jail",
		caption: "Eggs in Jail<br />Outerlands<br />San Francisco, CA"
    }, {
        url: "img/gallery/03.jpg",
		mUrl: "img/gallery/m03.jpg",
		tUrl: "img/gallery/thumbnails/03@2x.jpg",
        alt: "Spicy Miso Ramen",
		caption: "Spicy Miso Ramen<br />Niu B Sushi & Robata<br />Chicago, IL"
    }, {
        url: "img/gallery/04.jpg",
		mUrl: "img/gallery/m04.jpg",
		tUrl: "img/gallery/thumbnails/04@2x.jpg",
        alt: "Classic Italiano Pizza",
		caption: "Classic Italiano Pizza<br />Willow Street Wood-Fired Pizza<br />San Jose, CA"
    }, {
        url: "img/gallery/05.jpg",
		mUrl: "img/gallery/m05.jpg",
		tUrl: "img/gallery/thumbnails/05@2x.jpg",
        alt: "Pho / Vietnamese Beef Noodle Soup",
		caption: "Pho / Vietnamese Beef Noodle Soup<br />Pho 90 degree<br />San Jose, CA"
    }, {
        url: "img/gallery/06.jpg",
		mUrl: "img/gallery/m06.jpg",
		tUrl: "img/gallery/thumbnails/06@2x.jpg",
        alt: "Truffle Burger",
		caption: "Truffle Burger<br />Umami Burger<br />Palo Alto, CA"
    }, {
        url: "img/gallery/08.jpg",
		mUrl: "img/gallery/m08.jpg",
		tUrl: "img/gallery/thumbnails/08@2x.jpg",
        alt: "Steak Tacos",
		caption: "Steak Tacos<br />Moctezuma’s Mexican Restaurant<br />Tacoma, WA"
    }, {
        url: "img/gallery/09.jpg",
		mUrl: "img/gallery/m09.jpg",
		tUrl: "img/gallery/thumbnails/09@2x.jpg",
        alt: "Unagi (eel) Poke Bowl",
		caption: "Unagi (eel) Poke Bowl<br />45th Stop N Shop & Poke Bar<br />Seattle, WA"
    }, {
        url: "img/gallery/10.jpg",
		mUrl: "img/gallery/m10.jpg",
		tUrl: "img/gallery/thumbnails/10@2x.jpg",
        alt: "Mushroom Hot Pot",
		caption: "Mushroom Hot Pot<br />Mint and Basil<br />San Jose, CA"
    }, {
        url: "img/gallery/11.jpg",
		mUrl: "img/gallery/m11.jpg",
		tUrl: "img/gallery/thumbnails/11@2x.jpg",
        alt: "Sashimi Combo",
		caption: "Sashimi Combo<br />Yechon<br />Annandale, VA"
    }, {
        url: "img/gallery/12.jpg",
		mUrl: "img/gallery/m12.jpg",
		tUrl: "img/gallery/thumbnails/12@2x.jpg",
        alt: "Sticky Rice Mango",
		caption: "Sticky Rice Mango<br />House of Thai<br />San Francisco, CA"
    }, {
        url: "img/gallery/13.jpg",
		mUrl: "img/gallery/m13.jpg",
		tUrl: "img/gallery/thumbnails/13@2x.jpg",
        alt: "Green Tea Mille Crepes",
		caption: "Green Tea Mille Crepes<br />Lady M Cake Boutique<br />New York, NY"
    }, {
        url: "img/gallery/14.jpg",
		mUrl: "img/gallery/m14.jpg",
		tUrl: "img/gallery/thumbnails/14@2x.jpg",
        alt: "Chef’s Tasting",
		caption: "Chef’s Tasting<br />Dandelion Chocolate<br />San Francisco, CA"
    }, {
        url: "img/gallery/17.jpg",
		mUrl: "img/gallery/m17.jpg",
		tUrl: "img/gallery/thumbnails/17@2x.jpg",
        alt: "Acai Bowl",
		caption: "Acai Bowl<br />Project Juice<br />San Francisco, CA"
    }, {
        url: "img/gallery/18.jpg",
		mUrl: "img/gallery/m18.jpg",
		tUrl: "img/gallery/thumbnails/18@2x.jpg",
        alt: "Watermelon Soju",
		caption: "Watermelon Soju<br />Pocha 32<br />New York, NY"
    }];

	// http://css-tricks.com/snippets/javascript/shuffle-array/
    images.sort(function () { return 0.5 - Math.random(); });

	$.each(images, function (index, image) {

        var element = $('<div class="item"><a href="' + image.url + '" data-size="1500x1000" data-med="' + image.mUrl + '" data-med-size="750x500"><img src="' + image.tUrl + '" data-at2x="' + image.tUrl + '" alt="' + image.alt + '" /><figure>' + image.caption + '</figure></a></div>');

        if (index === 0) {
            element.addClass("active");   
        }

		if (index < 10) {
        	element.appendTo("div.my-gallery");
		}
    });

	$('.my-gallery').owlCarousel({
		items: 3,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [979, 2]

	});

});
