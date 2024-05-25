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
  archiveTab: document.getElementById(".archive-tab-chart"),
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
const modelRegisterBtn = document.querySelectorAll(".register")
const modelUpdateBtn = document.querySelectorAll(".update")

registerBtn.addEventListener("click", () => {
  modelBox.classList.remove("hidden");
  modelRegisterBtn[0].classList.remove("hidden")
  modelRegisterBtn[1].classList.remove("hidden")
  modelUpdateBtn[0].classList.add("hidden")
  modelUpdateBtn[1].classList.add("hidden")
});
modelBox.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) {
    modelBox.classList.add("hidden");
    modelRegisterBtn[0].classList.remove("hidden")
    modelRegisterBtn[1].classList.remove("hidden")
    modelUpdateBtn[0].classList.add("hidden")
    modelUpdateBtn[1].classList.add("hidden")
    regForm.reset()
  }
});
closeBtn[0].addEventListener("click", () => {
  modelBox.classList.add("hidden");
  modelRegisterBtn[0].classList.remove("hidden")
  modelUpdateBtn[0].classList.add("hidden")
  regForm.reset()
});
closeBtn[1].addEventListener("click", () => {
  modelBox.classList.add("hidden");
  modelRegisterBtn[1].classList.remove("hidden")
  modelUpdateBtn[1].classList.add("hidden")
  inhouseRegForm.reset()
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
const inHouseBodyList = document.querySelector(".inhouse-list");

let allInhouseData = []

let allArchiveData = []

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
allInhouseData = fetchData(user + "_allInHouseData");
allArchiveData = fetchData(user + "_allArchiveData");

const formatDate = (data)=>{
  const date = new Date(data)
  let yy = date.getFullYear()
  let mm = date.getMonth()+1
  let dd = date.getDate()
  return `${dd}/${mm}/${yy}`
}

const showData = (element, arr, key) => {
  element.innerHTML = ""
  arr.forEach((item, index)=>{
    element.innerHTML += `
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
  deleteFunc(element, arr, key)
  updateDataFun(element, arr, key)
  checkInOut(element, arr, key)
};
showData(bookingList, allBookingData, user+"_allBookingData" )
showData(inHouseBodyList, allInhouseData, user + "_allInHouseData")

// CheckInOut coding

function checkInOut (element, arr, key){
  let checkBtn = element.querySelectorAll(".check-in")
  checkBtn.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
      let data = arr[index]
      arr.splice(index, 1)
      // localStorage.setItem(key, JSON.stringify(arr))
      let tmp = key.split("_")[1]
      if(tmp == "allBookingData"){
        allInhouseData.push(data)
        localStorage.setItem(user+"_allInHouseData", JSON.stringify(allInhouseData))
        showData(element, arr, key)
      }else{
        allArchiveData.push(data)
        localStorage.setItem(user+"_allArchiveData", JSON.stringify(allArchiveData))
        showData(element, arr, key)
      }
    })
  })
}

// delete coding

function deleteFunc (element, arr, key){
  const deleteBtn = element.querySelectorAll(".delete")
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
          arr.splice(index, 1)
       localStorage.setItem(key, JSON.stringify(arr))
       showData(bookingList, allBookingData, user+"_allBookingData")
       showData(inHouseBodyList, allInhouseData, user + "_allInHouseData")
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
  showData(bookingList, allBookingData, user+"_allBookingData")
  regForm.reset()
});

inhouseRegForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationfunction(inHouseTextarea, allInHouseInput , allInhouseData , user + "_allInHouseData")
  modelBox.classList.add("hidden");
  showData(inHouseBodyList, allInhouseData, user + "_allInHouseData")
  inhouseRegForm.reset()
});

// Update function


function updateDataFun (element, arr, key){
  let editBtn = element.querySelectorAll(".edit")
  editBtn.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{

      registerBtn.click()
      if(key == 'prashant_allBookingData'){
        modelRegisterBtn[0].classList.add("hidden")
        modelUpdateBtn[0].classList.remove("hidden")
      }else{
        modelRegisterBtn[1].classList.add("hidden")
      modelUpdateBtn[1].classList.remove("hidden")
      }

      let allInput = key == 'prashant_allBookingData' ? regForm.querySelectorAll("input")  : inhouseRegForm.querySelectorAll("input")

      let allTextarea = key == 'prashant_allBookingData' ? regForm.querySelector("textarea")  : inhouseRegForm.querySelector("textarea")

      let allBtn = key == 'prashant_allBookingData' ? regForm.querySelectorAll("button") : inhouseRegForm.querySelectorAll("button")

      let obj = arr[index]
      allInput[0].value = obj.fullName
      allInput[1].value = obj.location
      allInput[2].value = obj.roomNo
      allInput[3].value = obj.totalPeople
      allInput[4].value = obj.checkInDate
      allInput[5].value = obj.checkOutDate
      allInput[6].value = obj.number
      allInput[7].value = obj.price
      allTextarea.value = obj.notice

      allBtn[1].addEventListener("click",()=>{
         let formData = {
          notice: allTextarea.value,
          createdAt: new Date()
         }
         for (let el of allInput) {
          let key = el.name;
          let value = el.value;
          formData[key] = value;
        }
        arr[index] = formData
        localStorage.setItem(key, JSON.stringify(arr))
        if(key == 'prashant_allBookingData'){
          modelRegisterBtn[0].classList.remove("hidden")
          modelUpdateBtn[0].classList.add("hidden")
          showData(bookingList, allBookingData, key)
          modelBox.classList.add("hidden");
          regForm.reset()
        }else{
          modelRegisterBtn[1].classList.remove("hidden")
          modelUpdateBtn[1].classList.add("hidden")
          showData(inHouseBodyList, allInhouseData, key)
          modelBox.classList.add("hidden");
          inhouseRegForm.reset()
        }
      })
    })
  })
}