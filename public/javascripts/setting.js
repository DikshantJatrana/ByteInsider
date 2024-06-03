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

const ProfilePhoto = document.querySelector(".profile-img");
const Profilechange = document.querySelector("#profile-photo");
Profilechange.addEventListener("change", () => {
  ProfilePhoto.src = URL.createObjectURL(Profilechange.files[0]);
});

const CoverPhoto = document.querySelector(".cover-img");
const Coverchange = document.querySelector("#cover-photo");
Coverchange.addEventListener("change", () => {
  CoverPhoto.src = URL.createObjectURL(Coverchange.files[0]);
});

const SignBtn = document.querySelector("#SignBtn");
SignBtn.addEventListener("click", () => {
  window.location.href = "/SignUp";
});

const LoginBtn = document.querySelector("#LogInBtn");
LoginBtn.addEventListener("click", () => {
  window.location.href = "/Login";
});
