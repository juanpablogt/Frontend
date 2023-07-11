let ourform = document.getElementById("ourform");
let ourfield = document.getElementById("ourfield");
let ourlist = document.getElementById("ourlist");

ourform.addEventListener("submit", (e) => {
    e.preventDefault();
    createItem(ourfield.value);
});

function createItem(x) {
    let ourHTML = `<li>${x} <button onclick="deleteItem(this)">Delete</button></li>`;
    ourlist.insertAdjacentHTML("beforeend", ourHTML);
    ourfield.value = "";
    ourfield.focus();
}

function deleteItem(elementToDelete) {
    elementToDelete.parentElement.remove();
}
