jQuery.noConflict();

function is_touch_device() {
	return !!('ontouchstart' in window) || !! ('onmsgesturechange' in window);
}

jQuery.exists = function(selector) {
	return (jQuery(selector).length > 0);
};



/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

	var $event = $.event,
		$special,
		resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$(this)
				.on("resize", $special.handler);
		},
		teardown: function() {
			$(this)
				.off("resize", $special.handler);
		},
		handler: function(event, execAsap) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply(context, args);
				};

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
		},
		threshold: 150
	};

})(jQuery);



/* Swipe Slideshow */
/* -------------------------------------------------------------------- */


function mk_swipe_slider() {

	if(jQuery.exists('.mk-swiper-slider')) {

	jQuery('.mk-swiper-slider').each(function() {

		var $this = jQuery(this),
			$next_arrow = $this.parent().find('.mk-swiper-next'),
			$prev_arrow = $this.parent().find('.mk-swiper-prev'),
			$direction = $this.attr('data-direction'),
			$pagination = $this.attr('data-pagination') == "true" ? true : false,
			$slideshowSpeed = $this.attr('data-slideshowSpeed'),
			$animationSpeed = $this.attr('data-animationSpeed'),
			$controlNav = $this.attr('data-controlNav') == "true" ? true : false,
			$directionNav = $this.attr('data-directionNav') == "true" ? true : false,
			$freeModeFluid = $this.attr('data-freeModeFluid') == "true" ? true : false,
			$freeMode = $this.attr('data-freeMode') == "true" ? true : false,
			$mousewheelControl = $this.attr('data-mousewheelControl') == "true" ? true : false,
			$loop = $this.attr('data-loop') == "true" ? true : false,
			$slidesPerView = $this.attr('data-slidesPerView');

		if ($pagination === true) {
			var $pagination_class = '#' + $this.attr('id') + ' .swiper-pagination';
		} else {
			var $pagination_class = false;
		}


		var mk_swiper = jQuery(this).swiper({
			mode: $direction,
			loop: $loop,
			freeMode: $freeMode,
			pagination: $pagination_class,
			freeModeFluid: $freeModeFluid,
			autoplay: $slideshowSpeed,
			speed: $animationSpeed,
			calculateHeight: true,
			grabCursor: true,
			useCSS3Transforms: false,
			mousewheelControl: $mousewheelControl,
			paginationClickable: true,
			slidesPerView: $slidesPerView,
		});


		$prev_arrow.click(function(e) {
			mk_swiper.swipePrev();
		});

		$next_arrow.click(function(e) {
			mk_swiper.swipeNext();
		});



	});
}

}



/* Edge Slideshow */
/* -------------------------------------------------------------------- */


function mk_edge_slider_init() {

	if(jQuery.exists('.mk-edge-slider')) {

	var $slider_wrapper = jQuery('.mk-edge-slider'),
		$next_arrow = $slider_wrapper.find('.mk-edge-next'),
		$prev_arrow = $slider_wrapper.find('.mk-edge-prev'),
		$pause = ($slider_wrapper.attr('data-pause') != "") ? $slider_wrapper.attr('data-pause') : 4000,
		$speed = ($slider_wrapper.attr('data-speed') != "") ? $slider_wrapper.attr('data-speed') : 600;


	var mk_swiper = $slider_wrapper.swiper({
		mode: 'horizontal',
		loop: true,
		grabCursor: true,
		//useCSS3Transforms: true,
		mousewheelControl: false,
		// pagination : $pagination_class,
		freeModeFluid: true,
		//autoplay : $slideshowSpeed,
		speed: $speed,
		autoplay: $pause
	});

	$prev_arrow.click(function(e) {
		mk_swiper.swipePrev();
	});

	$next_arrow.click(function(e) {
		mk_swiper.swipeNext();
	});



	setTimeout(function() {
		jQuery('.edge-slider-loading').fadeOut();
	}, 2000);
}

}



