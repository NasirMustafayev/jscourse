"use strict";

///////////////////////////////////////

//Elements
const header = document.querySelector(".header");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const buttonLearnMore = document.querySelector(".btn--scroll-to");
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

//----------------------------------------------------//

// Modal window

//Registration modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

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
    const section = document.querySelector(sectionId);

    section.scrollIntoView({ behavior: "smooth" });
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
//Getting coordinates of section1.
//Because we want to navbar get sticked to screen when we want to scroll and reach here
// const initCoordinate = section1.getBoundingClientRect();

// window.addEventListener("scroll", () => {
//   //If scrolled area's "Y" coordinate bigger or equal to "section1"'s top coordinate
//   if (window.scrollY >= initCoordinate.top)
//     //Getting sticked
//     nav.classList.add("sticky");
//   //Remove sticky navbar when we go back to top of page
//   //Basically if above condition couldn't fulfilled
//   else nav.classList.remove("sticky");
// })

//Sticky navigation with IntersectionObserver
//Most basic type
//Getting dynamic size of navbar height
const getDynamicNavbarSize = nav.getBoundingClientRect().height

//Callback function of our observer
const callback = function (entries) {
  //If target element not intersecting much as our threshold value then stick navbar
  if (!entries[0].isIntersecting) nav.classList.add("sticky");
  //If it is remove sticky class
  else nav.classList.remove("sticky");
};

//Creating our new observer here
const observer = new IntersectionObserver(callback, {
  //Defining viewpor. Its can be parent element of target or entire viewport(screen)
  //We use "null" here for entire display
  root: null,
  //Threshold is basically how much percentage need to target element visible in screen for triggering callback function
  threshold: 0,
  rootMargin: `-${getDynamicNavbarSize}px`
});

//Observer start for "header" element
observer.observe(header);