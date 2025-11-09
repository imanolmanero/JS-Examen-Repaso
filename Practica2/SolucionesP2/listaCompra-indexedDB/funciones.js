
// Variables globales
let db;
let botonAnadir = document.getElementById("banadir");
botonAnadir.addEventListener("click", fanadir);
let nuevoElemento = document.getElementById("canadir");
let listaCompra = document.getElementById("listaCompra");
document.getElementById("resetear").addEventListener("click", resetear);

let temporizador;
const retrasoDobleClick = 300;

// -------------------- IndexedDB: abrir o crear --------------------
const request = indexedDB.open("ListaCompraDB", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;
  if (!db.objectStoreNames.contains("productos")) {
    db.createObjectStore("productos", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function (e) {
  db = e.target.result;
  rellenarContenido();
};

request.onerror = function (e) {
  console.error("Error al abrir IndexedDB", e);
};

// -------------------- Funciones --------------------

function fanadir() {
  try {
    if (nuevoElemento.value === "")
      throw "No se pueden añadir elementos vacíos";

    const texto = nuevoElemento.value;
    nuevoElemento.value = "";

    const tx = db.transaction("productos", "readwrite");
    const store = tx.objectStore("productos");
    const addRequest = store.add({ nombre: texto });

    addRequest.onsuccess = function (e) {
      const id = e.target.result;
      const li = crearElementoLista(id, texto);
      listaCompra.appendChild(li);
    };
  } catch (e) {
    alert(e);
    nuevoElemento.focus();
  }
}

function crearElementoLista(id, texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  li.dataset.id = id;
  li.addEventListener("dblclick", eliminarLi);
  li.addEventListener("click", modificarLi);
  return li;
}

function rellenarContenido() {
  const tx = db.transaction("productos", "readonly");
  const store = tx.objectStore("productos");
  const request = store.getAll();

  request.onsuccess = function () {
    listaCompra.innerHTML = "";
    request.result.forEach((item) => {
      const li = crearElementoLista(item.id, item.nombre);
      listaCompra.appendChild(li);
    });
  };
}

function eliminarLi() {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    const id = Number(this.dataset.id);
    eliminarDeIndexedDB(id);
    this.remove();
  }, retrasoDobleClick);
}

function eliminarDeIndexedDB(id) {
  const tx = db.transaction("productos", "readwrite");
  const store = tx.objectStore("productos");
  const delRequest = store.delete(id);
  delRequest.onsuccess = () => console.log("Elemento eliminado:", id);
}

function modificarLi() {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    const nuevoProducto = prompt("Teclea el nuevo nombre", this.textContent);
    if (nuevoProducto) {
      this.textContent = nuevoProducto;
      this.style.color = "red";
      const id = Number(this.dataset.id);
      actualizarEnIndexedDB(id, nuevoProducto);
    }
  }, retrasoDobleClick);
}

function actualizarEnIndexedDB(id, nuevoTexto) {
  const tx = db.transaction("productos", "readwrite");
  const store = tx.objectStore("productos");
  store.put({ id: id, nombre: nuevoTexto });
}

function resetear() {
  const tx = db.transaction("productos", "readwrite");
  const store = tx.objectStore("productos");
  const clearRequest = store.clear();
  clearRequest.onsuccess = function () {
    listaCompra.innerHTML = "";
    console.log("Lista borrada");
  };
}
