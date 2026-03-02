(function () {
  document.documentElement.setAttribute("data-theme", "light");
  try {
    localStorage.removeItem("theme");
  } catch (e) {}
})();
