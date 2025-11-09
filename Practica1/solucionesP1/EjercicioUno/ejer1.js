// Eventos
document.getElementById("bValidar").addEventListener('click',validar);
document.getElementById("bSalir").addEventListener('click',salir);

// " Base de datos"
let usuarios=[
    {nombre: "aaaaa", con:"12345Abcde"},
    {nombre: "bbbbb", con:"92345Abcde"}
];

function validar()
{
    try 
    {
        // Recoger datos de entrada
        let usuario = document.getElementById("usuario").value;
        let contrasena = document.getElementById("contrasena").value;

        // Validar
        if (usuario === "" || contrasena === "")
            throw "Datos de entrada obligatorios";

        validarUsuario(usuario);

        validarContrasenna(contrasena);
        
        // Buscar en la "base de datos"
        if (usuarios.find(dato => dato.nombre == usuario && dato.con == contrasena))
            alert("Bienvenidx");
        else
            throw "Usuario y/o contraseña no valido";
    }
    catch(e)
    {
        alert(e);
    }
}

function salir(){
    alert("Adios");
}

function validarUsuario(username)
{
    // entre 4 y 10 caracteres y que solo contenga letras y números
    const regexUsername = /^[A-Za-z0-9]{4,10}$/;
    if (!regexUsername.test(username)) {
        throw new Error("El nombre de usuario debe tener entre 4 y 10 caracteres y solo contener letras y números.");
    }
}

function validarContrasenna(contrasenna)
{
    // Debe tener al menos 8 caracteres, debe contener al menos una letra mayúscula, una minúscula y un número
    const regexContrasenna = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regexContrasenna.test(contrasenna))
    {
        // Se relanza
        throw new Error("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número.");
    }
}

