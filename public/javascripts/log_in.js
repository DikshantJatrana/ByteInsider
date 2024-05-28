document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showLogin = document.getElementById("show-login");
  const showSignup = document.getElementById("show-signup");

  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    setTimeout(function () {
      window.location.href = "/Login";
    }, 50);
  });

  showSignup.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    setTimeout(function () {
      window.location.href = "/SignUp";
    }, 50);
  });

  // Show the login form by default
  loginForm.classList.add("active");
});
