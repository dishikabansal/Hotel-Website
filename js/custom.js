
/*--------------------- Copyright (c) 2022 -----------------------
[Master Javascript]
Project: Affiliate Marketing html
-------------------------------------------------------------------*/
(function ($) {
	"use strict";
	var AffiliateMarketing = {
	  initialised: false,
	  version: 1.0,
	  mobile: false,
	  init: function () {
		if (!this.initialised) {
		  this.initialised = true;
		} else {
		  return;
		}
		/*-------------- Affiliate Marketing Functions Calling ---------------------------------------------------
		  ------------------------------------------------------------------------------------------------*/
		this.sticky_header();
		this.navbar();
		this.toggle_menu();
		this.service_showcase();
		this.room_gallery();
		this.newsletter_feedback();
		this.booking_summary();
		this.experience_filter();
		this.event_accordion();
		this.scroll_reveals();
	  },
  
	  /*-------------- Affiliate Marketing Functions Calling ---------------------------------------------------
		  --------------------------------------------------------------------------------------------------*/
	  
	  // sticky header
	  sticky_header: function () {
		$(window).scroll(function () {
		  var wh = window.innerWidth;
		  {
			var h = window.innerHeight;
			var window_top = $(window).scrollTop() + 1;
			if (window_top > 100) {
			  $(".pp-header-wrapper").addClass("pp-header-fixed animated fadeInDown");
			} else {
			  $(".pp-header-wrapper").removeClass("pp-header-fixed animated fadeInDown");
			}
		  }
		});
	  },
	  // sticky header
	  navbar: function() {
			  $('.as-CommonClass-navbar').on('click',function (e) {
				  var th = parseInt($(this).attr('top-h'), 10) || 0;
				  var target = this.hash,
					  $target = $(target);
	  
				  if ($target.length) {
					e.preventDefault();
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top - th
					}, 200, 'swing', function () {
						window.location.hash = target;
					});
				  }
				  $('body').removeClass('open');
				  $('.hs_toggle').attr('aria-expanded', 'false');
			  });
		  },
		  // toggle menu
		  toggle_menu: function () {
			var $toggle = $(".hs_toggle");
			if (!$toggle.length) {
				return;
			}
			$toggle.on("click", function () {
			  $("body").toggleClass("open");
			  var expanded = $("body").hasClass("open");
			  $toggle.attr("aria-expanded", expanded);
			});
		  },
		  // toggle menu
		  service_showcase: function () {
			var $cards = $("#service-cards .hs_section2_item"),
				$title = $("#serviceDetailsTitle"),
				$copy = $("#serviceDetailsCopy"),
				$cta = $("#serviceDetailsCta"),
				$illus = $("#serviceDetailsIllustration");

			if (!$cards.length || !$title.length) {
				return;
			}

			$cards.attr("tabindex", "0");

			var updateDetails = function ($card) {
				var title = $card.data("title") || $card.find("h3").text(),
					copy = $card.data("copy") || $card.find("p").text(),
					link = $card.data("link") || "#contact",
					icon = $card.find("img").attr("src");

				$cards.removeClass("active");
				$card.addClass("active");
				$title.text(title);
				$copy.text(copy);
				$cta.attr("href", link);
				if ($illus.length && icon) {
					$illus.attr("src", icon).attr("alt", title);
				}
			};

			$cards.on("click", function () {
				updateDetails($(this));
			}).on("keypress", function (e) {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					updateDetails($(this));
				}
			});

			updateDetails($cards.first());
		  },
		  room_gallery: function () {
			var $cards = $("#room-cards .hs_section5_item"),
				$img = $("#roomPreviewImage"),
				$title = $("#roomPreviewTitle"),
				$copy = $("#roomPreviewCopy");

			if (!$cards.length || !$img.length) {
				return;
			}

			var updateRoom = function ($card) {
				var img = $card.data("img"),
					title = $card.data("title"),
					copy = $card.data("copy");

				if (img) {
					$img.attr("src", img).attr("alt", title);
				}
				if (title) {
					$title.text(title);
				}
				if (copy) {
					$copy.text(copy);
				}

				$cards.removeClass("active");
				$card.addClass("active");
			};

			$cards.on("click", function (e) {
				e.preventDefault();
				updateRoom($(this));
			});

			updateRoom($cards.first());
		  },
		  newsletter_feedback: function () {
			var $form = $("#newsletter-form"),
				$status = $("#newsletter-status"),
				timer;

			if (!$form.length) {
				return;
			}

			$form.on("submit", function (e) {
				e.preventDefault();
				var email = $.trim($("#newsletter-email").val());

				if (!email) {
					$status.text("Please enter a valid email to subscribe.");
					return;
				}

				clearTimeout(timer);

				$status.text("You're subscribed, " + email + "! We’ll send curated updates soon.");
				$form[0].reset();

				timer = setTimeout(function () {
					$status.fadeOut(200, function () {
						$(this).text("").show();
					});
				}, 4000);
			});
		  },
		  booking_summary: function () {
			var $form = $("#booking-form");
			if (!$form.length) {
				return;
			}

			var $status = $("#booking-status"),
				$checkin = $("#checkin"),
				$checkout = $("#checkout"),
				$guests = $("#guests"),
				$room = $("#roomType"),
				$purpose = $("#stayPurpose"),
				$addons = $("#addons"),
				timer;

			var rates = {
				"Harbor King": 270,
				"Extended Stay Loft": 340,
				"Signature Suite": 420,
				"Deluxe Twin": 300
			};

			var updateSummary = function () {
				var checkinVal = $checkin.val(),
					checkoutVal = $checkout.val(),
					room = $room.val(),
					purpose = $purpose.val(),
					guestCount = parseInt($guests.val(), 10) || 2,
					addonText = $.trim($addons.val());

				$("#summary-title").text(room + " · " + purpose);

				if (checkinVal && checkoutVal) {
					var nights = Math.max(1, Math.round((new Date(checkoutVal) - new Date(checkinVal)) / (1000 * 60 * 60 * 24)));
					var rate = rates[room] || 320;
					$("#summary-dates").text(nights + " night" + (nights > 1 ? "s" : ""));
					$("#summary-total").text("$" + (nights * rate));
				} else {
					$("#summary-dates").text("Select dates");
					$("#summary-total").text("$540");
				}

				$("#summary-guests").text(guestCount + " guest" + (guestCount > 1 ? "s" : ""));

				if (addonText) {
					$("#summary-note").text(addonText);
				} else {
					$("#summary-note").text("Tell us about transfers, pantry, or meeting needs and we’ll confirm within 4 business hours.");
				}
			};

			$form.find("input, select, textarea").on("change keyup", updateSummary);
			updateSummary();

			$form.on("submit", function (e) {
				e.preventDefault();
				var emailCapture = "concierge@harborsuites.com";
				$status.text("Thanks! A curated itinerary will be sent from " + emailCapture + " within 4 business hours.");
				this.reset();
				updateSummary();

				clearTimeout(timer);
				timer = setTimeout(function () {
					$status.fadeOut(200, function () {
						$(this).text("").show();
					});
				}, 5000);
			});
		  },
		  experience_filter: function () {
			var $filterWrap = $("#experience-filters"),
				$cards = $("#experience-grid .experience-card");

			if (!$filterWrap.length) {
				return;
			}

			$filterWrap.find("button").on("click", function () {
				var filter = $(this).data("filter");
				$filterWrap.find("button").removeClass("active");
				$(this).addClass("active");

				if (filter === "all") {
					$cards.show();
					return;
				}

				$cards.each(function () {
					var $card = $(this),
						category = $card.data("category");
					$card.toggle(category === filter);
				});
			});
		  },
		  event_accordion: function () {
			var $triggers = $("#event-accordion .accordion-trigger");
			if (!$triggers.length) {
				return;
			}
			$triggers.on("click", function () {
				var $trigger = $(this),
					$panel = $trigger.next(".accordion-panel"),
					isOpening = !$trigger.hasClass("active");

				$triggers.removeClass("active").find(".chevron").text("+");
				$("#event-accordion .accordion-panel").slideUp(200);

				if (isOpening) {
					$trigger.addClass("active");
					$trigger.find(".chevron").text("–");
					$panel.slideDown(200);
				}
			});
		  },
		  scroll_reveals: function () {
			var autoSelectors = [
				".hs_banner_content",
				".banner_img",
				".hs_page_hero_content",
				".hs_section_heading",
				".hs_section2_item",
				".hs_service_details",
				".hs_section3_item",
				".hs_section5_item",
				".hs_room_preview",
				".hs_section4_item",
				".hs_multi_page_grid article",
				".hs_steps_grid article",
				".hs_booking_form",
				".hs_booking_summary",
				".hs_addons_grid article",
				".experience-card",
				".hs_city_guide_grid article",
				".hs_venues_grid article",
				".hs_event_stat_grid article",
				".hs_section8_item"
			];

			$(autoSelectors.join(",")).each(function () {
				var $el = $(this);
				if (!$el.hasClass("hs_reveal")) {
					$el.addClass("hs_reveal");
				}
			});

			var $reveals = $(".hs_reveal");
			if (!$reveals.length) {
				return;
			}
			if ("IntersectionObserver" in window) {
				var observer = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							$(entry.target).addClass("in-view");
							observer.unobserve(entry.target);
						}
					});
				}, { threshold: 0.1 });

				$reveals.each(function () {
					observer.observe(this);
				});
			} else {
				$reveals.addClass("in-view");
			}
		  }
	};
	AffiliateMarketing.init();
  })(jQuery);