function mk_edge_slider_resposnive() {

	if(jQuery.exists('.mk-edge-slider')) {

	jQuery('.mk-edge-slider').each(function() {
		var $this = jQuery(this),
			$items = $this.find('.edge-slider-holder, .swiper-slide'),
			$height = $this.attr('data-height'),
			$fullHeight = $this.attr('data-fullHeight');

		var $window_height = jQuery(window).height();

		if (jQuery.exists('#wpadminbar')) {
			$window_height = $window_height - jQuery('#wpadminbar').height();
		}

		//$window_height = $window_height - jQuery('#header').height();

		//console.log($window_height);

		if (jQuery(window).width() < 780) {

			$window_height = 600;

		} else if ($fullHeight == 'true') {

			$window_height = $window_height - jQuery('#header').height();

		} else {

			$window_height = $height;
		}

		$items.animate({
			'height': $window_height
		}, 300);

		$this.find('.swiper-slide').each(function() {

			if (jQuery(window).width() < 780) {
				$window_height = 500;
			}

			var $this = jQuery(this),
				$content = $this.find('.edge-slide-content');

			if ($this.hasClass('left_center') || $this.hasClass('center_center') || $this.hasClass('right_center')) {

				var $this_height_half = $content.height() / 2,
					$window_half = $window_height / 2;

				$content.animate({
					'marginTop': ($window_half - $this_height_half)
				}, 300);
			}

			if ($this.hasClass('left_bottom') || $this.hasClass('center_bottom') || $this.hasClass('right_bottom')) {

				var $distance_from_top = $window_height - $content.height() - 50;

				$content.animate({
					'marginTop': ($distance_from_top)
				}, 300);
			}

		});

	});
}

}



(function($) {


	$.fn.extend({

		customSelect: function(options) {

			return this.each(function() {

				var currentSelected = $(this).find(':selected');
				$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">' + currentSelected.text() + '</span></span>').css({
					position: 'absolute',
					opacity: 0,
					fontSize: $(this).next().css('font-size')
				});
				var selectBoxSpan = $(this).next();
				var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) - parseInt(selectBoxSpan.css('padding-right'));
				var selectBoxSpanInner = selectBoxSpan.find(':first-child');
				selectBoxSpan.css({
					display: 'inline-block'
				});
				selectBoxSpanInner.css({
					width: selectBoxWidth,
					display: 'inline-block'
				});
				var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
				$(this).height(selectBoxHeight).change(function() {
					// selectBoxSpanInner.text($(this).val()).parent().addClass('changed');   This was not ideal
					selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					// Thanks to Juarez Filho & PaddyMurphy
				});

			});
		}

	});
})(jQuery);



