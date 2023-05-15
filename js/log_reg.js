const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");
const passwordValidation = document.getElementById("password")

//FUNCIONAMIENTO FORM
registerButton.addEventListener("click", () => {
  container.classList.add("rightPanelActive");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("rightPanelActive");
});

passwordValidation.addEventListener("input", () => {
  const password = passwordValidation.value;
  let strenght = 0;

  if (password.match(/[a-z]+/)) {
    strenght++
  }
  if (password.match(/[A-Z]+/)) {
    strenght++
  }
  if (password.match(/[0-9]+/)) {
    strenght++
  }
  if (password.match(/[!#$%&/*@]+/)) {
    strenght++
  }
  if (password.length >= 8) {
    strenght++
  }

  switch (strenght) {
    case 0:
      message.textContent = ""
      message.style.color = "#ff0000"
      break
    case 1:
      message.textContent = "Muy Débil"
      message.style.color = "#ff0000"
      break
    case 2:
      message.textContent = "Débil"
      message.style.color = "#ff6c00"
      break
    case 3:
      message.textContent = "Media"
      message.style.color = "#ffe000"
      break
    case 4:
      message.textContent = "Fuerte"
      message.style.color = "#20c500"
      break
    case 5:
      message.textContent = "Muy Fuerte"
      message.style.color = "#157e00"
      break
  }
})


//REGISTRO DE DATOS Y ALMACENAMIENTO EN LOCALSTORAGE
class Admin {
  constructor (name, email, password) {
    this.name = name,
    this.email = email;
    this.password = password
  }
}

let admins = JSON.parse(localStorage.getItem('admins')) || [];

const adminCreate = () => {
  const registerForm = document.querySelector('#registerForm');
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = e.target.children;
    const admin = new Admin(
      datos['name'].value,
      datos['email'].value,
      datos['password'].value,
    );
    admins.push(admin);
    localStorage.setItem('productos', JSON.stringify(admins));
    registerForm.reset();
  });
};

adminCreate()