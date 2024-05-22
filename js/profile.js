// check user is login or not
let userInfo = "";
let user;
const userName = document.querySelector(".name");
const logoutBtn = document.querySelector(".logout");
const regForm = document.querySelector(".booking-form");

if (sessionStorage.getItem("__au__") === null) {
  window.location = "index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
userName.innerHTML = userInfo.hotelName;
user = userInfo.email.split("@")[0];

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("__au__");
  window.location = "index.html";
});

// ======= Tabs =======
const tabs = {
  bookingTab: document.getElementById("booking"),
  inhouseTab: document.getElementById("in-house"),
  archiveTab: document.getElementById("archive"),
  cashierTab: document.getElementById("cashier"),
};

const tabsData = {
  bookingTab: document.querySelector(".booking-tab-chart"),
  inhouseTab: document.querySelector(".inhouse-tab-chart"),
}
const form = {
  bookingTab: document.querySelector(".booking-form"),
  inhouseTab: document.querySelector(".inhouse-form"),
}

const handleActiveChartData = (activeData)=>{
  Object.keys(tabsData).forEach(chart=>{
    if(activeData === chart){
      tabsData[chart].classList.remove("hidden")
    }else{
      tabsData[chart].classList.add("hidden")
    }
  })
}

const handleTabclick = (activeTab) => {
  Object.keys(tabs).forEach((tab) => {
    if (tab === activeTab) {
      tabs[tab].classList.add("bg-blue-500");
    } else {
      tabs[tab].classList.remove("bg-blue-500");
    }
  });
};

const handleForm = (activeTab)=>{
  Object.keys(form).forEach(data=>{
    if(activeTab === data){
      form[data].classList.remove("hidden")
    }else{
      form[data].classList.add("hidden")
    }
  })
}

Object.keys(tabs).forEach((tab) => {
  tabs[tab].addEventListener("click", () => handleTabclick(tab));
  tabs[tab].addEventListener("click", () => handleActiveChartData(tab));
  tabs[tab].addEventListener("click", () => handleForm(tab));
});

const registerBtn = document.querySelector(".register-btn");
const modelBox = document.querySelector(".model");
const closeBtn = document.querySelectorAll(".close");

registerBtn.addEventListener("click", () => {
  modelBox.classList.remove("hidden");
  modelRegisterBtn.classList.remove("hidden")
  modelUpdateBtn.classList.add("hidden")
});
modelBox.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) {
    modelBox.classList.add("hidden");
    regForm.reset('')
    modelRegisterBtn.classList.remove("hidden")
    modelUpdateBtn.classList.add("hidden")
  }
});
closeBtn[0].addEventListener("click", () => {
  modelBox.classList.add("hidden");
  regForm.reset('')
  modelRegisterBtn.classList.remove("hidden")
    modelUpdateBtn.classList.add("hidden")
});
closeBtn[1].addEventListener("click", () => {
  modelBox.classList.add("hidden");
  inhouseRegForm.reset('')
  modelRegisterBtn.classList.remove("hidden")
    modelUpdateBtn.classList.add("hidden")
});

// booking Registration form //


const bookingFormAllInput = regForm.querySelectorAll("input");
const textArea = regForm.querySelector("textarea");
const bookingList = document.querySelector(".booking-list");
let allBookingData = [];

// inHouse registration form
const inhouseRegForm = document.querySelector(".inhouse-form");
const allInHouseInput = inhouseRegForm.querySelectorAll("input");
const inHouseTextarea = inhouseRegForm.querySelector("textarea");
let allInhouseData = []

// getting data from storage

export const fetchData = (key) => {
  if (localStorage.getItem(key) !== null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  }
  else{
    return []
  }
};
allBookingData = fetchData(user + "_allBookingData");

const formatDate = (data)=>{
  const date = new Date(data)
  let yy = date.getFullYear()
  let mm = date.getMonth()+1
  let dd = date.getDate()
  return `${dd}/${mm}/${yy}`
}

