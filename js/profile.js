// check user is login or not
let userInfo = ""
const userName = document.querySelector(".name")
const logoutBtn = document.querySelector(".logout")

if(sessionStorage.getItem("__au__") === null){
    window.location = "index.html"
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"))
userName.innerHTML = userInfo.hotelName;

logoutBtn.addEventListener("click",()=>{
    sessionStorage.removeItem("__au__")
    window.location = "index.html"
})