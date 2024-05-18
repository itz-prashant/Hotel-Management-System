
const signup = ()=>{
    const loginTab = document.getElementById('login-tab')
    const signupTab = document.getElementById('signup-tab')
    const signupForm = document.getElementById('signup-form')
    const loginForm = document.getElementById('login-form')
    const regForm = document.querySelector(".reg-form")
    const logForm = document.querySelector(".log-form")
    const regFormAllInput = regForm.querySelectorAll("input")
    const logFormAllInput = logForm.querySelectorAll("input")

    let userInfo = []

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
    if(localStorage.getItem("userInfo") != null){
        userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }

    regForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let checEmail = userInfo.find(data =>data.email === regFormAllInput[4].value)

        if(checEmail == undefined){
            let data = {}
            for( let el of regFormAllInput){
                let key = el.name
                data[key] = el.value
            }
            userInfo.push(data)
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            swal("Registration Sucessfull!")
            regForm.reset()
        }else{
            swal("Registration failed", "Email already exist")
            regForm.reset()
        }
        
    })
}

export default signup