jQuery(document).ready(function($) {

	mk_swipe_slider();
	mk_edge_slider_init();
	mk_edge_slider_resposnive();


	jQuery(window).on("debouncedresize", function() {
		setTimeout(function() {
			mk_edge_slider_resposnive();
		}, 500);
	});



	jQuery('#responsive_navigation select').customSelect();


	function mk_make_header_fixed() {

		if (!is_touch_device() && jQuery(window).width() > mk_grid_width) {	

			var wp_admin_height = 0;

			if (jQuery("#wpadminbar")
				.length > 0) {
				wp_admin_height = jQuery("#wpadminbar").height();
			}

			jQuery('#theme-page').css('margin-top', jQuery('#header.fixed_header').outerHeight());


			jQuery('#header.fixed_header').css({
				'position': 'fixed',
				'top': wp_admin_height
			});

		} else {

			jQuery('#theme-page').css('margin-top', 0);
			jQuery('#header.fixed_header').css({
				'position': 'relative',
				'top': 'auto'
			});

		}

	}	



		function mk_fixed_header() {
			var header_fixed_height = jQuery('#header.fixed_header').outerHeight(),
				mk_header_height = jQuery('#header.fixed_header').height(),
				mk_window_y = parseInt($(window).scrollTop());

		if (mk_window_y > mk_header_height) {

			jQuery('#header').addClass('sticky-trigger-header');
			

		} else {
			jQuery('#header').removeClass('sticky-trigger-header');
		}
		setTimeout(function() {
			jQuery('#navigation > ul > li > .sub-menu').css('top', jQuery('#navigation > ul > li').height());	
		}, 500);
		
	}

	jQuery(window).load(function() {
		if (!is_touch_device() && jQuery(window).width() > mk_grid_width) {
			mk_fixed_header();
			mk_make_header_fixed();
			
		}
	});

	jQuery(window).scroll(function() {
		mk_fixed_header();
	});

	jQuery(window).on("debouncedresize", function(event) {
		if (!is_touch_device() && jQuery(window).width() > mk_grid_width) {
			mk_fixed_header();
		}
			mk_make_header_fixed();
	});


	var side_social_margin = jQuery('#side_social').outerHeight();
	jQuery('#side_social').css('margin-top', -(side_social_margin / 2));



	jQuery(".tabs_container, .vertical_tabs_container").each(function() {
		jQuery("ul.tabs, ul.vertical_tabs", this).tabs("div.panes > div, div.vertical_panes > div", {
			tabs: 'li',
			effect: 'fade',
			fadeOutSpeed: -400
		});
	});



	jQuery.tools.tabs.addEffect("slide", function(i, done) {
		this.getPanes().slideUp();
		this.getPanes().eq(i).slideDown(function() {
			done.call();
		});
	});
	jQuery(".accordion").each(function() {
		var $initialIndex = jQuery(this).attr('data-initialIndex');
		if ($initialIndex == undefined) {
			$initialIndex = 0;
		}
		jQuery(this).tabs("div.pane", {
			tabs: '.tab',
			effect: 'slide',
			initialIndex: $initialIndex
		});
	});



	jQuery(".toggle_title, .bookmark_title").toggle(
		function() {
			jQuery(this).addClass('toggle_active');
			jQuery(this).siblings('.toggle_content, #bookmark ul').slideDown("fast");
		},
		function() {
			jQuery(this).removeClass('toggle_active');
			jQuery(this).siblings('.toggle_content, #bookmark ul').slideUp("fast");
		}
	);



	/* Initialize isiotop for newspaper style */
	/* -------------------------------------------------------------------- */

	function loops_iosotop_init() {
		if (jQuery('.mk-theme-loop').hasClass('isotop-enabled')) {
			var $mk_container, $mk_container_item;
			$mk_container = jQuery('.mk-theme-loop.isotop-enabled');
			$mk_container_item = '.mk-isotop-item';

			$mk_container.isotope({
				itemSelector: $mk_container_item,
				animationEngine: "best-available",
				masonry: {
					columnWidth: 1
				}

			});



			jQuery('.filter_portfolio a').click(function() {
				var $this;
				$this = $(this);

				if ($this.hasClass('.current')) {
					return false;
				}
				var $optionSet = $this.parents('.filter_portfolio');
				$optionSet.find('.current').removeClass('current');
				$this.addClass('current');

				var selector = jQuery(this).attr('data-filter');

				$mk_container.isotope({
					filter: ''
				});
				$mk_container.isotope({
					filter: selector
				});


				return false;
			});



			jQuery('#load_more_posts').hide();
			if (jQuery('.mk-theme-loop').hasClass('scroll-load-style') || jQuery('.mk-theme-loop').hasClass('load-button-style')) {
				if (jQuery.exists('.wp-pagenavi')) {
					jQuery('#load_more_posts').css('display', 'block');
				}
				jQuery('.wp-pagenavi').hide();


				$mk_container.infinitescroll({
						navSelector: '.wp-pagenavi',
						nextSelector: '.wp-pagenavi a:first',
						itemSelector: $mk_container_item,
						bufferPx: 70,
						finishedMsg: mk_no_more_posts,
						loading: {
							finishedMsg: "",
							msg: null,
							msgText: "",
							selector: '#load_more_posts',
							speed: 300,
							start: undefined
						},
						errorCallback: function() {

							$('#load_more_posts').html(mk_no_more_posts);

						},

					},

					function(newElements) {

						var $newElems = jQuery(newElements);
						$newElems.imagesLoaded(function() {

							var selected_item = jQuery('.filter_portfolio').find('.current').attr('data-filter');

							$mk_container.isotope('appended', $newElems);
							$mk_container.isotope({
								filter: ''
							});
							$mk_container.isotope({
								filter: selected_item
							});

							$mk_container.isotope('reLayout');
							hover_effect();
							portfolio_hover();
							enable_lightbox(document);


						});
					}

				);



				/* Loading elements based on scroll window */
				if ($('.mk-theme-loop.isotop-enabled').hasClass('load-button-style')) {
					$(window).unbind('.infscr');
					$('#load_more_posts').click(function() {

						$mk_container.infinitescroll('retrieve');

						return false;

					});
				}

			} else {
				$('#load_more_posts').hide();
			}

		}
	}



	/* Fix isotop layout */
	/* -------------------------------------------------------------------- */

	function isotop_load_fix() {
		if (jQuery.exists('.blog_loop.isotop-enabled') || jQuery.exists('.mk-portfolio-loop')) {
			jQuery('.blog_loop.isotop-enabled>article, .mk-portfolio-loop>.portfolio_item').each(function(i) {
				jQuery(this).delay(i * 150).animate({
					'opacity': 1
				}, 100);

			}).promise().done(function() {
				setTimeout(function() {
					jQuery('.mk-theme-loop').isotope('reLayout');
				}, 1500);
			});
			setTimeout(function() {
				$('.mk-theme-loop').isotope('reLayout');
			}, 2500);
		}

	}



	/* reload elements on reload */
	/* -------------------------------------------------------------------- */

	if (jQuery.exists('.blog_loop.isotop-enabled') || jQuery.exists('.mk-portfolio-loop')) {
		jQuery(window).load(function() {
			jQuery(window).unbind('keydown');
			loops_iosotop_init();
			isotop_load_fix();
		});

		jQuery(window).on("debouncedresize", function() {
			jQuery('.mk-theme-loop').isotope('reLayout');
		});

	}



	jQuery(".contact_info .icon_email").each(function() {
		jQuery(this).attr('href', jQuery(this).attr('href').replace("*", "@"));
		jQuery(this).html(jQuery(this).html().replace("*", "@"));
	});



        /* Contact Form */
        /* -------------------------------------------------------------------- */

        function mk_contact_form() {

            if ($.tools.validator != undefined) {
                $.tools.validator.addEffect("contact_form", function(errors) {
                    $.each(errors, function(index, error) {
                        var input = error.input;

                        input.addClass('invalid');
                    });
                }, function(inputs) {
                    inputs.removeClass('invalid');
                });


                $('.contact_form').validator({
                    effect: 'contact_form'
                }).submit(function(e) {
                    var form = $(this);
                    if (!e.isDefaultPrevented()) {
                        $(this).find('.contact_loading').fadeIn('slow');
                        var data = {
                            action: 'mk_contact_form',
                            to: $(this).find('input[name="contact_to"]').val().replace("*", "@"),
                            name: $(this).find('input[name="contact_name"]').val(),
                            email: $(this).find('input[name="contact_email"]').val(),
                            content: $(this).find('textarea[name="contact_content"]').val()
                        };

                        $.post(ajaxurl, data, function(response) {
                                    form.find('.contact_loading').fadeOut('slow');
                                    form.parent().find('.success_message').delay(2000).fadeIn('slow').delay(8000).fadeOut();
                                    form.find('input#contact_email, input#contact_name, textarea').val("");
                            
                        });
                        e.preventDefault();
                    }
                });

            }
        }

        mk_contact_form();



});



