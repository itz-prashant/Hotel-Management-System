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

// ======= Tabs ======= 
const tabs = {
    bookingTab : document.getElementById('booking'),
    inhouseTab : document.getElementById('in-house'),
    archiveTab : document.getElementById('archive'),
    cashierTab : document.getElementById('cashier')
}

const handleTabclick = (activeTab)=>{
    Object.keys(tabs).forEach(tab =>{
        if(tab === activeTab){
            tabs[tab].classList.add("bg-blue-500")
        }
        else{
            tabs[tab].classList.remove("bg-blue-500")
        }
    })
}

Object.keys(tabs).forEach(tab=>{
    tabs[tab].addEventListener("click",()=> handleTabclick(tab))
})
