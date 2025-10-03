jQuery(function($) {

	/* =============== SHOW / HIDE GO TO TOP =============== */
	/* Check to see if the window is top if not then display go top button */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('#nino-scrollToTop').fadeIn();
		} else {
			$('#nino-scrollToTop').fadeOut();
		}
	});
	/* Click event to scroll to top */
	$('#nino-scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	/* =============== EXPERIENCE TABS =============== */
	$('.tab-button').click(function() {
		const targetTab = $(this).data('tab');
		
		// Remove active class from all buttons and panels
		$('.tab-button').removeClass('active');
		$('.tab-panel').removeClass('active');
		
		// Add active class to clicked button and corresponding panel
		$(this).addClass('active');
		$('#' + targetTab).addClass('active');
	});

	/* =============== SMOOTH SCROLLING =============== */
	$('#mainMenu a[href^="#"]').click(function(e) {
		e.preventDefault();
		const targetId = $(this).attr('href');
		const targetSection = $(targetId);
		
		if (targetSection.length) {
			const offsetTop = targetSection.offset().top - 80; // Account for fixed nav
			$('html, body').animate({
				scrollTop: offsetTop
			}, 800);
		}
	});

	/* =============== ACTIVE NAVIGATION =============== */
	$(window).scroll(function() {
		const sections = $('.content-section, .hero-section');
		const navLinks = $('#mainMenu a[href^="#"]');
		
		let current = '';
		sections.each(function() {
			const sectionTop = $(this).offset().top - 100;
			if ($(window).scrollTop() >= sectionTop) {
				current = $(this).attr('id');
			}
		});

		navLinks.removeClass('active');
		navLinks.filter('[href="#' + current + '"]').addClass('active');
	});
});