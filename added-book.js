document.addEventListener("DOMContentLoaded", function() {
  function showAddedBooks() {
    let listItems = localStorage.getItem("listItems");
    let listArray = listItems ? JSON.parse(listItems) : [];
    // if (listItems == null) {
    //   listArray = [];
    // } else {
    //   listArray = JSON.parse(listItems);
    // }

    let tableBody = document.getElementById("added-books-table-body");
    let htmltobeadded = "";

    for (let i = 0; i < listArray.length; i++) {
      htmltobeadded += `
        <tr>
          <td>${i + 1}</td>
          <td>${new Date().toLocaleDateString()}</td>
          <td>${listArray[i].userName}</td>
          <td>${listArray[i].bookName}</td>
          <td>${listArray[i].type}</td>
          <td><button type="button" onclick="deleteItem(${i})" class="dlt-btn btn-primary btn" style="background-color: grey; color: white; border: none;">Delete</button></td>
        </tr>
      `;
    }

    tableBody.innerHTML = htmltobeadded;
  }

  window.deleteItem = function(index) {
    let listItems = localStorage.getItem("listItems");
    let listArray = listItems ? JSON.parse(listItems) : [];
    listArray.splice(index, 1);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    showAddedBooks();
  };

  showAddedBooks();
});

// Deleting List Item -->
// function deleteItem(index) {
//   let listItems = localStorage.getItem("listItems");
//   if (listItems == null) {
//     listArray = [];
//   } else {
//     listArray = JSON.parse(listItems);
//   }
//   listArray.splice(index, 1);
//   localStorage.setItem("listItems", JSON.stringify(listArray));
//   showAddedBooks();
// }

// class Display {
//   constructor() {}
//   add(arrayInputs) {
//     let tableBody = document.getElementById("table-body");
//     let today = new Date().toLocaleDateString();
//     let htmltobeadded = "";
//     for (let i = 0; i < arrayInputs.length; i++) {
//       htmltobeadded += `
//                   <tr>
//                     <td>${i + 1}</td>
//                     <td>${today}</td>
//                     <td>${arrayInputs[i].userName}</td>
//                     <td>${arrayInputs[i].bookName}</td>
//                     <td>${arrayInputs[i].type}</td> 
//                     <td> <button type="button" onclick = "deleteItem(${i})" class ="dlt-btn btn-primary btn " id ="dlt-btn"> Delete </button> </td>
//                   </tr>
//               `;
//     }
//     tableBody.innerHTML = htmltobeadded;
//   }
// }

document.addEventListener("DOMContentLoaded", function() {
  checkAuthentication();
});
