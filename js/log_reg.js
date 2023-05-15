const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("rightPanelActive");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("rightPanelActive");
});