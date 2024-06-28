const parrafo = document.querySelector('.segundoMensaje');

export const mensajeInformativo = async () => {
   parrafo.textContent = "<%= exito %>"

}