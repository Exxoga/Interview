/* Selectores */
const comments = document.querySelector('#comentarios');
const resultado = document.querySelector('#resultado');
const boton = document.querySelector('#boton');

/* Event Listeners */
boton.addEventListener('click', consultarAPI);
document.addEventListener('DOMContentLoaded', bienvenida);
/* Arreglo de comentarios */
let comment = [];

/* Función de bienvenida */
function bienvenida() {
  alert('Bienvenid@');
};

/* Función asincrona para consultar la API */
async function consultarAPI(e) {
  e.preventDefault();
  /* URL a la imagen Random de Perro */
  const url = "https://dog.ceo/api/breeds/image/random"

  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    /* Funcion que imprime las imagenes */
    mostrarImagen(resultado.message);

    /* Funcion que manda el metodo GET para los comentarios */
    mostrarComentarios();
  } catch (error) {
    console.log(error);
  }
};

function mostrarImagen(img) {

  /* Funcion que permite limpiar el HTML de busquedas prevías en caso de una nueva busqueda */
  limpiarHTML();


  const imagenDiv = document.createElement('div');
  imagenDiv.classList.add('container');


  const imagen = document.createElement('img');
  imagen.classList.add('resultado_imagen');
  imagen.setAttribute("src", img);

  imagenDiv.appendChild(imagen);

  resultado.appendChild(imagenDiv);
};

async function mostrarComentarios() {

  /* URL al JSON con los comentarios */

  const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    /* Se agrega el resultado al arreglo de comentarios para poder iterar sobre el */
    comment = [resultado];
    /* Funcion que imprime los comentarios en HTML */
    imprimirComentarios(comment);
  } catch (error) {
    console.log(error);
  };
};

function imprimirComentarios([comentarios]) {

  /* Limpia el HTML de busquedas prevías */
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }

  const comentariosP = document.createElement('p');
  comentariosP.textContent = 'Comentarios';
  comentariosP.classList.add('comentarios');

  comments.appendChild(comentariosP);

  comentarios.forEach(comentario => {
    const { body, email, id, name } = comentario;
    const comentarioDiv = document.createElement('div');

    comentarioDiv.classList.add('comentario_container');
    comentarioDiv.dataset.id = id;
    comentarioDiv.innerHTML = `
      <h2 class="comentario_container-name">Nombre: ${name}</h2>
      <a href="#">${email}</a>
      <p>${body}</p>
    `;

    /* Se crea el boton que permite eliminar un comentario del HTML*/
    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.classList.add('btn');

    /* Funcion que permite borrarlo */
    btnBorrar.onclick = () => {
      borrarComentario(id);
    };

    comentarioDiv.appendChild(btnBorrar);

    comments.appendChild(comentarioDiv);
  });
};

function borrarComentario(id) {
  /* Se extrae del arreglo para poder filtrar el resultado del mismo */
  const [comentarios] = comment;

  /* Funcion de filtrado */
  const filtrado = comentarios.filter(comentario => comentario.id !== id);

  /* Se vuelve agregar al arreglo para que en la función que imprime los comentarios no haya inconvenientes */
  comment = [filtrado];

  /* Se manda a llamar de nuevo la función de imprimir en el HTML */
  imprimirComentarios(comment);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  };
};

