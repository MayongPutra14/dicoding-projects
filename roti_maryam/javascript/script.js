//Animationn list-hamburger in Navbar
const listBar = document.querySelector(".list-bar");
const navSlide = document.querySelector("nav ul");

listBar.addEventListener("click", () => {
  navSlide.classList.toggle("slide");
  listBar.classList.toggle("open")
});

// Animation
const animation = document.querySelectorAll(".animation");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    if(entry.isIntersecting) observer.unobserve(entry.target)
  });
}, {
  rootMargin: "0px 0px -20px 0px",
});


animation.forEach(el => {
  observer.observe(el);

})
