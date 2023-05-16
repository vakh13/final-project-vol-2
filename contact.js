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
  
  if (top >= 80) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};



fetch("https://reqres.in/api/users?page=1", {
  method: "GET",
})
  .then(function (customerInfo) {
    return customerInfo.json();
  })
  .then(function (customerInfoJS) {
    console.log(customerInfoJS);
    let customerBox = document.querySelector(".customers-info");
    customerInfoJS.data.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("single-customer");
      let li = document.createElement("li");
      li.textContent = `${element.first_name} ${element.last_name}`;
      let img = document.createElement("img");
      img.setAttribute("src", `${element.avatar}`);

      let ul = document.createElement("ul");
      ul.classList.add("customer-ul");

      let p = document.createElement("p");
      p.textContent =
      
      div.appendChild(img);
      div.appendChild(ul);
      ul.appendChild(li);
      div.appendChild(p);
      customerBox.appendChild(div);
    });
  })
  .catch(function (error) {
    let p = document.createElement("p");
    p.textContent = "Server Error";
    let customerBox = document.querySelector(".customers-info");
    p.appendChild(customerBox);
  });



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
      inputValue.innerHTML = " ";
    });
  
});