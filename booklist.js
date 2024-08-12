document.addEventListener("DOMContentLoaded", function() {
  async function getBooks() {
    const response = await fetch('books.json');
    const books = await response.json();
    displayBooks(books);
    return books; // Return the books array for later use
  }

  function displayBooks(books) {
    const bookListContainer = document.getElementById('book-list-container');
    bookListContainer.innerHTML = ''; // Clear the container

    books.forEach((book,index) => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';

      const bookCover = document.createElement('div');
      bookCover.className = 'book-cover';
      bookCover.style.backgroundImage = `url(${book.CoverURL})`;

      const bookTitle = document.createElement('div');
      bookTitle.className = 'book-title';
      bookTitle.innerText = book.Title;

      bookCard.appendChild(bookCover);
      bookCard.appendChild(bookTitle);


      bookListContainer.appendChild(bookCard);
    });
  }

  let booksData = []; // This will hold the books data

  // Fetch and display the books initially
  getBooks().then(books => {
    booksData = books;
  });

  // Function to search books
  window.searchBooks = function() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredBooks = booksData.filter(book => 
      book.Title.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
  };

  // Function to show suggestions
  window.showSuggestions = function() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = ''; // Clear previous suggestions

    if (query) {
      const suggestions = booksData.filter(book =>
        book.Title.toLowerCase().includes(query)
      );

      suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('dropdown-item');
        div.textContent = suggestion.Title;
        div.onclick = function() {
          document.getElementById('search-bar').value = suggestion.Title;
          suggestionBox.innerHTML = '';
        };
        suggestionBox.appendChild(div);
      });
      
      if (suggestions.length > 0) {
        suggestionBox.classList.add('show');
      } else {
        suggestionBox.classList.remove('show');
      }
    } else {
      suggestionBox.classList.remove('show');
    }
  };
});





  // function displayBooks(books) {
  //   const bookTableBody = document.getElementById('book-table-body');
  //   bookTableBody.innerHTML = ''; // Clear the table body




    
//     books.forEach((book, index) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${book.Title}</td>
//         <td>${book.Authors}</td>
//         <td>${book.Publisher}</td>
//         <td>${book.Year}</td>
//       `;
//       bookTableBody.appendChild(row);
//     });
//   }

//   let booksData = []; // This will hold the books data

//   // Fetch and display the books initially
//   getBooks().then(books => {
//     booksData = books;
//   });

//   // Function to search books
//   window.searchBooks = function() {
//     const query = document.getElementById('search-bar').value.toLowerCase();
//     const filteredBooks = booksData.filter(book => 
//       book.Title.toLowerCase().includes(query)
//     );
//     displayBooks(filteredBooks);
//   };

//   // Function to show suggestions
//   window.showSuggestions = function() {
//     const query = document.getElementById('search-bar').value.toLowerCase();
//     const suggestionBox = document.getElementById('suggestion-box');
//     suggestionBox.innerHTML = ''; // Clear previous suggestions

//     if (query) {
//       const suggestions = booksData.filter(book =>
//         book.Title.toLowerCase().includes(query)
//       );

//       suggestions.forEach(suggestion => {
//         const div = document.createElement('div');
//         div.classList.add('dropdown-item');
//         div.textContent = suggestion.Title;
//         div.onclick = function() {
//           document.getElementById('search-bar').value = suggestion.Title;
//           suggestionBox.innerHTML = '';
//         };
//         suggestionBox.appendChild(div);
//       });
      
//       if (suggestions.length > 0) {
//         suggestionBox.classList.add('show');
//       } else {
//         suggestionBox.classList.remove('show');
//       }
//     } else {
//       suggestionBox.classList.remove('show');
//     }
//   };
// });
