const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://preguntas-random.herokuapp.com/preguntas`; // site that doesn’t send Access-Control-*function()
var contenedor = document.getElementById('contenedor')

var botonesEliminar = [];

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

            botonEliminar.className = 'eliminarPregunta';
            botonEliminar.id = preg.id;

            botonEliminar.innerHTML = 'Eliminar';
            pregunta.innerHTML = preg.Content;

            contenedor.appendChild(div);
            div.appendChild(pregunta);
            div.appendChild(botonEliminar);

        });

        botonesEliminar.forEach(boton => boton.addEventListener('click', e => {
            console.log('Estoy haciendo algo');
            obtenerId(e);
            borrar(id);
            })
        );
    })
    .catch((error) => console.log("Can’t access " + url + " response. Blocked by browser?",error))
}

var id;
// var botonesEliminar = document.getElementsByClassName('eliminarPregunta');
console.log('botonesEliminar', botonesEliminar);

function obtenerId(e){
    return id = e.target.id;
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

let mostrar = document.getElementById('mostrar');
mostrar.addEventListener('click', obtener);

var contadorId = 500;
var botonAgregar = document.getElementById('crear');

botonAgregar.addEventListener('click', () => {
    let nuevaPregunta = document.getElementById('preguntaCreada').value;
    console.log('nuevaPregunta', nuevaPregunta);
    crear(contadorId, nuevaPregunta);
})

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