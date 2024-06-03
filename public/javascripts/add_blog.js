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

const CoverPhoto = document.querySelector(".cover-pic");
const Inputchange = document.querySelector("#cover-photo");
Inputchange.addEventListener("change", () => {
  CoverPhoto.src = URL.createObjectURL(Inputchange.files[0]);
});

const SignBtn = document.querySelector("#SignBtn");
SignBtn.addEventListener("click", () => {
  window.location.href = "/SignUp";
});

const LoginBtn = document.querySelector("#LogInBtn");
LoginBtn.addEventListener("click", () => {
  window.location.href = "/Login";
});
