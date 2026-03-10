/**
 * ConsultingBiz - Main JavaScript
 * Version: 2.0.0
 * Bootstrap 5.3.8 + Vanilla JS
 */

// ========================================
// AOS Initialization (OUTSIDE DOMContentLoaded)
// Scripts are at bottom of body, so this runs immediately
// ========================================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  window.addEventListener('load', function() {
    AOS.refresh();
  });
}

// ========================================
// Main Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initPreloader();
  initStickyHeader();
  initBackToTop();
  initMobileMenu();
  initBackgroundImages();
  initHeroSlider();
  initTestimonialSlider();
  initBrandSlider();
  initCounterAnimation();
  initLightbox();
  initContactForm();
  initSmoothScroll();
  initPricingToggle();
  initPortfolioFilter();
});

// ========================================
// Preloader
// ========================================
function initPreloader() {
  var preloader = document.getElementById('preloader-active');
  if (!preloader) return;

  window.addEventListener('load', function() {
    setTimeout(function() {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 600);
      document.body.style.overflow = 'visible';
    }, 450);
  });
}

// ========================================
// Sticky Header
// ========================================
function initStickyHeader() {
  var header = document.querySelector('.header-sticky');
  var backTop = document.getElementById('back-top');
  if (!header) return;

  function handleScroll() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll > 400) {
      header.classList.add('sticky-bar');
      if (backTop) backTop.style.display = 'block';
    } else {
      header.classList.remove('sticky-bar');
      if (backTop) backTop.style.display = 'none';
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// ========================================
// Back to Top
// ========================================
function initBackToTop() {
  var backTop = document.querySelector('#back-top a');
  if (!backTop) return;

  backTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// Mobile Menu (SlickNav Replacement)
// ========================================
function initMobileMenu() {
  var navigation = document.getElementById('navigation');
  var mobileMenuContainer = document.querySelector('.mobile_menu');
  if (!navigation || !mobileMenuContainer) return;

  // Clone navigation for mobile
  var mobileNav = navigation.cloneNode(true);
  mobileNav.id = 'mobile-navigation';
  mobileNav.classList.add('mobile-nav');

  // Create toggle button
  var toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-menu-toggle';
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';
  toggleBtn.setAttribute('aria-label', 'Toggle mobile menu');

  // Create mobile menu wrapper
  var mobileWrapper = document.createElement('div');
  mobileWrapper.className = 'mobile-menu-wrapper';
  mobileWrapper.appendChild(mobileNav);

  mobileMenuContainer.appendChild(toggleBtn);
  mobileMenuContainer.appendChild(mobileWrapper);

  // Toggle functionality
  toggleBtn.addEventListener('click', function() {
    mobileWrapper.classList.toggle('open');
    toggleBtn.classList.toggle('active');
  });

  // Handle submenu toggles
  var itemsWithSubmenu = mobileNav.querySelectorAll('li > ul.submenu');
  itemsWithSubmenu.forEach(function(submenu) {
    var parent = submenu.parentElement;
    var link = parent.querySelector(':scope > a');

    var subToggle = document.createElement('span');
    subToggle.className = 'submenu-toggle';
    subToggle.textContent = '+';
    parent.insertBefore(subToggle, submenu);

    subToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      submenu.classList.toggle('open');
      subToggle.textContent = submenu.classList.contains('open') ? '-' : '+';
    });
  });

  // Close on link click (but not submenu toggle)
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href !== '#') {
        mobileWrapper.classList.remove('open');
        toggleBtn.classList.remove('active');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (mobileWrapper.classList.contains('open') &&
        !mobileWrapper.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
      mobileWrapper.classList.remove('open');
      toggleBtn.classList.remove('active');
    }
  });
}

// ========================================
// Background Images from data-background
// ========================================
function initBackgroundImages() {
  document.querySelectorAll('[data-background]').forEach(function(el) {
    var bg = el.getAttribute('data-background');
    if (bg) {
      el.style.backgroundImage = 'url(' + bg + ')';
    }
  });
}

