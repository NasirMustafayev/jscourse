"use strict";

///////////////////////////////////////

//Elements
const header = document.querySelector(".header");

const modalSignUp = document.querySelector("#signupmodal");
const modalLogin = document.querySelector("#loginmodal");
const overlay = document.querySelector(".overlay");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const btnsOpenSignUpModal = document.querySelectorAll("#signup");
const btnOpenLoginModal = document.querySelector("#login");

const buttonLearnMore = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");

const nav = document.querySelector("nav");
const navLink = document.querySelectorAll(".nav__link");
const navLinks = document.querySelector(".nav__links");
const logo = document.querySelector(".nav__logo");

const tabButtons = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

const imgsLazy = document.querySelectorAll("img[data-src]");

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
//----------------------------------------------------//

// Modal window

//Registration and Login modal
const openSignUpModal = function (e) {
  e.preventDefault();
  modalSignUp.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openLoginModal = function (e) {
  e.preventDefault();
  modalLogin.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modalSignUp.classList.add("hidden");
  modalLogin.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenSignUpModal.forEach((button) => button.addEventListener("click", openSignUpModal));
btnOpenLoginModal.addEventListener("click", openLoginModal);

btnsCloseModal.forEach(button => button.addEventListener("click", closeModal));
overlay.addEventListener("click", closeModal);

const KeydownHidden = function (modal) {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  })
};

KeydownHidden(modalSignUp);
KeydownHidden(modalLogin);


//----------------------------------------------------//

//Cookie message

// const cookieMessage = document.createElement("div");
// cookieMessage.classList.add("cookie-message");
// cookieMessage.innerHTML =
//   "We use cookies for better user experience <button class='btn btn--close--cookie'>Alright!</button>";

// // header.prepend(cookieMessage);//First of parent element's inisde
// // header.append(cookieMessage);//Last of parent element's inisde
// // header.after(cookieMessage);//After the parent element
// header.before(cookieMessage); //Before the paerent element

// //Close cookie message
// const btnCloseCookie = document.querySelector(".btn--close--cookie");

// btnCloseCookie.addEventListener("click", () => {
//   cookieMessage.remove();
// });

//----------------------------------------------------//

//Smooth scrool

const scrollSmooth = function (btn, target) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
};

scrollSmooth(buttonLearnMore, section1);

// scrollSmooth(navLink[0], section1);
// scrollSmooth(navLink[1], section2);
// scrollSmooth(navLink[2], section3);

//Other Solution for Navigation bar links

//Solution 2(Generated by Chatgpt Explained by Me)

//Because of we have bunch of nav__link we use forEach to loop over them
/*navLink.forEach((link) => {
  //Adding Event listener to each them
  link.addEventListener("click", (event) => {
    //Preveting default behaivor of anchors(<a href></a>)
    event.preventDefault();
    //Getting href from anchor for know where to actually scroll.
    //We use "target" keyword for know which element we are actually processing
    const sectionId = event.target.getAttribute("href");

    //Selecting section we want to scroll
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  });
});*/

//Solution 3 Final. With usign of Bubbling and Delegation

//We simply use Bubbling effect for this solution
//With that we dont need copy same event liseteners all over the target elements

navLinks.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.classList.contains("nav__link")) {
    const sectionId = event.target.getAttribute("href");
    if (sectionId != "#") {
      const section = document.querySelector(sectionId);
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
})

//----------------------------------------------------//

//Tab component

tabContainer.addEventListener("click", (event) => {
  //Effective method of founding closest parent
  const clickedTabButton = event.target.closest(".operations__tab");

  //Guard clause. Checking if button really clicked
  if (!clickedTabButton) return;

  //For attaching this button selecting style to only clicked button
  //We first remove "active" class from all buttons
  tabButtons.forEach(tabbut => tabbut.classList.remove("operations__tab--active"))

  //Then we only add this "active" class to clicked button
  clickedTabButton.classList.add("operations__tab--active");

  //Selecting Content element based on Clicked button's Data-tab attribute
  //dataset is using for attributes start with "data" key(data-tab)
  //Same functionality getAttributes also can be used
  const selectedContentTab = document.querySelector(`.operations__content--${clickedTabButton.dataset.tab}`)

  //Removing "active" class from all table contents
  tabContent.forEach(tabcon => tabcon.classList.remove("operations__content--active"))
  selectedContentTab.classList.add("operations__content--active");
})

