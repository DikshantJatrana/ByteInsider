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