// ========================================
// Hero Slider (Swiper)
// ========================================
function initHeroSlider() {
  var heroEl = document.querySelector('.slider-active');
  if (!heroEl || typeof Swiper === 'undefined') return;

  // Wrap slides if not already wrapped
  wrapSwiperSlides(heroEl, '.single-slider');

  var heroSwiper = new Swiper('.slider-active', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoplay: false,
    navigation: {
      nextEl: '.slider-active .swiper-button-next',
      prevEl: '.slider-active .swiper-button-prev'
    },
    on: {
      init: function() {
        triggerSlideAnimations(this);
      },
      slideChangeTransitionStart: function() {
        resetSlideAnimations(this);
      },
      slideChangeTransitionEnd: function() {
        triggerSlideAnimations(this);
      }
    }
  });

  function triggerSlideAnimations(swiper) {
    var activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    var animatedEls = activeSlide.querySelectorAll('[data-animation]');
    animatedEls.forEach(function(el) {
      var animation = el.dataset.animation;
      var delay = el.dataset.delay || '0s';
      el.style.animationDelay = delay;
      el.style.webkitAnimationDelay = delay;
      el.classList.add('animated', animation);
    });
  }

  function resetSlideAnimations(swiper) {
    swiper.slides.forEach(function(slide) {
      var animatedEls = slide.querySelectorAll('[data-animation]');
      animatedEls.forEach(function(el) {
        var animation = el.dataset.animation;
        el.classList.remove('animated', animation);
      });
    });
  }
}

// ========================================
// Testimonial Slider (Swiper)
// ========================================
function initTestimonialSlider() {
  var testimonialEl = document.querySelector('.h1-testimonial-active');
  if (!testimonialEl || typeof Swiper === 'undefined') return;

  // Wrap slides if not already wrapped
  wrapSwiperSlides(testimonialEl, '.single-testimonial');

  new Swiper('.h1-testimonial-active', {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    autoplay: false,
    navigation: {
      nextEl: '.h1-testimonial-active .swiper-button-next',
      prevEl: '.h1-testimonial-active .swiper-button-prev'
    }
  });
}

// ========================================
// Brand Slider (Swiper)
// ========================================
function initBrandSlider() {
  var brandEl = document.querySelector('.brand-active');
  if (!brandEl || typeof Swiper === 'undefined') return;

  // Wrap slides if not already wrapped
  wrapSwiperSlides(brandEl, '.single-brand');

  new Swiper('.brand-active', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      992: { slidesPerView: 4, spaceBetween: 30 },
      1200: { slidesPerView: 5, spaceBetween: 30 }
    }
  });
}

// ========================================
// Helper: Wrap Swiper Slides
// ========================================
function wrapSwiperSlides(container, slideSelector) {
  if (container.querySelector('.swiper-wrapper')) return;

  var slides = container.querySelectorAll(slideSelector);
  if (!slides.length) return;

  var wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  slides.forEach(function(slide) {
    slide.classList.add('swiper-slide');
    wrapper.appendChild(slide);
  });

  container.insertBefore(wrapper, container.firstChild);

  // Add navigation buttons if they don't exist
  if (!container.querySelector('.swiper-button-prev')) {
    var prevBtn = document.createElement('div');
    prevBtn.className = 'swiper-button-prev';
    prevBtn.innerHTML = '<i class="ti-angle-left"></i>';
    container.appendChild(prevBtn);
  }

  if (!container.querySelector('.swiper-button-next')) {
    var nextBtn = document.createElement('div');
    nextBtn.className = 'swiper-button-next';
    nextBtn.innerHTML = '<i class="ti-angle-right"></i>';
    container.appendChild(nextBtn);
  }
}

// ========================================
// Counter Animation (IntersectionObserver)
// ========================================
function initCounterAnimation() {
  var counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  var animated = new Set();

  function animateCounter(el) {
    var target = parseInt(el.textContent.replace(/,/g, ''), 10);
    if (isNaN(target)) return;

    var duration = 2000;
    var startTime = null;

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smoother animation
      var easeOutQuad = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(easeOutQuad * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !animated.has(entry.target)) {
        animated.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

// ========================================
// Lightbox (GLightbox)
// ========================================
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  // Image lightbox
  var imgLightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true
  });

  // Also handle old Magnific Popup classes for backwards compatibility
  var imgPopup = GLightbox({
    selector: '.img-pop-up',
    touchNavigation: true,
    loop: true
  });

  // Video popup
  var videoLightbox = GLightbox({
    selector: '.popup-video',
    touchNavigation: true
  });
}

