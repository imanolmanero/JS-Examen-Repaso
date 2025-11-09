// Eventos
document.getElementById("bValidar").addEventListener("click", validar);
document.getElementById("bBorrar").addEventListener("click", borrar);

function validarUnTexto(caja)
{
    let exReg = new RegExp(/^[A-Z]{1}[a-z]+$/);
    if (!exReg.test(caja.value)){
        caja.focus(); // colocar el cursor
        caja.value = "Dato incorrecto";
        throw "Datos incorrectos";
    }
}

function validar() {
    try 
    {
        // Recoger datos de entrada. CAJAS no value en este ejercicio.
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let correo = document.getElementById("correo");
        let poblacion = document.getElementById("poblacion");
        let provincia = document.getElementById("provincia");

        // Validaciones de texto
        validarUnTexto(nombre);
        validarUnTexto(apellido);

        let exRegEmail = new RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')

        // Parametro con la expresión regular para reutilizar la función
        if (!exRegEmail.test(correo.value))
        {
            correo.focus();
            throw "En el formulario hay datos incorrectos";
        }

        validarUnTexto(poblacion);
        validarUnTexto(provincia);

        //radios y ckeckbox
        let edades = document.getElementsByName("edad");
        let i;
        for (i = 0; i < edades.length && !edades[i].checked  ; i++);
        if (i == edades.length)
            throw "La edad es obligatoria";
        let edad = edades[i].value;


        let conocidos = document.getElementsByName("razon");
        let conocido = "";
        for (i = 0; i < conocidos.length; i++) {
            if (conocidos[i].checked) {
                conocido += conocidos[i].value + " ";
            }
        }
        // Crear objeto
        // class, function, ...
        let objeto={
            nombre:nombre.value, 
            apellido:apellido.value,
            correo:correo.value,
            poblacion:poblacion.value,
            provincia:provincia.value,
            edad:edad,
            conocido:conocido
        };

        let objetoJSON = JSON.stringify(objeto);

        alert("Tu nombre es: " + objeto.nombre
            + "\n Tu apellido es: " + objeto.apellido
            + "\n Tu correo es: " + objeto.correo
            + "\n Tu poblacion es: " + objeto.poblacion
            + "\n Tu provincia es: " + objeto.provincia
            + "\n Tu edad es entre: " + objeto.edad
            + "\n Nos conoces mediante: " + objeto.conocido);

        alert("Objeto json: " + objetoJSON);
    }
    catch(err)
    {
        alert(err);
    }

}

//funcion borrar datos
function borrar() {
    // boton de reset
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("poblacion").value = "";
    document.getElementById("provincia").value = "";

    let edades = document.getElementsByName("edad");
    let i;
    for (i = 0; i < edades.length && !edades[i].checked  ; i++); // Solo un radio
    if (i != edades.length)
        edades[i].checked = false;

    let conocidos = document.getElementsByName("razon");
    let conocido = "";
    for (i = 0; i < conocidos.length; i++) {
        if (conocidos[i].checked) {
            conocidos[i].checked = false;
        }
    }
}