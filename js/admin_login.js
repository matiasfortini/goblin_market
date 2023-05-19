const admins = [
    {
        user: "matiasfortini",
        password: "matiasfortini1988&"
    }
]

const loginValidation = () => {
    const loginForm = document.querySelector("#form")
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const usernameInput = document.querySelector("#usernameInput").value
        const passwordInput = document.querySelector("#passwordInput").value

        const foundAdmin = admins.find((admin) => admin.user === usernameInput && admin.password === passwordInput)

        if (foundAdmin) {
            window.location.href = "../pages/new_product.html"
        }else{
            console.log("problemas")
        }
    })
}

loginValidation()


