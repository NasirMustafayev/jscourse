"use strict";

//querySelectorAll.Choosing all objects which has same indicator(class name)
const modalBtns = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

//Functions for not repeatig and not messy looking codes
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Starting loop for interacting with all buttons
for (let i = 0; i < modalBtns.length; i++) {
  modalBtns[i].addEventListener("click", openModal);
}

//Clicking close button
closeBtn.addEventListener("click", closeModal);
//When you click in outside(overlay) of modal
overlay.addEventListener("click", closeModal);
