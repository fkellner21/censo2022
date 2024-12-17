function chequearCedula(ci) {
// Esta funcion chequea la cedula del usuario, retorna true si la cedula es valida.
  if (ci.length === 7) { // si la cedula tiene 7 digitos, se le agrega un 0 al principio
    ci = "0" + ci; 
  }
  let valorAchequear = 0;
  for (let i = 0; i < ci.length - 1; i++) { // se multiplica cada digito por un numero y se suma
    let valor = parseInt(ci[i]); // se convierte el digito a numero
    switch (i) { // se multiplica cada digito por un numero y se suma
      case 0:
        valorAchequear = valor * 2;
        break;
      case 1:
        valorAchequear += valor * 9;
        break;
      case 2:
        valorAchequear += valor * 8;
        break;
      case 3:
        valorAchequear += valor * 7;
        break;
      case 4:
        valorAchequear += valor * 6;
        break;
      case 5:
        valorAchequear += valor * 3;
        break;
      case 6:
        valorAchequear += valor * 4;
        break;

      default:
        break;
    } 
  }
  let valorRedondo = valorAchequear; // se redondea el valor a chequear
  while (valorRedondo % 10 !== 0) { // mientras el valor no sea multiplo de 10, se le suma 1
    valorRedondo++; // se redondea el valor a chequear
  }
  let resultado = valorRedondo - valorAchequear; // se resta el valor a chequear con el valor redondeado
  return resultado === parseInt(ci[ci.length - 1]) 
}

function limpiarFormularioUsuario(){
  // Esta funcion limpia los campos del formulario de registro de usuario
  document.querySelector("#usuNombre").value="";
  document.querySelector("#usuApellido").value="";
  document.querySelector("#usuEdad").value="";
  document.querySelector("#slcUsuDepartamento").innerHTML="";
  document.querySelector("#slcUsuOcupacion").innerHTML="";
  document.querySelector("#pCensistaAsignado").innerHTML="";
}

function validarDatos(nombre, apellido, edad, departamento, ocupacion) {
  // Esta funcion valida los datos del formulario de registro de usuario, retorna true si los datos son validos.
  return (
    nombre.length > 0 && 
    apellido.length > 0 &&
    edad >= 0 &&
    edad < 130 &&
    departamento !== "sinDpto" &&
    ocupacion !== "sinOcupacion"
  );
}

//Censistas----------------------------------------------------------------------

function passValida(pass) {
  // Esta funcion valida la contraseña del censista, retorna true si la contraseña es valida. 
  let largo = pass.length >= 5;//verifica que cantenga 5 o mas caracteres
  let tieneMayuscula = false; // verifica que contenga una mayuscula
  for (let i = 0; i < pass.length; i++) {
    let codA = pass.charCodeAt(i);
    if (codA >= 65 && codA <= 90) {
      tieneMayuscula = true;
      break;
    }
  }
  let tieneMinuscula = false; // verifica que contenga una minuscula
  for (let i = 0; i < pass.length; i++) {
    let codA = pass.charCodeAt(i);
    if (codA >= 97 && codA <= 122) {
      tieneMinuscula = true;
      break;
    }
  }
  let tieneNumero
  for (let i = 0; i < pass.length; i++) { 
    let codA = pass.charCodeAt(i); // verifica que contenga un numero
    if (codA >= 48 && codA <= 57) { 
      tieneNumero = true;
      break;
    }
  }
  return (largo && tieneMayuscula && tieneMinuscula && tieneNumero);//si cumple con todo, retorna True
}


function limpiarFormularioCensista(){
  // Esta funcion limpia los campos del formulario de registro de censista
  document.querySelector("#txtUsuarioLogin").value="";
  document.querySelector("#txtPassLogin").value="";
}

function limpiarFormularioRegistroCensista(){
  // Esta funcion limpia los campos del formulario de registro de censista
  document.querySelector("#txtNombreCensista").value="";
  document.querySelector("#txtUsuario").value="";
  document.querySelector("#txtPass").value="";
}

function limpiarFormularioDatosCensista(){
  // Esta funcion limpia los campos del ingreso de datos del invitado
  document.querySelector("#txtNombreUsuCen").value="";
  document.querySelector("#txtApellidoUsuCen").value="";
  document.querySelector("#txtEdadUsuCen").value="";
  document.querySelector("#slcDptoUsuCen").innerHTML="";
  document.querySelector("#slcOcupacionUsuCen").innerHTML="";
}