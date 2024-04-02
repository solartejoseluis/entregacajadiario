document.getElementById("registro-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    fetch("registrar.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        cargarRegistros();
    })
    .catch(error => console.error("Error:", error));
});

function cargarRegistros() {
    fetch("listar.php")
    .then(response => response.text())
    .then(data => {
        document.getElementById("registros-container").innerHTML = data;
    })
    .catch(error => console.error("Error:", error));
}

cargarRegistros();
