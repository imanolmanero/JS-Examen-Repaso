// Esto se ejecuta cuando la página carga
window.onload = function(){
    cargarDatos();
};

function cargarDatos(){
    //Leer del localstorage
    let aPersonas = JSON.parse(localStorage.getItem('aPersonas')) || [];

    // Por cada persona, la mostramos en la tabla
    aPersonas.forEach(persona => {
        añadirFilaTabla(persona);
    });
}

function guardar(){
    // 1. OBTENER VALORES DEL FORMULARIO
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;

    // Para radio buttons necesitas el que está checked
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const dia = document.getElementById('dia').value;

    // 2. VALIDACIÓN SIMPLE
    if(!nombre || !edad || !tipo || !dia){
        alert('Rellena todos los campos');
        return;
    }

    // 3. CREAR OBJETO
    const oPersona = {
        nombre: nombre,
        edad: edad,
        tipo: tipo,
        dia: dia
    };

    // 4. AÑADIR A LA TABLA
    añadirFilaTabla(oPersona);

    // 5. GUARDAR EN LOCALSTORAGE
    guardarEnLocalStorage(oPersona);

    // 6. LIMPIAR FORMULARIO
    limpiarFormulario();
}

function añadirFilaTabla(oPersona){
    // Obtenemos el tbody de la tabla
    const tbody = document.getElementById('tablaBody');

    // Creamos una nueva fila
    const fila = document.createElement('tr');

    // Le ponemos el contenido HTML
    fila.innerHTML = `
    <td>${oPersona.nombre}</td>
    <td>${oPersona.edad}</td>
    <td>${oPersona.tipo}</td>
    <td>${oPersona.dia}</td>
    `;

    // Añadimos la fila al tbody
    tbody.appendChild(fila);
}

function guardarEnLocalStorage(oPersona){
    // 1. Leer lo que ya hay guardad
    let aPersonas = JSON.parse(localStorage.getItem('aPersonas')) || [];

    // 2. Añadir la nueva persona al array
    aPersonas.push(oPersona);

    // 3. Guardar todo el array actualizado
    localStorage.setItem('aPersonas', JSON.stringify(aPersonas));
}

function limpiarFormulario(){
    document.getElementById('miFormulario').reset();
}

function limpiar(){
    localStorage.clear();
}