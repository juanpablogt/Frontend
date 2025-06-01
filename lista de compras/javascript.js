window.addEventListener("load", iniciar);

function iniciar() {
    let ourform = document.getElementById("ourform");
    let ourfield = document.getElementById("ourfield");
    let ourlist = document.getElementById("ourlist");

    ourform.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = ourfield.value.trim(); // Elimina espacios al inicio y al final
        if (inputValue !== "") {
            createItem(inputValue);
        } else {
            alert("No puedes agregar un elemento vacío.");
        }
    });

    function createItem(x) {
        let ourHTML = `<li class="lista-name">${x} <button class="delete" onclick="deleteItem(this)">Delete</button></li>`;
        ourlist.insertAdjacentHTML("beforeend", ourHTML);
        ourfield.value = "";
        ourfield.focus();
    }

    window.deleteItem = function(elementToDelete) {
        elementToDelete.parentElement.remove();
    };
}
