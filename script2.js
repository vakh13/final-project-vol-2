"use strict";

// burger bar

let navUl = document.querySelector(".nav-ul");
let burger = document.querySelector(".burger-div");

burger.addEventListener("click", function () {
  navUl.classList.toggle("active-ul");
  burger.classList.toggle("active-bar");
});

// header search icon
let searchInput = document.querySelector(".search-input");
let headerSearchIcon = document.querySelector(".search-icon");

headerSearchIcon.addEventListener("click", function () {
  searchInput.classList.toggle("active-search-input");
});

// header scroll (change color)
let header = document.querySelector(".full-header");

window.onscroll = function () {
  let top = window.scrollY;
  //   console.log(top);
  if (top >= 80) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

//  start Accordion
let accordionDivs = document.querySelectorAll(".accordion-div");
let accordionIcon = document.querySelectorAll(".accordion-icon");

accordionDivs.forEach((element) => {
  element.addEventListener("click", function () {
    this.classList.toggle("active-accordion-div");

    accordionIcon.forEach((icon) => {
      if (element.classList.contains("active-accordion-div")) {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      } else {
        icon.classList.add("fa-angle-up");
        icon.classList.remove("fa-angle-down");
      }
    });
  });
});

// galery image slider

let leftBtn = document.querySelector(".btn-left");
let rightBtn = document.querySelector(".btn-right");
let mainImg = document.querySelector(".main-img");
let smallImgs = document.querySelectorAll(".image-folder img");

let Images = ["1", "2", "3", "4"];
let counter = 0;

let blurImages = () => {
  smallImgs.forEach((img) => {
    img.style.opacity = "0.5";
  });
};

let moveLeft = () => {
  counter--;
  blurImages();
  if (counter < 0) {
    counter = smallImgs.length - 1;
  }
  mainImg.style.backgroundImage = `url(img/${Images[counter]}.jpg)`;
  smallImgs[counter].style.opacity = "1";
};
let moveRight = () => {
  counter++;
  blurImages();
  if (counter >= smallImgs.length) {
    counter = 0;
  }
  mainImg.style.backgroundImage = `url(img/${Images[counter]}.jpg)`;
  smallImgs[counter].style.opacity = "1";
};

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

smallImgs.forEach((img, index) => {
  img.addEventListener("click", function () {
    mainImg.style.backgroundImage = `url(${img.getAttribute("src")})`;
    blurImages();
    img.style.opacity = "1";
    counter = index;
  });
});

// start footer form fetch post

let form = document.querySelector(".footer-form");
let input = document.querySelector(".footeremail-input");
let SubBtn = document.querySelector(".subscribe-button");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValue = input.value;
  let formDara = {
    Email: inputValue,
  };
  fetch("https://reqres.in/api/users?page=1", {
    method: "POST",
    body: JSON.stringify(formDara),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => console.log(response))
    .then((subscribeEmail) => {
      if ((response.status = 201)) {
        form.submit;
        inputValue.innerHTML = " ";
      }
    })
    .catch((error) => {
      alert("Server Error");
    });
});