class Book {
    constructor(name, author, pages, read) {
        this.title = name
        this.author = author
        this.pages = pages
        this.read = read
    }
}

// function to validate form
function validateForm() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    if (title == "") {
        document.getElementById("title").style.backgroundColor = "#f8c5c5";
        document.getElementById("author").style.backgroundColor = "#f8c5c5";
        document.getElementById("pages").style.backgroundColor = "#f8c5c5";
        return false;
    }

    if (author == "") {
        document.getElementById("author").style.backgroundColor = "#f8c5c5";
        document.getElementById("pages").style.backgroundColor = "#f8c5c5";
        return false;
    }

    if (pages == "" || pages < 1) {
        document.getElementById("pages").style.backgroundColor = "#f8c5c5";
        return false;
    }

    return true;
}

// function to show Data from local storage
function showData() {
    let bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    } else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    let htmlCode = "";

    bookList.forEach((elem, index) => {
        htmlCode += "<tr>";
        htmlCode += "<td>" + elem.title + "</td>";
        htmlCode += "<td>" + elem.author + "</td>";
        htmlCode += "<td>" + elem.pages + "</td>";
        if (elem.read) {
            htmlCode += "<td>Read</td>";
        } else {
            htmlCode += "<td>Not Read</td>";
        }
        htmlCode +=
            '<td><button onclick="deleteData(' + index + ')" class="btn" title="delete"><i class="fa-solid fa-xmark"></i></button></td>';
        htmlCode +=
            '<td><button onclick="updateData(' + index + ')" class="btn" title="update"><i class="fa-regular fa-pen-to-square"></i></button></td>';
    });

    document.querySelector('#libTable tbody').innerHTML = htmlCode;
}

// save entered data to local storage (before you enter submit)
document.addEventListener('DOMContentLoaded', function () {
    // get data from input
    const form = document.getElementById('form1');
    const newBook = new Book();
    form.addEventListener('input', (e) => {
        e.preventDefault();

        newBook[e.target.name] = e.target.value;
        localStorage.setItem('formData', JSON.stringify(newBook));
    })

    // get data from localStore after reload page
    if (localStorage.getItem('formData')) {
        let formData = JSON.parse(localStorage.getItem('formData'));

        for (let key in formData) {
            if (form.elements[key].type === 'checkbox' && formData[key] === 'on') {
                form.elements[key].checked = true;
            } else {
                form.elements[key].value = formData[key];
            }
        }
    }
});

// function to add data to local storage
function AddData(event) {
    event.preventDefault();
    // if (localStorage.getItem('formData')) {
    if (validateForm() == true) {

        let formData = JSON.parse(localStorage.getItem('formData'));

        let bookList;
        if (localStorage.getItem("bookList") == null) {
            bookList = [];
        } else {
            bookList = JSON.parse(localStorage.getItem("bookList"));
        }

        bookList.push(formData);
        localStorage.setItem("bookList", JSON.stringify(bookList));

        showData();
        localStorage.removeItem('formData');

        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read_no").checked = true;
    }
    // }
}

// function to delete Data from local storage
function deleteData(index) {
    let bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    } else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    bookList.splice(index, 1);
    localStorage.setItem("bookList", JSON.stringify(bookList));

    showData();
}

// function to update/edit data from local storage
function updateData(index) {
    // Submit btn will hide, Update btn will show to update Data in local storage
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    } else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    document.getElementById("title").value = bookList[index].title;
    document.getElementById("author").value = bookList[index].author;
    document.getElementById("pages").value = bookList[index].pages;
    if (bookList[index].read) {
        document.getElementById("read_yes").checked = true;
    } else {
        document.getElementById("read_no").checked = true;
    }

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            bookList[index].title = document.getElementById("title").value;
            bookList[index].author = document.getElementById("author").value;
            bookList[index].pages = document.getElementById("pages").value;
            if (document.getElementById("read_yes").checked === true) {
                bookList[index].read = true;
            } else {
                bookList[index].read = false;
            }

            localStorage.setItem("bookList", JSON.stringify(bookList));
            localStorage.removeItem("formData");

            showData();

            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("pages").value = "";
            document.getElementById("read_no").checked = true;

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }

    }
}

// // add start data to local storage
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const HarryPotter3 = new Book('Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', '370', true);

const startData = [theHobbit, HarryPotter3];

if (localStorage.getItem("bookList") == null) {
    localStorage.setItem(`bookList`, JSON.stringify(startData));
}

// loads all Data from local storage, when document or page loaded
document.onload = showData();