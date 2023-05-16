const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");
const passwordValidation = document.getElementById("registerPassword")

//FUNCIONAMIENTO REGISTER FORM
registerButton.addEventListener("click", () => {
  container.classList.add("rightPanelActive");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("rightPanelActive");
});

//REGISTRO DE DATOS Y ALMACENAMIENTO EN LOCALSTORAGE
class Admin {
  constructor (registerName, registerEmail, registerPassword) {
    this.name = registerName,
    this.email = registerEmail;
    this.password = registerPassword
  }
}

let admins = JSON.parse(localStorage.getItem('admins')) || [];

const adminCreate = () => {
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = e.target.children;
    const admin = new Admin(
      datos['registerName'].value,
      datos['registerEmail'].value,
      datos['registerPassword'].value,
    );
    admins.push(admin);
    localStorage.setItem('admins', JSON.stringify(admins));
    registerForm.reset();
    const message = document.getElementById('message');
    message.textContent = '';
  });
};

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

adminCreate()

//FUNCIONAMIENTO LOGIN FORM
const loginValidation = () => {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los datos del formulario de inicio de sesión
    const emailInput = document.getElementById("loginEmail").value;
    const passwordInput = document.getElementById("loginPassword").value;

    // Validar el inicio de sesión
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const foundAdmin = admins.find(
      (admin) => admin.email === emailInput && admin.password === passwordInput
    );

    if (foundAdmin) {
      // Inicio de sesión exitoso, redirigir a otro archivo HTML
      window.location.href = "../../pages/back.html";
    } else {
      // Inicio de sesión fallido, mostrar mensaje de error o tomar alguna acción
      console.log("Inicio de sesión fallido. Verifica tus credenciales.");
    }
  });
}

loginValidation()