const showBookingData = () => {
  bookingList.innerHTML = ""
  allBookingData.forEach((item, index)=>{
    bookingList.innerHTML += `
        <tr>
            <td>${index +1}</td>
            <td>${item.fullName}</td>
            <td>${item.location}</td>
            <td>${item.roomNo}</td>
            <td>${item.totalPeople}</td>
            <td>${formatDate(item.checkInDate)}</td>
            <td>${formatDate(item.checkOutDate)}</td>
            <td>${item.number}</td>
            <td>${item.price} Rs</td>
            <td>${item.notice}</td>
            <td>${formatDate(item.createdAt)}</td>
            <td style="font-size: 20px;" class="btn">
              <i  style="background-color: rgb(20, 123, 219); padding: 4px;" class='bx bx-edit cursor-pointer edit'></i>
              <i  style="background-color: rgb(231, 235, 23); padding: 4px;" class='bx bx-message-alt-check cursor-pointer check-in'></i>
              <i style="background-color: rgb(219, 20, 20); padding: 4px;" class='bx bx-trash cursor-pointer delete'></i>
            </td>
        </tr>`
  });
  deleteFunc()
  updateDataFun()
};
showBookingData()

// booking delete coding

function deleteFunc (){
  const deleteBtn = bookingList.querySelectorAll(".delete")
  deleteBtn.forEach((btn, index)=>{
    btn.addEventListener("click",()=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          allBookingData.splice(index, 1)
       localStorage.setItem(user + "_allBookingData", JSON.stringify(allBookingData))
       showBookingData()
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      })
       
    })
  })
}



// registration function 

const registrationfunction = (textArea, input, arrData, key)=>{
  let data = { notice: textArea.value,
    createdAt : new Date()
   };
  for (let el of input) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  arrData.push(data);
  localStorage.setItem(
    key,
    JSON.stringify(arrData)
  );
  swal("Done", "Booking Success", "success");
  
}

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationfunction(textArea, bookingFormAllInput , allBookingData, user + "_allBookingData")
  modelBox.classList.add("hidden");
  showBookingData()
  regForm.reset('')
});

inhouseRegForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationfunction(inHouseTextarea, allInHouseInput , allInhouseData , user + "_allInHouseData")
  modelBox.classList.add("hidden");
  inhouseRegForm.reset('')
});

// Update function
const modelRegisterBtn = document.querySelector(".register")
const modelUpdateBtn = document.querySelector(".update")
const allBtn = regForm.querySelectorAll("button")

function updateDataFun (){
  let editBtn = bookingList.querySelectorAll(".edit")
  editBtn.forEach((btn,index)=>{

    btn.addEventListener("click",()=>{

      registerBtn.click()
      modelRegisterBtn.classList.add("hidden")
      modelUpdateBtn.classList.remove("hidden")

      let obj = allBookingData[index]
      console.log(obj);
      bookingFormAllInput[0].value = obj.fullName
      bookingFormAllInput[1].value = obj.location
      bookingFormAllInput[2].value = obj.roomNo
      bookingFormAllInput[3].value = obj.totalPeople
      bookingFormAllInput[4].value = obj.checkInDate
      bookingFormAllInput[5].value = obj.checkOutDate
      bookingFormAllInput[6].value = obj.number
      bookingFormAllInput[7].value = obj.price
      textArea.value = obj.notice

      allBtn[1].addEventListener("click",()=>{
         let formData = {
          notice: textArea.value,
          createdAt: new Date()
         }
         for (let el of bookingFormAllInput) {
          let key = el.name;
          let value = el.value;
          formData[key] = value;
        }
        allBookingData[index] = formData
        localStorage.setItem(user+"_allBookingData", JSON.stringify(allBookingData))
        regForm.reset()
        modelRegisterBtn.classList.remove("hidden")
        modelUpdateBtn.classList.add("hidden")
        modelBox.classList.add("hidden");
        showBookingData()
      })
    })
  })
}