// Book Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = []
    }
    else {
        booksObj = JSON.parse(books)
    }
    let tableBody = document.getElementById('tableBody');
    let finalBody = '';
    booksObj.forEach(function (element, index) {
        uiString = `<tr class="bookTable">
                        <td>${index + 1}</td>
                        <td class="book-name">${element.name}</td>
                        <td class="book-author">${element.author}</td>
                        <td class="book-type">${element.type}</td>
                        <td><button type="button" class="btn btn-primary btn-sm" onclick="Delete(${index})">Delete</button></td>
                    </tr>`;
        finalBody += uiString;
    });
    tableBody.innerHTML = finalBody;
}
Display();

// Delete the particular book
function Delete(index) {
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = []
    }
    else {
        booksObj = JSON.parse(books)
    }
    booksObj.splice(index, 1)
    localStorage.setItem('books', JSON.stringify(booksObj))
    Display();
}

// Search Book
let search = document.getElementById('search');
search.addEventListener('input', function () {
    let bookTable = document.querySelectorAll('.bookTable');
    let bookname = document.querySelectorAll('.book-name');
    let bookauthor = document.querySelectorAll('.book-author');
    let booktype = document.querySelectorAll('.book-type');

    bookTable.forEach(function (element, index) {
        if (bookname[index].innerText.toLowerCase().includes(search.value.toLowerCase()) || bookauthor[index].innerText.toLowerCase().includes(search.value.toLowerCase()) || booktype[index].innerText.toLowerCase().includes(search.value.toLowerCase())) {
            bookTable[index].style.display = "table-row";
        }
        else{
            bookTable[index].style.display = "none";
        }
    });

});

// Add methods to display prototype
Display.prototype.add = function (book) {
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = []
    }
    else {
        booksObj = JSON.parse(books)
    }

    myObj = {
        name: book.name,
        author: book.author,
        type: book.type
    }
    booksObj.push(myObj);
    localStorage.setItem('books', JSON.stringify(booksObj));

    Display();
}

// Implemt the clear function which will reset the form values
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

// Validate the form input if input character is greater than or equal to 3 or not
Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false;
    }
    else {
        return true;
    }
}

// Show Error or Success messages if book added
Display.prototype.show = function (type, showSMG, succerror) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show my-0" role="alert"">
                            <strong>${succerror}: </strong> ${showSMG}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = '';
    }, 5000);
}


// Add Submit event listener to form libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    e.preventDefault();
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your Book has been added successfully!', 'Success');
    }
    else {
        // So error
        display.show('warning', `Sorry your Book can't add, Book and Author name minimum 3 characters required`, 'Error');
    }

    Display();
}

// Suggetion to improve
// 1). Store all the data to the local storage
// 2). Give an option to delete the book
// 3). Add scrollbar to view the all books