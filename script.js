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
        htmlCode += "<td class='pages'>" + elem.pages + "</td>";
        if (elem.read) {
            htmlCode += "<td class='read' onclick='changeStatus(" + index + ")'>Read</td>";
        } else {
            htmlCode += "<td class='read' onclick='changeStatus(" + index + ")'>Not Read</td>";
        }
        htmlCode +=
            '<td class="delete"><button onclick="deleteData(' + index + ')" class="btn" title="delete"><i class="fa-solid fa-xmark"></i></button></td>';
        htmlCode +=
            '<td class="update"><button onclick="updateData(' + index + ')" class="btn" title="update"><i class="fa-regular fa-pen-to-square"></i></button></td>';
    });

    document.querySelector('#libTable tbody').innerHTML = htmlCode;
}

function changeStatus(index) {
    let bookList;
    if (localStorage.getItem("bookList") == null) {
        bookList = [];
    } else {
        bookList = JSON.parse(localStorage.getItem("bookList"));
    }

    if (bookList[index].read === true) {
        bookList[index].read = false
    } else {
        bookList[index].read = true
    }
    localStorage.setItem("bookList", JSON.stringify(bookList));

    showData();
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
    document.getElementById("clear").style.display = "none";
    document.getElementById("update").style.display = "block";
    document.getElementById("cancel").style.display = "block";

    document.querySelector(".titleForm").textContent = "Edit a book info";

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

    document.querySelector("#update").onclick = function (event) {
        event.preventDefault();
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
            document.getElementById("clear").style.display = "block";
            document.getElementById("update").style.display = "none";
            document.getElementById("cancel").style.display = "none";

            document.querySelector(".titleForm").textContent = "Add a new book";
        }

    }
}

// function to cancel update
function CancelUpdate(event) {
    event.preventDefault();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read_no").checked = true;

    localStorage.removeItem("formData");

    document.getElementById("submit").style.display = "block";
    document.getElementById("clear").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById("cancel").style.display = "none";

    document.getElementById("title").style.backgroundColor = "#fff";
    document.getElementById("author").style.backgroundColor = "#fff";
    document.getElementById("pages").style.backgroundColor = "#fff";

    document.querySelector(".titleForm").textContent = "Add a new book";
}

// function to clear Data from the form
function ClearData(event) {
    event.preventDefault();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read_no").checked = true;

    document.getElementById("title").style.backgroundColor = "#fff";
    document.getElementById("author").style.backgroundColor = "#fff";
    document.getElementById("pages").style.backgroundColor = "#fff";

    localStorage.removeItem("formData");
}

// add start data to local storage
const one = new Book('The Last Wish', 'A. Sapkowski', 288, false);
const two = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const three = new Book('The Fellowship of the Rings', 'J.R.R. Tolkien', 423, true);
const four = new Book('Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', '370', false);
const five = new Book("Alice's Adventures in Wonderland", 'L. Carroll', 196, true)

const startData = [one, two, three, four, five];

if (localStorage.getItem("bookList") == null || JSON.parse(localStorage.getItem("bookList")).length == 0) {
    localStorage.setItem(`bookList`, JSON.stringify(startData));
}

// loads all Data from local storage, when document or page loaded
document.onload = showData();