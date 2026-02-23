// TAB CONTENT
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    target.classList.add("active");
  });
});

// COLOR ACTIVE WHEN SELECTED
const menuList = document.querySelectorAll("nav ul li");

function menuSelected(event) {
  // Remove class .selected from all <li> in <nav>
  menuList.forEach((menu) => {
    menu.classList.remove("selected");
  });

  // Add class .selected to menu that just clicked
  event.currentTarget.classList.add("selected");
}

menuList.forEach((menu) => {
  menu.addEventListener("click", menuSelected);
});
