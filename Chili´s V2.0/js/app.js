const referenciaMensaje = {
    "mesas": "La mesa",
    "fecha": "La fecha",
    "nPersonas": "El numero de personas",
    "preferencias": "Las preferencias",
    "comentarios": "El comentario",
}

document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp(){
    const botonMenu = document.querySelector(".button__menu");
    const botonNavegacion = document.querySelector(".nav__button");
    const enlaces = document.querySelectorAll(".navegacion__enlace")
    const form = document.querySelector("#form")
    
    botonMenu.addEventListener("click", handleMenu);
    botonNavegacion.addEventListener("click", handleMenu);
    enlaces.forEach(e => e.addEventListener("click", handleMenu))

    form.addEventListener("submit", handleForm)

    function handleMenu(){
        const navegacion = document.querySelector(".nav")

        if(!navegacion.classList.contains("activo")){
            if(navegacion.classList.contains("inactivo")){
                navegacion.classList.remove("inactivo")
            }
            navegacion.classList.add("activo")
        }else{
            if(navegacion.classList.contains("activo")){
                navegacion.classList.remove("activo")
            }
            navegacion.classList.add("inactivo")
        }
    }

    async function handleForm(e){
        e.preventDefault();

        const inputMesas = document.querySelector("#mesas");
        const inputFecha = document.querySelector("#fecha");
        const inputPersonas = document.querySelector("#nPersonas");
        const inputPreferencias = document.querySelector("#preferencias");
        const inputComentarios = document.querySelector("#comentarios");
        const inputContainer = document.querySelector("#inputContainer")
        const contenedorMensajes = inputContainer.querySelector("#inputMensajes")
        const inputSubmit = inputContainer.querySelector("#inputSubmit")
        inputSubmit.disabled = true;

        limpiaHTML();
        let errores = 0;
        const arregloInputs = [inputMesas, inputFecha, inputPersonas, inputPreferencias, inputComentarios]
        arregloInputs.forEach(input => {errores += validaForm(input)})

        if(errores > 0){
            inputSubmit.disabled = false;
            return;
        }

        const datos = {}

        arregloInputs.forEach(input => {
            datos[input.name] = !isNaN(+input.value.trim()) && input.value.trim() !== "" ? +input.value.trim() : input.value.trim()
        })
        inputSubmit.classList.add("form__input--ocultar")
        const spinner = creaSpinner()
        inputContainer.appendChild(spinner)
        
        const respuesta = await enviaPeticion()
        
        setTimeout(() => {
            inputSubmit.disabled = false;
            inputSubmit.classList.remove("form__input--ocultar")
            spinner.remove();
            if(Object.keys(respuesta).length === 0){
                muestraMensaje(contenedorMensajes, "Ocurrió un error al momento de reservar")
            }
        }, 3000);

        form.reset();
    }

    function validaForm(input){
        let errores = 0;
        if((input.id === "mesas" || input.id === "fecha" || input.id === "nPersonas") && input.value.trim() === ""){
            muestraMensaje(input.parentElement, `${referenciaMensaje[input.id]} no puede ir vacío`)
            errores++;
        }
        
        if(input.id === "nPersonas" && (+input.value.trim() < 1 || +input.value.trim() > 10) && input.value.trim() != ""){
            muestraMensaje(input.parentElement, `${referenciaMensaje[input.id]} debe ser mayor o igual a 1 y menor o igual 10`)
            errores++;
        }

        return errores;
    }

    function muestraMensaje(referencia, mensaje, tipo = "error"){
        const parrafoMensaje = document.createElement("P");
        parrafoMensaje.textContent = mensaje;
        if(tipo === "error"){
            parrafoMensaje.classList.add("form__mensaje--error")
        }else{
            parrafoMensaje.classList.add("form__mensaje--exito")
        }
        referencia.appendChild(parrafoMensaje)

        setTimeout(() => {
            parrafoMensaje.remove()
        }, 3000);
    }

    function limpiaHTML(){
        const mensajesError = document.querySelectorAll(".form__mensaje--error");
        const mensajeExito = document.querySelector(".form__mensaje--exito");
        if(mensajesError){
            mensajesError.forEach(e => e.remove())
        }
        if(mensajeExito){
            mensajesError.remove();
        }
    }

    async function enviaPeticion(datos){
        try{
            const resultado = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            })
            const respuesta = await resultado.json()
            return respuesta
        }catch(error){
            return {}
        }
    }

    function creaSpinner(){
        const divContainer = document.createElement("DIV");
        divContainer.classList.add("sk-folding-cube")

        for (let index = 0; index < 4; index++) {
            const element = document.createElement("DIV");
            if(index === 2){
                element.classList.add(`sk-cube4`, "sk-cube")
            }else if(index === 3){
                element.classList.add(`sk-cube3`, "sk-cube")
            }else{
                element.classList.add(`sk-cube${index+1}`, "sk-cube")
            }
            divContainer.appendChild(element)
        }

        return divContainer
    }
}