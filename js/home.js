  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const closeNav = document.getElementById("closeNav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.add("active");
  });

  closeNav.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });