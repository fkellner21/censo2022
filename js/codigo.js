"use strict";
let unS = new Sistema();


//Escucha de los botones------------------------------------------------------------------------------
document.querySelector("#btnSlcCensista").addEventListener("click", volverRegistroCensista);
document.querySelector("#btnSlcInvitado").addEventListener("click", mostrarIngresoInvitado );
document.querySelector("#btnVolverCensista").addEventListener("click", mostrarPantallaInicial);
document.querySelector("#btnVolverInvitado").addEventListener("click", mostrarPantallaInicial);
document.querySelector("#btnIngresoInvitado").addEventListener("click", ingresoInvitado);
document.querySelector("#btnAgregarCensista").addEventListener("click", agregarCensista);
document.querySelector("#btnGoBackCensista").addEventListener("click", volverRegistroCensista);
document.querySelector("#btnBorrarUsuario").addEventListener("click", borrarUsuario);
document.querySelector("#btnLoginCensista").addEventListener("click", loginCensista);
document.querySelector("#btnGuardarUsuario").addEventListener("click", guardarDatosUsuario);
document.querySelector("#btnReporteUsuario").addEventListener("click", reporteUsuario);
document.querySelector("#btnVolverReporteUsuario").addEventListener("click", volverReporteUsuario);
document.querySelector("#btnCensistaLogout").addEventListener("click", logout);
document.querySelector("#btnRegistroCensista").addEventListener("click", registrarCensista);
document.querySelector("#btnIngresarDatosDesdeCensista").addEventListener("click", ingresarDatosDesdeCensista);
document.querySelector("#btnValidarDesdeCensista").addEventListener("click", validarDatosDesdeCensista);
document.querySelector("#btnVolverAtrasCI").addEventListener("click", volverAtrasCI);
document.querySelector("#btnCancelCensista").addEventListener("click", cancelDatosCensista);
document.querySelector("#btnGuardarYvalidar").addEventListener("click", guardarYvalidar);
document.querySelector("#btnReasignarCensista").addEventListener("click", menuReasignarCensista);
document.querySelector("#btnReasignar").addEventListener("click", ejecutarReasignarCensista);
document.querySelector("#btnVolverDeReasignar").addEventListener("click", volverDesdeReasignar);
document.querySelector("#btnInfoEstadisticaCensista").addEventListener("click", infoEstadisticaCensista);
document.querySelector("#btnVolverDesdeEstadisticaCencista").addEventListener("click", volverDesdeEstadisticaCensista);

//Movimientos entre pantallas-------------------------------------------------------------------------

mostrarDiv("index"); //muestra la pantalla inicial

function mostrarIngresoCensista() {
  mostrarDiv("loginCensista"); //muestra el login del censista
}

function mostrarIngresoInvitado() {
  document.querySelector("#ciInvitado").value=""; //limpia el campo de cedula
  mostrarDiv("loginUsuario"); //muestra el login del usuario
}

function mostrarPantallaInicial() {
  mostrarDiv("index"); //muestra la pantalla inicial
}

function volverRegistroCensista() {
  limpiarFormularioCensista(); //limpia el formulario
  limpiarFormularioRegistroCensista(); 
  mostrarDiv("loginCensista"); //muestra el login del censista
} 

function ocultarTodosLosDivs() {
  let divsAocultar = document.querySelectorAll(".divs"); //oculta todos los divs
  for (let i = 0; i < divsAocultar.length; i++) { //recorre el array de divs
    let divActual = divsAocultar[i];  // toma el div actual
    divActual.style.display = "none"; //lo oculta
  }
}

function registrarCensista(){
  limpiarFormularioCensista(); //limpia el formulario
  mostrarDiv("registroCensista"); //muestra el formulario de registro
}

function mostrarDiv(id) { //muestra el div que se le pasa por parametro
  ocultarTodosLosDivs();  //oculta todos los divs
  document.querySelector("#" + id).style.display = "block"; //muestra el div que se le pasa por parametro
}

function volverAtrasCI(){
  mostrarDiv("menuCensista"); //muestra el menu del censista
  document.querySelector("#txtCedulaDesdeCensista").value = ""; //limpia el campo de cedula
}

function cancelDatosCensista(){ 
  mostrarDiv("menuCensista"); //muestra el menu del censista
  limpiarFormularioDatosCensista(); 
  document.querySelector("#txtCedulaDesdeCensista").value = ""; 
}

function volverDesdeReasignar(){
  mostrarDiv("menuCensista"); 
}

function volverDesdeEstadisticaCensista(){
  mostrarDiv("menuCensista");
}

//Fin Movimientos entre pantallas --------------------------------------------------------------
/* FUNCIONES DEL USUARIO */

function ingresoInvitado() {
  let cedulaInvitado = document.querySelector("#ciInvitado").value; //toma la cedula
  cedulaInvitado = cedulaInvitado.split(".").join("").split("-").join(""); //toma la cedula y la formatea
  unS.usuarioLogueado=unS.buscarUsuario(parseInt(cedulaInvitado)); //busca el usuario en la base de datos
  if (unS.usuarioLogueado !== null && unS.usuarioLogueado.validado===false) { //revisa que el usuario no tenga el censo validado y que exista dentro de la base de datos 
    mostrarDiv("datosUsuario");
    document.querySelector("#usuNombre").value = unS.usuarioLogueado.nombre;  //carga los datos de la base en el formulario
    document.querySelector("#usuApellido").value = unS.usuarioLogueado.apellido; 
    document.querySelector("#usuEdad").value = unS.usuarioLogueado.edad; 
    let tablaDpto = `<Option value="sinDpto" >"Seleccione..."</Option>`; 
    for (let i = 0; i < unS.departamentos.length; i++) { //carga el slc de departamentos
      let departamento = unS.departamentos[i].nombre; //toma el nombre del departamento
      if (unS.usuarioLogueado.departamento.nombre === departamento) { //si el departamento del usuario es igual al departamento del array
        tablaDpto += `<Option selected="selected">${departamento}</Option>`;  //queda seleccionado el correspondiente al usuario
      }
      else {tablaDpto += `<Option >${departamento}</Option>`;} 
    }
    document.querySelector("#slcUsuDepartamento").innerHTML += tablaDpto; //carga el slc de departamentos
    let tablaOcupacion = `<Option value="sinOcupacion" >"Seleccione..."</Option>`;
    for (let i = 0; i < unS.ocupacion.length; i++) { //carga el slc de ocupaciones
      let ocupacion = unS.ocupacion[i]; //toma el nombre de la ocupacion
      if (unS.usuarioLogueado.ocupacion === ocupacion) { //si la ocupacion del usuario es igual a la ocupacion del array
        tablaOcupacion += `<Option selected="selected">${ocupacion}</Option>`;  //queda seleccionada la ocupacion del usuario
      }
      else {tablaOcupacion += `<Option >${ocupacion}</Option>`;} 
    }
    document.querySelector("#slcUsuOcupacion").innerHTML += tablaOcupacion;
    document.querySelector("#pCensistaAsignado").innerHTML += `El censista asignado para visitar su domicilio es: ${unS.usuarioLogueado.censista.nombre}`//notifica el censista designado
  }
  else {
    if(unS.usuarioLogueado !== null && unS.usuarioLogueado.validado===true){  //si el censo ya fue validado, lo avisa y no ingresa al formulario
      alert("Su censo ya fue validado, no puede volver a modificarlo.");
    }
    else 
      if (chequearCedula(cedulaInvitado)){  //si la cedula es válida pero no esta en la base de datos carga el formulario vacío
        mostrarDiv("datosUsuario");
        let tablaDpto = `<Option value="sinDpto" >"Seleccione..."</Option>`; //carga el slc de departamentos
        for (let i = 0; i < unS.departamentos.length; i++) { //carga el slc de departamentos
        let departamento = unS.departamentos[i].nombre; //toma el nombre del departamento
        tablaDpto += `<Option >${departamento}</Option>`; //carga el slc de departamentos
        }
        document.querySelector("#slcUsuDepartamento").innerHTML += tablaDpto; 
        let tablaOcupacion = `<Option value="sinOcupacion" >"Seleccione..."</Option>`;
        for (let i = 0; i < unS.ocupacion.length; i++) { //carga el slc de ocupaciones
        let ocupacion = unS.ocupacion[i]; //toma el nombre de la ocupacion
        tablaOcupacion += `<Option >${ocupacion}</Option>`; //carga el slc de ocupaciones
        }
        document.querySelector("#slcUsuOcupacion").innerHTML += tablaOcupacion;
        } 
      else {
        alert("Cédula inválida, por favor verifique y vuelva a intentar");  //si la cedula no es valida, avisa
        }
  } 
}

function borrarUsuario(){
  if(unS.usuarioLogueado!==null){ //verifica que el usuario este logueado(exista en la base de datos) y lo elimina del array
    unS.borrarUsuarioDelArray(unS.usuarioLogueado.cedula); //elimina el usuario del array
    unS.usuarioLogueado=null; //elimina el objeto del usuario logueado
    document.querySelector("#ciInvitado").value=""; //limpia el campo de cedula
    mostrarDiv("loginUsuario"); 
    alert("Sus datos fueron eliminados correctamente.")
    limpiarFormularioUsuario()
  }
  else{ //cuando ingresa por primera vez y se arrepiente
    document.querySelector("#ciInvitado").value="";
    mostrarDiv("loginUsuario");
    limpiarFormularioUsuario()
  }
}

function guardarDatosUsuario(){
 
    let nombre = document.querySelector("#usuNombre").value;      //toma los valores del formulario
    let apellido = document.querySelector("#usuApellido").value;
    let edad = parseInt(document.querySelector("#usuEdad").value);
    let departamentoValue = document.querySelector("#slcUsuDepartamento").value;
    let departamento = unS.buscarDepartamento(departamentoValue);
    let ocupacion = document.querySelector("#slcUsuOcupacion").value;
    let cedulaInvitado = document.querySelector("#ciInvitado").value;
    cedulaInvitado = parseInt(cedulaInvitado.split(".").join("").split("-").join(""));

if (validarDatos(nombre, apellido, edad, departamentoValue, ocupacion)){  //si los datos son válidos
    
  if (unS.usuarioLogueado===null) {   //cuando es la primera vez que ingresa sus datos, agrega un usuario al array
     unS.agregarUsuarioNuevo(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion);
     alert(`Sus datos fueron guardados correctamente, el censista asignado para usted es: ${(unS.buscarUsuario(cedulaInvitado)).censista.nombre}`)
     limpiarFormularioUsuario();
     document.querySelector("#ciInvitado").value="";
     mostrarDiv("loginUsuario");
  } 
  else{ //si ya existía, lo sobreescribe
    unS.sorbreescribirUsuario(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion);
    alert("Sus datos fueron modificados correctamente.")
    limpiarFormularioUsuario();
    document.querySelector("#ciInvitado").value="";
    mostrarDiv("loginUsuario");
  }
  unS.usuarioLogueado=null
}
else alert("Error en los datos ingresados, por favor vuelva a intentar.") //si los datos no son validos, pide que lo solucione
}

function reporteUsuario(){  //carga los datos del reporte

let html="" 
html+= `<table border=1 ><tr> 
            <th>Departamento</th>
            <th>Estudian</th>
            <th>No trabajan</th>
            <th>Dependientes o independientes</th>
            <th>Porcentaje del total de censados</th>
        </tr>`
for (let index = 0; index < unS.departamentos.length; index++) {
        let depto = unS.departamentos[index];
        html+=
        ` <tr>
        <td>${depto.nombre}</td>
        <td>${depto.estudian}</td>
        <td>${depto.noTrabajan}</td>
        <td>${depto.depOind}</td>
        <td>${(depto.totalDepto/unS.usuarios.length*100).toFixed(1)}%</td>
    </tr>`
}
html+=`</table>`

        document.querySelector("#tablaReporteUsuario").innerHTML = html;
        mostrarDiv("reporteUsuario");
}

function volverReporteUsuario(){ 
  document.querySelector("#tablaReporteUsuario").innerHTML = "";
  document.querySelector("#ciInvitado").value="";
  mostrarDiv("loginUsuario");
}

/* FUNCIONES DEL CENSISTA */

function agregarCensista() {
  let nombreCensista = document.querySelector("#txtNombreCensista").value;
  let usuarioCensista = document.querySelector("#txtUsuario").value;
  let passCensista = document.querySelector("#txtPass").value;

  if (nombreCensista.length === 0 || usuarioCensista.length === 0 || passCensista.length === 0) {//revisa que todos los campos esten completos
    alert("Todos los campos son obligatorios");
  } else if (unS.buscarCensista(usuarioCensista)!==null) {  //revisa que el nombre de usuario no este en uso
    alert("Nombre de usuario en uso, por favor, utilice otro.");
  } else if (!passValida(passCensista)) { //revisa que la contraseña cumpla con las condiciones
    alert("La contraseña debe tener 5 caracteres incluyendo al menos una mayuscula, una minuscula y un numero.");
  } else {  //si todo esta bien, lo agrega al array de censistas
    let persona = new Censista(nombreCensista, usuarioCensista, passCensista);
    unS.agregarCensista(persona);
    alert("Censista agregado correctamente, por favor inicie sesion.")
    limpiarFormularioRegistroCensista();
    mostrarDiv("loginCensista");
  }
}

function loginCensista() {
  let usuario = document.querySelector("#txtUsuarioLogin").value;
  let pass = document.querySelector("#txtPassLogin").value;
  if (unS.buscarCensista(usuario) !==null) { //busca que el censista exista
      if(unS.realizarLogin(usuario, pass)){ //revisa que la contraseña coincida con la del usuario y lo incorpora al objeto usuario logueado
        document.querySelector("#nombreUsuarioLogueado").innerHTML =//si cumple, muestra el menu 
        unS.usuarioLogueado.nombre;
        mostrarDiv("menuCensista");
      } else {
        alert("Datos incorrectos");
      }
  }
  else {
    alert("Datos incorrectos");
  }
}

function logout() {//elimina el objeto del usuario logueado y vuelve al login
  unS.realizarLogout();
  limpiarFormularioCensista();
  mostrarDiv("loginCensista");
}

function ingresarDatosDesdeCensista(){
  mostrarDiv("ingresoCedulaDesdeCensista");
}

function validarDatosDesdeCensista(){ //cuando el censista ingresa una cedula para validar el censo
  let cedula = document.querySelector("#txtCedulaDesdeCensista").value;
  cedula = cedula.split(".").join("").split("-").join("");
  let usuario = unS.buscarUsuario(parseInt(cedula));
  
  if (usuario !== null && usuario.validado===false) {//si el usuario ya existia y no estaba validado, carga los datos en el formulario
    mostrarDiv("ingresarDatosDesdeCensista");
    document.querySelector("#txtNombreUsuCen").value = usuario.nombre;
    document.querySelector("#txtApellidoUsuCen").value = usuario.apellido;
    document.querySelector("#txtEdadUsuCen").value = usuario.edad;

    let tablaDpto = `<Option value="sinDpto" >"Seleccione..."</Option>`;
    for (let i = 0; i < unS.departamentos.length; i++) { //carga el slc de departamentos
      let departamento = unS.departamentos[i].nombre; //toma el nombre del departamento
      if (usuario.departamento.nombre === departamento) { //si el departamento del usuario es igual al departamento del array
        tablaDpto += `<Option selected="selected">${departamento}</Option>`; //queda seleccionado el correspondiente al usuario
      }
      else {tablaDpto += `<Option >${departamento}</Option>`;} 
    }
    document.querySelector("#slcDptoUsuCen").innerHTML += tablaDpto;
    
    let tablaOcupacion = `<Option value="sinOcupacion" >"Seleccione..."</Option>`;
    for (let i = 0; i < unS.ocupacion.length; i++) { //carga el slc de ocupaciones
      let ocupacion = unS.ocupacion[i]; //toma el nombre de la ocupacion
      if (usuario.ocupacion === ocupacion) { //si la ocupacion del usuario es igual a la ocupacion del array
        tablaOcupacion += `<Option selected="selected">${ocupacion}</Option>`; //queda seleccionada la ocupacion del usuario
      } 
      else {tablaOcupacion += `<Option >${ocupacion}</Option>`;} 
    }
    document.querySelector("#slcOcupacionUsuCen").innerHTML += tablaOcupacion;

} else if(usuario !== null && usuario.validado===true){ //si ya fue validado, no permite entrar
  alert("El usuario ya fue validado por un censista.")
  document.querySelector("#txtCedulaDesdeCensista").value = "";
} else if (!chequearCedula (cedula)) {  //si la cedila no es valida, anuncia el error
  alert("Cédula inválida, por favor verifique y vuelva a intentar");
  document.querySelector("#txtCedulaDesdeCensista").value = "";
} else {  //si es un censo nuevo y la ci valida muestra el formulario vacío
  mostrarDiv("ingresarDatosDesdeCensista");
  let tablaDpto = `<Option value="sinDpto" >"Seleccione..."</Option>`;
        for (let i = 0; i < unS.departamentos.length; i++) {
        let departamento = unS.departamentos[i].nombre;
        tablaDpto += `<Option >${departamento}</Option>`;
        }
        document.querySelector("#slcDptoUsuCen").innerHTML += tablaDpto;
        let tablaOcupacion = `<Option value="sinOcupacion" >"Seleccione..."</Option>`;
        for (let i = 0; i < unS.ocupacion.length; i++) {
        let ocupacion = unS.ocupacion[i];
        tablaOcupacion += `<Option >${ocupacion}</Option>`;
        }
        document.querySelector("#slcOcupacionUsuCen").innerHTML += tablaOcupacion;  
        } 
}

function guardarYvalidar(){ //toma los datos del formulario
  
  let nombre = document.querySelector("#txtNombreUsuCen").value;
    let apellido = document.querySelector("#txtApellidoUsuCen").value;
    let edad = parseInt(document.querySelector("#txtEdadUsuCen").value);
    let departamentoValue = document.querySelector("#slcDptoUsuCen").value;
    let departamento = unS.buscarDepartamento(departamentoValue);
    let ocupacion = document.querySelector("#slcOcupacionUsuCen").value;
    let cedulaInvitado = document.querySelector("#txtCedulaDesdeCensista").value;
    cedulaInvitado = parseInt(cedulaInvitado.split(".").join("").split("-").join(""));
    unS.guardarCensado(cedulaInvitado);

if (validarDatos(nombre, apellido, edad, departamentoValue, ocupacion)){//si los datos son validos
    
  if (unS.usuarioCensado===null) {//cuando el censo es nuevo, lo agrega al array con la propiedad validado=true
     unS.agregarUsuarioNuevoCen(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion, unS.usuarioLogueado);
     alert(`Los datos fueron guardados correctamente.`)
     limpiarFormularioUsuario();
     document.querySelector("#txtCedulaDesdeCensista").value="";
     mostrarDiv("menuCensista");
  } 
  else{//si el censo ya existía, lo sobreescribe con la propiedad validado=true
    unS.sorbreescribirUsuarioCen(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion, unS.usuarioLogueado);
    alert("Sus datos fueron modificados correctamente.")
    limpiarFormularioUsuario();
    document.querySelector("#txtCedulaDesdeCensista").value="";
    mostrarDiv("menuCensista");
  }
}
else alert("Error en los datos ingresados, por favor vuelva a intentar.")
}

function menuReasignarCensista(){//muestra los censos pendientes del censista logueado y los censistas distintos
  mostrarDiv("menuReasignarCensista");
  let slcCensosPendientes = `<option value="sinOpcion">Pendientes de validar</option>`;
  for (let index = 0; index < unS.usuarios.length; index++) { //carga los censos pendientes del censista logueado
    let usu = unS.usuarios[index]; 
    if (usu.validado===false && usu.censista.id===unS.usuarioLogueado.id){ //si el censo no esta validado y el censista es el logueado
      slcCensosPendientes+=`<option value="${usu.cedula}">${usu.cedula}</option>`; //carga el slc de censos pendientes
    }
  }
  document.querySelector("#slcPersonasPorValidar").innerHTML=slcCensosPendientes

  let censistas = `<option value="sinMarcar">Censistas</option>`
  for (let index = 0; index < unS.censistas.length; index++) { //carga los censistas distintos al logueado
    let censista = unS.censistas[index]; //toma el censista actual
    if (censista.id !== unS.usuarioLogueado.id) //si el censista es distinto al logueado
    censistas+= `<option value="${censista.usuario}">${censista.usuario}</option>`; //carga el slc de censistas
  }
  document.querySelector("#slcCensistas").innerHTML=censistas;
}

function ejecutarReasignarCensista(){//sobreescribe al censista asignado
  let usuarioSelec = parseInt(document.querySelector("#slcPersonasPorValidar").value);
  let censistaSelec = document.querySelector("#slcCensistas").value;
  if(usuarioSelec!=="sinOpcion" && censistaSelec !== "sinMarcar"){//verifica que las 2 opciones esten seleccionadas
    unS.reasignarCensista(usuarioSelec, censistaSelec);//reasigna al censista
    alert("Reasignacion realizada con exito.");
    document.querySelector("#slcPersonasPorValidar").value="sinOpcion";
    document.querySelector("#slcCensistas").value="sinMarcar";
    menuReasignarCensista();
  }
  else{
    alert("Debe seleccionar ambas opciones.");
  }
}

function infoEstadisticaCensista(){//carga la info estadística
  mostrarDiv("reporteCensista");
  document.querySelector("#cantidadDeCensados").innerHTML=unS.censadosTrue(); 
  let slcdptos=`<option value="nada">Departamento</option>`
  let tablaGral=`<tr>
  <th>Departamento</th>
  <th>Total de censados</th>  
  <th>% pendiente de validar</th> 
</tr>`
for (let index = 0; index < unS.departamentos.length; index++) {
  let unDpto = unS.departamentos[index]; 
  let numero=((unDpto.totalDepto-unS.censosValidados(unDpto))/unDpto.totalDepto*100).toFixed() //calcula el porcentaje de censos pendientes de validar
  if (isNaN(numero))  numero=0 //si no hay censos realizados en ese departamento, el porcentaje es 0
  tablaGral+=`<tr>
  <td>${unDpto.nombre}</td>
  <td>${unS.censosValidados(unDpto)}</td>
  <td>${numero}</td>
</tr>`
slcdptos+=`<option value="${unDpto.nombre}">${unDpto.nombre}</option>`
}
document.querySelector("#tablaReporteCensista").innerHTML=tablaGral;
document.querySelector("#slcTablaDptos").innerHTML=slcdptos;
document.querySelector("#slcTablaDptos").addEventListener("change", mostrarPorDpto);//si cambia el dpto seleccionado, muestra los datos de ese dpto
}
function mostrarPorDpto(){//carga los datos del dpto seleccionado
  let tabla=""; 
  let dptoselect=null; 
  let nombredpto=document.querySelector("#slcTablaDptos").value; //toma el dpto seleccionado
  let menoresPorcentaje=0  
  if(nombredpto!=="nada"){ 
    for (let index = 0; index < unS.departamentos.length; index++) { //busca el dpto seleccionado en el array de dptos
        let unDpto = unS.departamentos[index]; 
        if(unDpto.nombre===nombredpto){ //si lo encuentra, lo guarda en una variable
          dptoselect=unDpto; //guarda el dpto seleccionado
          break;
        }
      }
      let mayoresPorcentaje=(unS.mayoresValidados(dptoselect)/(unS.mayoresValidados(dptoselect)+unS.menoresValidados(dptoselect)))*100; //calcula el porcentaje de mayores de 18
      if (isNaN(mayoresPorcentaje))  mayoresPorcentaje=0; //si no hay mayores de 18, el porcentaje es 0
      if (unS.censosValidados(dptoselect)!==0){//si hay censos realizados en ese departamento, se asegura que el total de 100%
        menoresPorcentaje=100-mayoresPorcentaje.toFixed(); //calcula el porcentaje de menores de 18
      }

      tabla=`<tr>
                  <th>% mayores de 18</th>
                  <th>% menores de 18</th>  
                  </tr>
                  <tr>
                  <td>${mayoresPorcentaje.toFixed()}</td>
                  <td>${menoresPorcentaje}</td>
                  </tr>`
  }
document.querySelector("#tablaDpto").innerHTML=tabla;
}
