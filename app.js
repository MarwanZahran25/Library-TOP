let myLibrary = [];
let book = function (title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
};

function addBoook(title, author, pages, status) {
  myLibrary.push(new book(title, author, pages, status));
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
let wholePage = document.querySelector("#page");
let addBoookBtn = document.querySelector("#add-book-btn");
let formDialog = document.getElementById("book-submit-form");
let submitBtn = document.getElementById("submit-btn");
let titleInput = document.querySelector("#title");
let pagesInput = document.getElementById("pages");
let authorInput = document.getElementById("author");
let Library = document.getElementById("library");
statusValue = "";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.getElementById("read").checked) {
    statusValue = document.getElementById("read").value;
  } else if (document.getElementById("didnt").checked) {
    statusValue = document.getElementById("didnt").value;
  } else statusValue = "";
  myLibrary.push(
    new book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      statusValue,
    ),
  );
  inputs = document.querySelectorAll("form>input");
  inputs.forEach((element) => {
    element.value = "";
  });
  removeAllChildNodes(Library);
  formDialog.close();
  myLibrary.forEach((book) => {
    makeAbook(book);
  });
});

addBoookBtn.addEventListener("click", () => {
  formDialog.showModal();
});

function makeAbook(obj) {
  // Create a div element to represent the book
  let bookDiv = document.createElement("div");
  let titleFeild = document.createElement("div");
  let authorFeild = document.createElement("div");
  let pagesFeild = document.createElement("div");
  let statusFeild = document.createElement("div");
  let deleteBtn = document.createElement("button");
  let changStatus = document.createElement("button");
  let btnsContainer = document.createElement("div");
  changStatus.textContent = "change status";
  deleteBtn.textContent = "Delete";
  changStatus.classList.add(
    "w-max",
    "h-8",
    "bg-green-400",
    "rounded-lg",
    "px-2",
    "hover:bg-green-600",
    "shadow",
  );
  deleteBtn.classList.add(
    "w-24",
    "h-8",
    "bg-red-400",
    "rounded-lg",
    "hover:bg-red-600",
    "shadow",
  );
  changStatus.addEventListener("click", () => {
    if (statusFeild.textContent == "Status : Finished reading") {
      statusFeild.textContent = "Status : Haven't finished";
    } else if (statusFeild.textContent != "Status : Finished reading") {
      statusFeild.textContent = "Status : Finished reading";
    }
  });
  deleteBtn.addEventListener("click", (e) => {
    let theElment = e.target.parentElement.parentElement;
    let datAtt = theElment.getAttribute("data-location");

    Library.removeChild(theElment);
    myLibrary.splice(datAtt, 1);
  });
  btnsContainer.appendChild(deleteBtn);
  btnsContainer.appendChild(changStatus);
  btnsContainer.classList.add(
    "flex",
    "gap-2",
    "justify-center",

    "self-center",
    "mb-2",
  );

  titleFeild.textContent = `Title : ${obj.title}`;
  authorFeild.textContent = `By : ${obj.author}`;
  pagesFeild.textContent = `${obj.pages} pages`;
  statusFeild.textContent = `Status : ${obj.status}`;
  bookDiv.setAttribute("data-loacation", myLibrary.indexOf(obj));
  bookDiv.appendChild(titleFeild);
  bookDiv.appendChild(authorFeild);
  bookDiv.appendChild(pagesFeild);
  bookDiv.appendChild(statusFeild);
  bookDiv.appendChild(btnsContainer);
  bookDiv.classList.add(
    "flex",
    "gap-3",
    "flex-col",
    "items-center",
    "bg-zinc-300",
    "w-68",
    "h-72",
    "justify-between",
    "rounded-md",
    "shadow-inner",
    "p-3",
    "justify-self-stretch",
    "relative",
    "px-4",
  );
  let divs = bookDiv.querySelectorAll("div");
  divs.forEach((div) => {
    div.classList.add("font-bold", "self-start", "ml-4");
  });
  Library.appendChild(bookDiv);
}