(function($) {
	$.fn.preloader = function(options) {
		var settings = $.extend({}, $.fn.preloader.defaults, options);


		return this.each(function() {
			settings.beforeShowAll.call(this);
			var imageHolder = $(this);

			var images = imageHolder.find(settings.imgSelector).css({
				opacity: 0,
				visibility: 'hidden'
			});
			var count = images.length;
			var showImage = function(image, imageHolder) {
				if (image.data.source != undefined) {
					imageHolder = image.data.holder;
					image = image.data.source;
				};

				count--;
				if (settings.delay <= 0) {
					image.css('visibility', 'visible').animate({
						opacity: 1
					}, settings.animSpeed, function() {
						settings.afterShow.call(this)
					});
				}
				if (count == 0) {
					imageHolder.removeData('count');
					if (settings.delay <= 0) {
						settings.afterShowAll.call(this);
					} else {
						if (settings.gradualDelay) {
							images.each(function(i, e) {
								var image = $(this);
								setTimeout(function() {
									image.css('visibility', 'visible').animate({
										opacity: 1
									}, settings.animSpeed, function() {
										settings.afterShow.call(this)
									});
								}, settings.delay * (i + 1));
							});
							setTimeout(function() {
								settings.afterShowAll.call(imageHolder[0])
							}, settings.delay * images.length + settings.animSpeed);
						} else {
							setTimeout(function() {
								images.each(function(i, e) {
									$(this).css('visibility', 'visible').animate({
										opacity: 1
									}, settings.animSpeed, function() {
										settings.afterShow.call(this)
									});
								});
								setTimeout(function() {
									settings.afterShowAll.call(imageHolder[0])
								}, settings.animSpeed);
							}, settings.delay);
						}
					}
				}
			};

			if (count == 0) {
				settings.afterShowAll.call(this);
			} else {
				images.each(function(i) {
					settings.beforeShow.call(this);

					image = $(this);

					if (this.complete == true) {
						showImage(image, imageHolder);
					} else {
						image.bind('error load', {
							source: image,
							holder: imageHolder
						}, showImage);

					}
				});
			}


		});
	};



	//Default settings
	jQuery.fn.preloader.defaults = {
		delay: 1000,
		gradualDelay: true,
		imgSelector: 'img',
		animSpeed: 500,
		beforeShowAll: function() {},
		beforeShow: function() {},
		afterShow: function() {},
		afterShowAll: function() {}
	};



	jQuery(document).ready(function() {

		jQuery(window).scroll(function() {
			if (jQuery(this).scrollTop() > 300) {
				jQuery('#top-link').fadeIn();
			} else {
				jQuery('#top-link').fadeOut();
			}
		});

		jQuery('#top-link').click(function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		});



	});

	jQuery('#responsive_navigation select').prepend('<option value="" selected="selected">Select Menu</option>');

	jQuery("#responsive_navigation select").change(function() {
		window.location = jQuery(this).find("option:selected").val();
	});



	/* Parallax Backgrounds */
	/* -------------------------------------------------------------------- */

	if (mk_body_parallax == "true") {
		jQuery('body').parallax("50%", body_parallax_speed);
	}

	if (mk_page_parallax == "true") {
		jQuery('#theme-page').parallax("50%", page_parallax_speed);
	}



	jQuery('.mk-scroll-top').on('click', function() {
		jQuery('body').ScrollTo({
			duration: 3000,
			easing: 'easeOutQuart',
			durationMode: 'all'
		});
	})



	/* Nice Scroll */
	/* -------------------------------------------------------------------- */

	function mk_nice_scroll() {
		jQuery("html").niceScroll({
			scrollspeed: 50,
			mousescrollstep: 40,
			cursorwidth: 10,
			cursorborder: 0,
			cursorcolor: '#535353',
			cursorborderradius: 0,
			autohidemode: true,
			horizrailenabled: false,
			zindex: 9999
		});

	}
	if (jQuery(window).width() > 690 && jQuery('body').outerHeight(true) > jQuery(window).height() && mk_smooth_scroll == true) {
		mk_nice_scroll()
	}



})(jQuery);



