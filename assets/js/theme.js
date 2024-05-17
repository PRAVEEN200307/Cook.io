const $HTML = document.documentElement;
const $themeBtn = document.querySelector("[data-theme-btn]");

const handleTheme = () => {
  const themeVal = localStorage.getItem("theme");
  if (themeVal == "light") {
    $HTML.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    $HTML.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  }
};

$themeBtn.addEventListener("click", handleTheme);

window.addEventListener("load", () => {
  const themeVal = localStorage.getItem("theme");
  $HTML.dataset.theme = themeVal;
});


