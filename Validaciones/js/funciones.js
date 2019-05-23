/**
 * Funcion que se ejecuta cuando el document esta cargado
 */
function ready() {
    // agreagr el elemento div para los mensages de error
    let inputs = document.getElementsByClassName('input-field');
    for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i];
        var divMsg = document.createElement('div');
        divMsg.className = "message-error";
        element.appendChild(divMsg);
    }
}

function openModal() {
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

/**
 * Metodo que se ejecuta cunando se aplasta el summit
 */
function save() {

    return validarFields('PER');
}

/**
 * Funcion que valida los fields segun el key de validcion
 * @param key
 */
function validarFields(key) {
    let valido = true;
    if (!validarFieldsDosPalabras(key)) {
        valido = false;
    }
    if (!validadFieldsCedula(key)) {
        valido = false;
    }
    if (!validarFieldEmail(key)) {
        valido = false;
    }
    if (!validarFieldsVacios(key)) {
        valido = false;
    }
    return valido;
}

/**
 * Metodo que valida que un field tenga solo letras
 * @param event
 */
function validarTexto(event) {
    if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
    }
}

/**
 * Metodo que valida que un field tenga solo numeros
 * @param event
 */
function validarNumero(event) {
    if (!(event.key >= '0' && event.key <= '9')) {
        event.preventDefault();
    }
}

/**
 * Metodo que valida que un field no este vacio
 * @param element
 */
function validarFieldVacio(element) {
    // verifica si los campos estan llenos
    removerErrorMessage(element.parentElement);
    element.classList.remove('error');
    element.value = element.value.trim();
    if (element.value === '') {
        if (element.classList.contains('requeried')) {
            element.classList.add('error');
            agregarErrorMessage(element.parentElement, 'El campo es requerido');
        }
        return false;
    } else {
        return true;
    }
}

/**
 * Metodo que valida que los fields no esten vacios
 * @param key
 */
function validarFieldsVacios(key) {
    let valido = true;
    let fields = document.getElementsByClassName('validate' + key);
    for (let i = 0; i < fields.length; i++) {
        let element = fields[i];
        if (!validarFieldVacio(element)) {
            valido = false;
        }
    }
    return valido;
}

/**
 * Metodo que valida que un field tenga unicamente dos palabras
 * @param key
 */
function validarFieldsDosPalabras(key) {
    // valida que los fields tengan dos palabras
    let valido = true;
    let fields = document.getElementsByClassName('valid-two-words' + key);
    for (let i = 0; i < fields.length; i++) {
        let element = fields[i];
        if (validarFieldVacio(element)) {
            // expresion regular que verifica que se haya ingresado unicamente dos palabras
            if (/^[A-Za-z]+\s+[A-Za-z]+$/g.test(element.value)) {
                let valores = element.value.split(' ');
                element.value = valores[0] + ' ' + valores[valores.length - 1];
                element.classList.remove('error');
                removerErrorMessage(element.parentElement);
            } else {
                valido = false;
                element.classList.add('error');
                agregarErrorMessage(element.parentElement, 'Los datos no cumplen con el formato requerido');
            }
        } else {
            if (element.classList.contains('requeried')) {
                valido = false;
            }
        }
    }
    return valido;
}

/**
 * Metodo que valida un field de una cedula
 * @param key
 */
function validadFieldsCedula(key) {
    // valida que el field corresponda a un cedula verdadera
    let valido = true;
    let fields = document.getElementsByClassName('valid-cedula' + key);
    for (let i = 0; i < fields.length; i++) {
        let element = fields[i];
        if (validarFieldVacio(element)) {
            element.classList.add('error');
            if (element.value.length === 10) {
                // metodo que valida si la cedula es correcta
                if (validarCedula(element.value)) {
                    element.classList.remove('error');
                    removerErrorMessage(element.parentElement);
                } else {
                    valido = false;
                    agregarErrorMessage(element.parentElement, 'La cedula es invalida');
                }
            } else {
                valido = false;
                agregarErrorMessage(element.parentElement, 'La cedula debe tener 10 digitos');
            }
        } else {
            if (element.classList.contains('requeried')) {
                valido = false;
            }
        }
    }
    return valido;
}

/**
 * Metodo que valida un field de un e-mail
 * @param key
 */
function validarFieldEmail(key) {
    // valida que el field corresponda a un email verdadero
    let valido = true;
    let fields = document.getElementsByClassName('valid-email' + key);
    for (let i = 0; i < fields.length; i++) {
        let element = fields[i];
        if (validarFieldVacio(element)) {
            // expresion regular que valida el e-mail
            if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g.test(element.value)) {
                element.classList.remove('error');
                removerErrorMessage(element.parentElement);
            } else {
                valido = false;
                element.classList.add('error');
                agregarErrorMessage(element.parentElement, 'Formato e-mail incorrecto');
            }
        } else {
            if (element.classList.contains('requeried')) {
                valido = false;
            }
        }
    }
    return valido;
}

/**
 * Metodo que agrega el mensage de error a un field
 * @param element
 */
function agregarErrorMessage(element, mensage) {
    let megs = element.querySelector('div.message-error');
    megs.innerHTML = '<p>' + mensage + '</p>';
}

/**
 * Metodo que elimina el mensage de error de un field
 * @param element
 */
function removerErrorMessage(element) {
    let megs = element.querySelector('div.message-error');
    while (megs.firstChild) {
        megs.removeChild(megs.firstChild);
    }
}

/**
 * Metodo que verifica si una cedula es verdadera
 * @param cedula
 * @returns {boolean}
 */
function validarCedula(cedula) {
    // algoritmo de validacion de cedula
    var total = 0;
    var longitud = cedula.length;
    var longcheck = longitud - 1;
    for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
            var aux = cedula.charAt(i) * 2;
            if (aux > 9) aux -= 9;
            total += aux;
        } else {
            total += parseInt(cedula.charAt(i));
        }
    }
    total = total % 10 ? 10 - total % 10 : 0;
    return cedula.charAt(longitud - 1) == total;
}