
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

    // ==== Login Function ==== //

    logForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        if(logFormAllInput[0].value !== ""){
            if(logFormAllInput[1].value !== ""){

                // Check emain in your database
                let checkEmail = userInfo.find(data=> {
                    return data.email == logFormAllInput[0].value
                })
                if(checkEmail !== undefined){

                    // match password
                    let checkPassword = userInfo.find(data=>{
                        return data.password == logFormAllInput[1].value
                    })
                    if(checkPassword !== undefined){
                        swal("Success", "Successful Login !", "success")
                        window.location = "profile.html"
                        sessionStorage.setItem("__au__", JSON.stringify(checkEmail))
                        logForm.reset()
                    }else{
                        swal("Warning", "Wrong Password !", "warning")
                        logForm.reset()
                    }

                }
                else{
                    swal("Warning", "Email not Registered !", "warning")
                }
                
            }else{
                swal("Warning", "Password is empty !", "warning")
            }
        }else{
            swal("Warning", "Email is empty !", "warning")
        }
    })
}

export default signup