//----------------------------------------------------//

//Nav links hover

//We create function for this functionality for not repeating our self
const hoverHandler = function (event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    //Selecting sibling elements of target element. So then we can control opacity of siblings
    const siblings = event.target.closest(".nav").querySelectorAll(".nav__link");

    //Looping over siblings for adding opacity value to style
    siblings.forEach(nav => {
      //Except target element(mouseovered element) itself
      if (nav !== event.target) nav.style.opacity = opacity
    });

    //Adding opacity value to logo also
    logo.style.opacity = opacity;
  }
}

//Mouse on nav links
nav.addEventListener("mouseover", event => hoverHandler(event, 0.5));

//Mouse out of nav links
nav.addEventListener("mouseout", event => hoverHandler(event, 1));

//----------------------------------------------------//

//Sticky navigation bar

//Sticky navigation with IntersectionObserver
//Most basic type
//Getting dynamic size of navbar height
const getDynamicNavbarSize = nav.getBoundingClientRect().height

//Callback function of our observer
const stickyNav = function (entries) {
  //If target element not intersecting much as our threshold value then stick navbar
  if (!entries[0].isIntersecting) nav.classList.add("sticky");
  //If it is remove sticky class
  else nav.classList.remove("sticky");
};

//Creating our new observer here
const headerObserver = new IntersectionObserver(stickyNav, {
  //Defining viewpor. Its can be parent element of target or entire viewport(screen)
  //We use "null" here for entire display
  root: null,
  //Threshold is basically how much percentage need to target element visible in screen for triggering callback function
  threshold: 0,
  rootMargin: `-${getDynamicNavbarSize}px`
});

//Observer start for "header" element
headerObserver.observe(header);

//----------------------------------------------------//

//Revealing elements on scroll

const revealSection = function (entries, observer) {

  const [entry] = entries;
  if (!entry.isIntersecting) return

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2
});

allSections.forEach(section => {
  sectionObserver.observe(section);
})

//----------------------------------------------------//

//Lazy load images

const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  })
  observer.unobserve(entry.target);
}

const imgOberserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0.4
});

imgsLazy.forEach(imgs => {
  imgOberserver.observe(imgs);
});

//----------------------------------------------------//

//Slider

const sliderStart = function () {

  let currentSlide = 0;
  const maxSlide = slides.length;

  //Go to slide
  const goToSlide = function (slide) {
    slides.forEach((slider, index) => slider.style.transform =
      `translateX(${100 * (index - slide)}%)`
    )
  }


  //Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activeDotEffect(currentSlide)

  }

  //Previous slide
  const previousSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    activeDotEffect(currentSlide)

  }

  //Create slider dots
  const createDots = function () {
    slides.forEach((_, index) => {
      dots.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
    })
  }

  //Active dot effect
  const activeDotEffect = function (slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => {
      dot.classList.remove("dots__dot--active");

      document.querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    })

  }

  //Initial slider values
  const init = function () {
    goToSlide(0);
    createDots();
    activeDotEffect(0)
  }

  init();

  //Event handlers

  //Contol buttons handlers
  sliderBtnRight.addEventListener("click", nextSlide)
  sliderBtnLeft.addEventListener("click", previousSlide)

  //Arrow keys control handler
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextSlide();
    else if (event.key === "ArrowLeft") previousSlide();
  })

  //Slider dots handler
  dots.addEventListener("click", (event) => {
    if (event.target.classList.contains("dots__dot")) {
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activeDotEffect(slide)
    }
  })

  //Autoplay slider

  //Default initial interval
  let autoPlaySlider = setInterval(nextSlide, 5000);

  //When mouse over slider
  slider.addEventListener("mouseover", () => {
    clearInterval(autoPlaySlider)
  });
  //When mouse out slider go back to initial value
  slider.addEventListener("mouseout", () => {
    autoPlaySlider = setInterval(nextSlide, 5000)
  })
}
sliderStart();