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

// start reservation Form validation
let form = document.querySelector(".reservation-form");
let UsernameInput = document.querySelector(".username-input");
let emailInput = document.querySelector(".email-input");
let passwordInput = document.querySelector(".password-input");
let confirmPassword = document.querySelector(".confirm-pass-input");
let errorMessages = document.querySelectorAll(".error-msg");

// username Validation
let validateUsername = function () {
  let usernameValue = UsernameInput.value;
  let formField = document.querySelector(".form-field-username");
  let errorUSerIcons = document.querySelector(".username-error-icon");
  errorMessages.forEach((msg) => {
    if (usernameValue === "") {
      formField.classList.add("error-field");
      msg.textContent = "Required";
    } else {
      formField.classList.add("success");
      errorUSerIcons.classList.remove("fa-circle-exclamation");
      errorUSerIcons.classList.add("fa-circle-check");
    }
  });
};

// start cookies
let cookiesFunction = function () {
  let checkbox = document.querySelector(".username-checkbox");
  if (checkbox.checked) {
    let usernameValue = UsernameInput.value;
    Cookies.set("usernamesUsernameValue", usernameValue);
  } else {
    Cookies.remove("usernamesUsernameValue");
  }
};

let cookiesUsername = Cookies.get("usernamesUsernameValue");
if (cookiesUsername) {
  UsernameInput.value = cookiesUsername;
  document.querySelector(".username-checkbox").checked = true;
}
// email Validation
let validateEmail = function () {
  let EmailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let emailValue = emailInput.value;
  let formFieldEmail = document.querySelector(".form-field-email");
  let errorEmailIcons = document.querySelector(".email-error-icon");
  errorMessages.forEach((msg) => {
    if (emailValue !== "" && emailValue.match(EmailPattern)) {
      formFieldEmail.classList.add("success");
      errorEmailIcons.classList.remove("fa-circle-exclamation");
      errorEmailIcons.classList.add("fa-circle-check");
    } else {
      formFieldEmail.classList.add("error-field");
      msg.textContent = "Required";
    }
  });
};

// password validation
let validatPassword = function () {
  let passwordValue = passwordInput.value;
  let fieldPassword = document.querySelector(".form-field-password");
  let errorPassIcon = document.querySelector(".pass-error-icon");
  errorMessages.forEach((msg) => {
    if (passwordValue === "") {
      fieldPassword.classList.add("error-field");
      msg.textContent = "Required";
    } else {
      fieldPassword.classList.add("success");
      errorPassIcon.classList.remove("fa-circle-exclamation");
      errorPassIcon.classList.add("fa-circle-check");
    }
  });
  let visibleIcons = document
    .querySelectorAll(".visible")
    .forEach((visibleIcon) => {
      visibleIcon.addEventListener("click", function () {
        if ((passwordInput, confirmPassword.type == "password")) {
          passwordInput.setAttribute("type", "text");
          confirmPassword.setAttribute("type", "text");
          visibleIcon.classList.remove("fa-eye");
          visibleIcon.classList.add("fa-eye-slash");
        } else {
          passwordInput.setAttribute("type", "password");
          confirmPassword.setAttribute("type", "password");
          visibleIcon.classList.remove("fa-eye-slash");
          visibleIcon.classList.add("fa-eye");
        }
      });
    });
};
let visibleIcons = document.querySelectorAll(".visible");

let validateconfirmatio = function () {
  let passwordValue = passwordInput.value;
  let confirmValue = confirmPassword.value;
  let fieldConf = document.querySelector(".form-field-conf-pass");
  let errorConfIcon = document.querySelector(".con-pass-error-icon");
  errorMessages.forEach((msg) => {
    if (confirmValue === "") {
      fieldConf.classList.add("error-field");
      msg.textContent = "Required";
    } else if (confirmValue !== passwordValue) {
      fieldConf.classList.add("error-field");
      msg.textContent = "Passwords should be matched";
    } else {
      fieldConf.classList.add("success");
      errorConfIcon.classList.remove("fa-circle-exclamation");
      errorConfIcon.classList.add("fa-circle-check");
    }
  });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateUsername();
  validateEmail();
  validatPassword();
  validateconfirmatio();
  cookiesFunction();

  let formfield = document.querySelectorAll(".form-field").forEach((field) => {
    if (field.classList.contains("success")) {
      form.submit();
    }
  });
});
UsernameInput.addEventListener("focusout", () => {
  validateUsername();
});
emailInput.addEventListener("focusout", () => {
  validateEmail();
});
passwordInput.addEventListener("focusout", () => {
  validatPassword();
});
confirmPassword.addEventListener("focusout", () => {
  validateconfirmatio();
});

// start footer form fetch post

let from = document.querySelector(".footer-form");
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