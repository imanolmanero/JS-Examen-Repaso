window.onload = function(){
    cargarDatos();
};

function cargarDatos(){
    const aLibros = JSON.parse(localStorage.getItem('aLibros')) || [];

    aLibros.forEach(libro => {
        añadirFilaTabla(libro);
    });
}

function agregar(){
    // 1. Que todos los campos estén rellenos
    // 2. Que el título tenga al menos 2 caracteres
    // 3. Que el autor tenga al menos 3 caracteres
    // 4. Que las páginas sean > 0 Y < 10000
    // 5. Que el género no esté vacío ("")
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const paginas = document.getElementById('paginas').value;
    const genero = document.getElementById('genero').value;
    const estado = document.querySelector('input[name="estado"]:checked');

    if (!titulo || !autor || !paginas || !genero || !estado ){
        alert('Rellena todos los campos');
        return;
    }

    if (titulo.length <2 ){
        alert('El título tiene que tener al menos 2 caracteres');
        return;
    }

    if (autor.length <3 ){
        alert('El autor tiene que tener al menos 2 caracteres');
        return;
    }

    if (paginas <= 0 || paginas >= 10000 ){
        alert('Las páginas deben ser entre 1 y 9999');
        return;
    }

    if(genero === ""){
        alert('El genero no puede estar vacio');
        return;
    }

    const oLibro = {
        titulo: titulo,
        autor: autor,
        paginas: paginas,
        genero: genero,
        estado: estado.value
    }

    añadirFilaTabla(oLibro);

    guardarEnLocalStorage(oLibro);

    limpiar();
}

function añadirFilaTabla(oLibro){
    const tbody = document.getElementById('tablaLibros');
    const fila = document.createElement('tr');

    fila.innerHTML = `
    <td>${oLibro.titulo}</td>
    <td>${oLibro.autor}</td>
    <td>${oLibro.paginas}</td>
    <td>${oLibro.genero}</td>
    <td>${oLibro.estado}</td>
    `

    tbody.appendChild(fila);
}

function guardarEnLocalStorage(oLibro){
    const aLibros = JSON.parse(localStorage.getItem('aLibros')) || [];
    aLibros.push(oLibro);
    localStorage.setItem('aLibros', JSON.stringify(aLibros));
}

function limpiar(){
    document.getElementById('formularioLibros').reset();
}

function borrarTodo(){
    localStorage.clear();
    location.reload();
}