function hover_effect() {
	jQuery('.image_container a.hover_effect').hover(function() {
		jQuery(".hover_icon", this).stop().animate({
			'right': 0,
			'bottom': 0
		}, 'slow', 'easeInOutExpo');
		jQuery(".image_overlay", this).stop().animate({
			opacity: '1'
		}, "slow");
	}, function() {
		jQuery(".hover_icon", this).stop().animate({
			'right': -43,
			'bottom': -43
		}, 'slow', 'easeInOutExpo');
		jQuery(".image_overlay", this).stop().animate({
			opacity: '0'
		}, "slow");
	})
}
hover_effect();


function portfolio_hover() {
	jQuery('#portfolios article').hover(function() {
		jQuery(".hover_icon", this).stop().animate({
			'right': 0,
			'bottom': 0
		}, 'slow', 'easeInOutExpo');
		jQuery(".portfolio_item_details", this).stop().animate({
			opacity: '1'
		}, "slow");
		jQuery(".portfolio_overlay", this).stop().animate({
			opacity: '0.8'
		}, "slow");
	}, function() {
		jQuery(".hover_icon", this).stop().animate({
			'right': -43,
			'bottom': -43
		}, 'slow', 'easeInOutExpo');
		jQuery(".portfolio_item_details", this).stop().animate({
			opacity: '0'
		}, "slow");
		jQuery(".portfolio_overlay", this).stop().animate({
			opacity: '0'
		}, "slow");
	})


}
portfolio_hover();