// ========================================
// Contact Form (Vanilla JS with HTML5 Validation)
// ========================================
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  // Generate CSRF token on page load
  var csrfField = form.querySelector('#csrf_token');
  if (csrfField) {
    csrfField.value = generateCSRFToken();
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form fields
    var name = form.querySelector('#name');
    var email = form.querySelector('#email');
    var message = form.querySelector('#message');
    var subject = form.querySelector('#subject');
    var isValid = true;

    // Clear previous errors
    form.querySelectorAll('.is-invalid').forEach(function(el) {
      el.classList.remove('is-invalid');
    });

    // Validate required fields
    if (name && !name.value.trim()) {
      name.classList.add('is-invalid');
      isValid = false;
    }

    if (email) {
      if (!email.value.trim()) {
        email.classList.add('is-invalid');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      }
    }

    if (message && !message.value.trim()) {
      message.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Submit form via fetch
    var formData = new FormData(form);
    var submitBtn = form.querySelector('[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.success) {
        form.reset();
        // Regenerate CSRF token after successful submission
        if (csrfField) {
          csrfField.value = generateCSRFToken();
        }
        showFormMessage(form, data.message, 'success');
      } else {
        showFormMessage(form, data.message || 'Error sending message.', 'error');
      }
    })
    .catch(function() {
      showFormMessage(form, 'Error sending message. Please try again.', 'error');
    })
    .finally(function() {
      if (submitBtn) {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  });

  function generateCSRFToken() {
    // Generate a random token using crypto API
    var array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, function(byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(form, message, type) {
    var existingMsg = form.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    var msgEl = document.createElement('div');
    msgEl.className = 'form-message alert alert-' + (type === 'success' ? 'success' : 'danger');
    msgEl.textContent = message;
    form.appendChild(msgEl);

    setTimeout(function() {
      msgEl.remove();
    }, 5000);
  }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#0') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header-sticky') ?
          document.querySelector('.header-sticky').offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Pricing Toggle (Monthly/Yearly)
// ========================================
function initPricingToggle() {
  var toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  var monthlyLabel = document.querySelector('.monthly-label');
  var yearlyLabel = document.querySelector('.yearly-label');
  var saveBadge = document.querySelector('.save-badge');
  var prices = document.querySelectorAll('.pricing-price .price');
  var periods = document.querySelectorAll('.pricing-price .period');

  toggle.addEventListener('change', function() {
    var isYearly = this.checked;

    // Update labels
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

    // Show/hide save badge
    if (saveBadge) saveBadge.classList.toggle('show', isYearly);

    // Update prices with animation
    prices.forEach(function(priceEl) {
      var amount = priceEl.querySelector('.amount');
      if (!amount) return;

      var monthlyPrice = priceEl.getAttribute('data-monthly');
      var yearlyPrice = priceEl.getAttribute('data-yearly');

      // Add animation class
      amount.style.opacity = '0';
      amount.style.transform = 'translateY(-10px)';

      setTimeout(function() {
        amount.textContent = isYearly ? yearlyPrice : monthlyPrice;
        amount.style.opacity = '1';
        amount.style.transform = 'translateY(0)';
      }, 150);
    });

    // Update period text
    periods.forEach(function(period) {
      period.textContent = isYearly ? '/month (billed yearly)' : '/month';
    });
  });

  // Also allow clicking on labels to toggle
  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', function() {
      toggle.checked = false;
      toggle.dispatchEvent(new Event('change'));
    });
  }

  if (yearlyLabel) {
    yearlyLabel.addEventListener('click', function() {
      toggle.checked = true;
      toggle.dispatchEvent(new Event('change'));
    });
  }
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
  var filterBtns = document.querySelectorAll('.portfolio-filter .filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      // Get filter value
      var filter = this.getAttribute('data-filter');

      // Filter items
      portfolioItems.forEach(function(item) {
        var category = item.getAttribute('data-category');

        if (filter === '*' || filter === category) {
          item.style.display = '';
          item.classList.remove('hidden');
        } else {
          item.style.display = 'none';
          item.classList.add('hidden');
        }
      });

      // Refresh AOS animations
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  });
}
