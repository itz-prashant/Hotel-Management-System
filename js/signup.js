
const signup = ()=>{
    const loginTab = document.getElementById('login-tab')
    const signupTab = document.getElementById('signup-tab')
    const signupForm = document.getElementById('signup-form')
    const loginForm = document.getElementById('login-form')
    loginTab.addEventListener("click",()=>{
        signupTab.classList.remove("bg-blue-500")
        loginTab.classList.add("bg-blue-500")
        signupForm.classList.add("hidden")
        loginForm.classList.remove("hidden")
    })

    signupTab.addEventListener("click",()=>{
        signupTab.classList.add("bg-blue-500")
        loginTab.classList.remove("bg-blue-500")
        signupForm.classList.remove("hidden")
        loginForm.classList.add("hidden")
    })
}

export default signup