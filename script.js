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
// start slider
let sliderDiv = document.querySelector(".slider-div");
let sliderArray = ["5", "4", "3", "2"];
let sliderIndex = 0;

function slide() {
  sliderDiv.style.backgroundImage = `url(img/${sliderArray[sliderIndex]}.jpg)`;
}
slide();
function moveRight() {
  sliderIndex++;
  slide();
  if (sliderIndex == sliderArray.length - 1) {
    sliderIndex = 0;
    slide();
  }
}

setInterval(() => {
  moveRight();
}, 4000);
// start filter

let filterInput = document.querySelector(".filter-input");
let divContant = document.querySelector(".div-contant");
let filterPs = document.querySelectorAll(".filter-p");

function filter(searchItem) {
  filterPs.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("active-filter");
    } else {
      item.classList.add("active-filter");
    }
  });
}

filterInput.addEventListener("keyup", function (event) {
  filter(event.target.value);
  //   console.log(event.target.value);
});

// highlighting filter

function filter_highlight() {
  filterPs.forEach((x) => {
    let re = new RegExp(filterInput.value, "i");

    if (re.test(x.textContent)) {
      x.innerHTML = x.textContent.replace(re, "<b class=highlighter>$&</b>");
    }
  });
}
//  html-ის file-ში input-ს oninput="filter_highlight()"-ეს ატრიბუტი რისთვის არის საჭირო?

// start Cookies Popup

let cookiesPop = document.querySelector(".cookies-popup");
let cancelCookies = document.querySelector(".btn.cancel");
let acceptCookies = document.querySelector(".btn.accept");

cancelCookies.addEventListener("click", function () {
  cookiesPop.classList.remove("active-pop");
});

acceptCookies.addEventListener("click", function () {
  cookiesPop.classList.remove("active-pop");
  Cookies.set("usernamesUsernameValue", "usernameValue");
});

setTimeout(function () {
  let cookieAccept = Cookies.get("usernameValue");
  if (cookieAccept !== "usernamesUsernameValue") {
    cookiesPop.classList.add("active-pop");
  }
}, 2000);
// ver vxvdebi aq valiu rogor Sevinaxo rom refreshze popap agar amovardes

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