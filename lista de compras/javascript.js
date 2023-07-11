let ourform = document.getElementById("our form");
let ourfield = document.getElementById("our field");
let ourlist = document.getElementById("our list");

ourform.addEventListener("submit", () => {
    e.preventDefault();
    createItem(ourfield.value);
});

function createItem(x) {
    let ourHTML = `<li>${x} <button onclick="deleteItem(this)">Delete</button></li>`;
    ourfield.insertAdjacentHTML("befored", ourHTML);
    ourfield.value = "";
    ourfield.focus();
}

function deleteItem(elementToDelete) {
    elementToDelete.parentElement.remove();
}
