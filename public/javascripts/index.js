document.addEventListener("DOMContentLoaded", function () {
  const profileSection = document.querySelector(".profile-section");
  const dropdown = document.getElementById("dropdown");

  profileSection.addEventListener("click", function () {
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!profileSection.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
});

const Logo = document.querySelector(".logo");
Logo.addEventListener("click", () => {
  window.location.href = "/";
});
const GetStartedBtn = document.querySelector(".get-started");

GetStartedBtn.addEventListener("click", function () {
  window.location.href = "/Home";
});

const SignBtn = document.querySelector("#SignBtn");
SignBtn.addEventListener("click", () => {
  window.location.href = "/SignUp";
});

const LoginBtn = document.querySelector("#LogInBtn");
LoginBtn.addEventListener("click", () => {
  window.location.href = "/Login";
});
