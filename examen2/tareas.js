window.onload = function(){
    cargarDatos();
}

function cargarDatos(){
    let aTareas = JSON.parse(localStorage.getItem('aTareas')) || [];

    aTareas.forEach(tarea => {
        añadirFilaTabla(tarea);
    });
}

function agregar(){
    const titulo = document.getElementById('titulo').value;
    const prioridad = document.querySelector("input[name=prioridad]:checked").value;
    const categoria = document.getElementById('categoria').value;
    const fecha = document.getElementById('fecha').value;

    if (!titulo || !prioridad || !categoria || !fecha){
        alert('Rellena todos los campos');
        return;
    }

    const oTarea = {
        titulo: titulo,
        prioridad: prioridad,
        categoria: categoria,
        fecha: fecha
    };

    añadirFilaTabla(oTarea);

    guardarEnLocalStorage(oTarea);

    limpiar();
}

function añadirFilaTabla(oTarea){
    const tbody = document.getElementById('tablaTareas');
    const fila = document.createElement('tr');

    fila.innerHTML = `
    <td>${oTarea.titulo}</td>
    <td>${oTarea.prioridad}</td>
    <td>${oTarea.categoria}</td>
    <td>${oTarea.fecha}</td>
    `
    tbody.appendChild(fila);
}

function guardarEnLocalStorage(oTarea){
    let aTareas = JSON.parse(localStorage.getItem('aTareas')) || [];
    aTareas.push(oTarea);
    localStorage.setItem('aTareas', JSON.stringify(aTareas));
}

function borrarTodo(){
    localStorage.clear();
    location.reload();
}

function limpiar(){
    document.getElementById('formularioTareas').reset();
}