// =======================
// FUNCIONES DE APOYO
// =======================

// Obtiene los datos del formulario y los devuelve como objeto
function obtenerDatosDelFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value;
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    const dia = document.getElementById('dia').value;

    return { nombre, edad, tipo, dia };
}

// Valida que todos los campos del formulario estén completos
function validarDatos(datos) {
    return datos.nombre && datos.edad && datos.tipo && datos.dia;
}



// =======================
// FUNCIONES DE TABLA
// =======================

// Agrega un usuario a la tabla en HTML
function agregarFilaATabla(usuario) {
    const tbody = document.querySelector('#tabla tbody');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.edad}</td>
        <td>${usuario.tipo}</td>
        <td>${usuario.dia}</td>
    `;
    tbody.appendChild(fila);
}

// Carga todos los usuarios desde localStorage y los muestra en la tabla
function cargarUsuariosDesdeLocalStorage() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(usuario => agregarFilaATabla(usuario));
}

// =======================
// FUNCIONES DE LOCAL STORAGE
// =======================

// Guarda un usuario en localStorage
function guardarUsuarioEnLocalStorage(usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Limpia datos del localStorage
function limpiarFormulario() {
    localStorage.removeItem('usuarios');
    window.location.reload()
}

// =======================
// FUNCIONES DE SERVIDOR
// =======================

// Envía los usuarios al servidor (simulación)
function enviarUsuariosAlServidor() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
        alert('No hay datos para enviar.');
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(usuarios),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => alert('Datos enviados al servidor (simulación).'))
    .catch(error => alert('Error al enviar datos: ' + error));
}

// =======================
// EVENTOS
// =======================

// Evento para guardar datos
document.getElementById('guardarBtn').addEventListener('click', () => {
    const usuario = obtenerDatosDelFormulario();

    if (!validarDatos(usuario)) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    agregarFilaATabla(usuario);
    guardarUsuarioEnLocalStorage(usuario);
});

// Evento para limpiar formulario
document.getElementById('limpiarBtn').addEventListener('click', limpiarFormulario);

// Evento para enviar datos al servidor
document.getElementById('enviarBtn').addEventListener('click', enviarUsuariosAlServidor);

// Cargar usuarios existentes al iniciar la página
window.onload = cargarUsuariosDesdeLocalStorage;

