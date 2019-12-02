// Este código es para llamar a una api que devuelve preguntas.

// Declaración de variables

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://preguntas-random.herokuapp.com/preguntas`; // site that doesn’t send Access-Control-*function()

var contenedor = document.getElementById('contenedor')
var botonesEliminar = [];
var idsExistentes = [];
var id;
var contadorId = 500;
var botonAgregar = document.getElementById('crear');

let mostrar = document.getElementById('mostrar');

// Funciones auxiliares

function obtenerId(e){
    return id = e.target.id;
}

// Llamados a la api

function obtener(){
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => {
        console.log(JSON.parse(contents));

        contenedor.innerHTML = '';
        JSON.parse(contents).forEach(preg => {
            let div = document.createElement('div');
            let pregunta = document.createElement('span');
            let botonEliminar = document.createElement('button');
            botonesEliminar.push(botonEliminar);
            
            pregunta.className = 'pregunta';
            botonEliminar.className = 'eliminarPregunta';
            botonEliminar.id = preg.id;
            
            idsExistentes.push(preg.id);

            botonEliminar.innerHTML = 'X';
            pregunta.innerHTML = preg.Content;

            contenedor.appendChild(div);
            div.appendChild(pregunta);
            div.appendChild(botonEliminar);

        });

        botonesEliminar.forEach(boton => boton.addEventListener('click', e => {
            obtenerId(e);
            borrar(id);
            })
        );
    })
    .catch((error) => console.log("Can’t access " + url + " response. Blocked by browser?",error))
}

function borrar(id){
    fetch(`${proxyurl}${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(contents => {
        console.log(JSON.parse(contents));
        obtener();
    })
    .catch((error) => console.log("Can’t access " + url + " response. Blocked by browser?",error))
}

function crear(idNuevo, contenidoNuevo){
    fetch(`${proxyurl}${url}`, {
        method: "POST",
        body: JSON.stringify({
            "id": `${idNuevo}`,
            "Content": `${contenidoNuevo}`
        })
    })
    .then(response => response.json())
    .then(contents => {
        console.log(contents);
        contadorId++;
    })
    .catch((err) => console.log(err,"Can’t access " + url + " response. Blocked by browser?"))
}

// Acá se agregan los eventListeners que ejecutan a las funciones declaradas arriba

mostrar.addEventListener('click', obtener);
botonAgregar.addEventListener('click', () => {
    let nuevaPregunta = document.getElementById('preguntaCreada').value;
    console.log('nuevaPregunta', nuevaPregunta);
    crear(contadorId, nuevaPregunta);
})