var enable_lightbox = function(parent) {



	jQuery(".lightbox").each(function() {

		jQuery(this).colorbox({
			opacity: 0.7,
			maxWidth: "95%",
			maxHeight: "90%",
			current: "",
			onComplete: function() {
				if (typeof Cufon !== "undefined") {
					Cufon.replace('#cboxTitle');
				}
			},
			onCleanup: function() {
				jQuery("#cboxLoadedContent").html('');

			}
		});
	});

	jQuery(".video_lightbox").each(function() {
		var $height, $width;
		var $iframe = jQuery(this).attr('data-video');
		if ($iframe == undefined || $iframe == 'false') {
			$iframe = false;
		} else {
			$iframe = true;
			$width = 600;
			$height = 480;
		}

		jQuery(this).colorbox({
			opacity: 0.7,
			innerWidth: $width,
			innerHeight: $height,
			iframe: $iframe,
			current: "",
			onComplete: function() {
				if (typeof Cufon !== "undefined") {
					Cufon.replace('#cboxTitle');
				}


			},
			onCleanup: function() {
				jQuery("#cboxLoadedContent").html('');
			}

		});



	});


};
enable_lightbox(document);


function generalSetSize() {
	/*	
			if(jQuery(window).width() < 480) {
			jQuery('.portfolios_simple_ver .portfolio_item img').each(function() {
			var portfolio_height = jQuery(this).height();
			jQuery(this).parents('.portfolios_simple_ver .portfolio_item, .portfolio_item_wrapper').css('height', portfolio_height);	

			})

			}*/

	if (jQuery(window).width() < 768) {
		jQuery('body').attr('id', 'iphoneHome');
		/*
			jQuery('.portfolios_simple_ver .portfolio_item img').each(function() {

			var portfolio_height = jQuery(this).height();
			jQuery(this).parents('.portfolios_simple_ver .portfolio_item, .portfolio_item_wrapper').css('height', portfolio_height);	

			})
*/
	} else if (jQuery(window).width() < 1024) {
		jQuery('body').attr('id', 'iPadHome');
	} else {
		jQuery('body').attr('id', 'home');

	}


}
generalSetSize();



jQuery(window).on("debouncedresize", function() {
	generalSetSize();
});


// On window load. This waits until images have loaded which is essential
jQuery(window).load(function() {

	// Fade in images so there isn't a color "pop" document load and then on window load
	jQuery(".grascale_enabled img").animate({
		opacity: 1
	}, 500);

	// clone image
	jQuery('.grascale_enabled img').each(function() {
		var el = jQuery(this);
		el.css({
			"position": "absolute"
		}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({
			"position": "absolute",
			"z-index": "180",
			"opacity": "0"
		}).insertBefore(el).queue(function() {
			var el = jQuery(this);
			el.parent().css({
				"width": this.width,
				"height": this.height
			});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});

	/*
		jQuery('.grascale_enabled img').mouseover(function(){
			jQuery(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
		})
		jQuery('.img_grayscale').mouseout(function(){
			jQuery(this).stop().animate({opacity:0}, 1000);
		});
		*/
});

// Grayscale w canvas method
function grayscale(src) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height;
	ctx.drawImage(imgObj, 0, 0);
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var y = 0; y < imgPixels.height; y++) {
		for (var x = 0; x < imgPixels.width; x++) {
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg;
			imgPixels.data[i + 1] = avg;
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
}