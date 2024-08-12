console.log("scripts.js is connected");

function inputs(userName, bookName, type, date) {
  this.userName = userName;
  this.bookName = bookName;
  this.type = type;
  this.date = date;
}

class Display {

  constructor() {}

  add(arrayInputs) {
    console.log("Adding books to the table: ", arrayInputs); // Debugging log
    let tableBody = document.getElementById("table-body");
    let htmltobeadded = "";
    for (let i = 0; i < arrayInputs.length; i++) {
      htmltobeadded += `
        <tr>
          <td>${i + 1}</td>
          <td>${arrayInputs[i].date}</td>
          <td>${arrayInputs[i].userName}</td>
          <td>${arrayInputs[i].bookName}</td>
          <td>${arrayInputs[i].type}</td>
          <td><button type="button" onclick="deleteItem(${i})" class="dlt-btn btn-primary btn">Delete</button></td>
        </tr>`;
    }
    tableBody.innerHTML = htmltobeadded;
  }
  clear() {
    let myForm = document.getElementById("mylibraryform");
    myForm.reset();
  }

  validate(inputs) {
    console.log("Validating inputs: ", inputs); // Debugging log
    return inputs.userName !== "" && inputs.bookName !== "";
  }

  alertuser(type, sub, message) {
    let alertuser = document.getElementById("alertuser");
    let htmltobeaddedinalert = `
      <div class="alert alert-${type} alert-dismissible fade show" id="alert" role="alert">
        <strong>${sub}</strong> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>`;
    alertuser.innerHTML += htmltobeaddedinalert;
    setTimeout(() => {
      alertuser.innerHTML = "";
    }, 4000);
  }

  checkIssue(listArray, o1) {
    console.log("Checking for existing issues: ", listArray, o1); // Debugging log
    for (let i = 0; i < listArray.length; i++) {
      if (listArray[i].bookName === o1.bookName) {
        this.issuedUser = listArray[i].userName;
        return 0;
      }
    }
    return 1;
  }
}

const form = document.getElementById("mylibraryform");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let givenUserName = document.getElementById("User-Name").value;
  let givenBookName = document.getElementById("Book-Name").value;
  let givenType;
  let checkFiction = document.getElementById("Fiction");
  let checkPrograming = document.getElementById("Programing");
  let checkCooking = document.getElementById("Cooking");
  let checkComic = document.getElementById("Comic");
  if (checkFiction.checked) {
    givenType = checkFiction.value;
  } else if (checkPrograming.checked) {
    givenType = checkPrograming.value;
  } else if (checkPrograming.checked){
    givenType = checkCooking.value;
  } else {
    givenType = checkComic.value;
  }

  let today = new Date().toLocaleDateString();
  let o1 = new inputs(givenUserName, givenBookName, givenType, today);

  let displayObj = new Display();
  let listArray;
  let listItems = localStorage.getItem("listItems");
  if (listItems == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(listItems);
  }


  if (displayObj.validate(o1) && displayObj.checkIssue(listArray, o1) == 1) {
    listArray.push(o1);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    console.log("Book added to localStorage: ", listArray); // Debugging log
    displayObj.clear();
    displayObj.alertuser("success", "Success!", "Book added successfully");
  } else {
    displayObj.alertuser("danger", "Error!", "Cannot add the book. Either the book name is empty or the book is already issued.");
  }
}

function showList() {
  let listItems = localStorage.getItem("listItems");
  if (listItems == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(listItems);
  }
  console.log("Showing list of books: ", listArray); // Debugging log
  new Display().add(listArray);
}
showList();

// Set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Erase a cookie
function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

// Use these functions to store tokens in cookies
function storeTokensInCookies() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const idToken = params.get('id_token');
  const accessToken = params.get('access_token');

  if (idToken) {
      setCookie('idToken', idToken, 1);
  }
  if (accessToken) {
      setCookie('accessToken', accessToken, 1);
  }
}

// On page load, store tokens if present
document.addEventListener("DOMContentLoaded", function() {
  storeTokensInCookies();
});

// Check if the user is authenticated
function checkAuthentication() {
  const idToken = getCookie('idToken');
  if (!idToken) {
      // Redirect to the Cognito login page if not authenticated
      window.location.href = 'https://<your-cognito-domain>.auth.<region>.amazoncognito.com/login?response_type=token&client_id=<your-client-id>&redirect_uri=http://localhost:3000/';
  }
}

// Logout function
function logout() {
  eraseCookie('idToken');
  eraseCookie('accessToken');
  window.location.href = 'https://<your-cognito-domain>.auth.<region>.amazoncognito.com/logout?client_id=<your-client-id>&logout_uri=http://localhost:3000/';
}

