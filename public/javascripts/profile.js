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

const Createdbtn = document.getElementById("created-btn");
const Likedbtn = document.getElementById("liked-btn");
const Created = document.getElementById("Created");
const Liked = document.getElementById("Liked");

Createdbtn.addEventListener("click", () => {
  Createdbtn.classList.add("after-click");
  Createdbtn.classList.remove("before-click");
  Likedbtn.classList.add("before-click");
  Likedbtn.classList.remove("after-click");
  Created.classList.remove("hidden");
  Liked.classList.add("hidden");
});

Likedbtn.addEventListener("click", () => {
  Likedbtn.classList.add("after-click");
  Likedbtn.classList.remove("before-click");
  Createdbtn.classList.add("before-click");
  Createdbtn.classList.remove("after-click");
  Created.classList.add("hidden");
  Liked.classList.remove("hidden");
});

const SignBtn = document.querySelector("#SignBtn");
SignBtn.addEventListener("click", () => {
  window.location.href = "/SignUp";
});

const LoginBtn = document.querySelector("#LogInBtn");
LoginBtn.addEventListener("click", () => {
  window.location.href = "/Login";
});
