class Sistema {
  constructor() {
    this.usuarioLogueado=null;
    this.usuarioCensado=null;
    this.censistas = [];
    this.usuarios = [];
    this.departamentos = [];

    //Banco de datos para carga aleatoria
    this.nombres = ['Angel','Carlos','Juan','Lautaro','Anairis','Fernando','Ana','Lorena', 'Andres', 'Sofia', 'Analia', 'Francisco', 'Nicolas', 'Neymar']
    this.apellidos = ['Perez','Rodriguez','Fagndez','Lorenzo','Gomez','Cerrone', 'Da Silva', 'Kellner', 'Cardozo', 'Suarez'];
    this.ocupacion = ['Independiente','Dependiente','Estudiante', 'No trabaja'];
    this.validacion = [true, false];

    //Carga de departamentos
    this.departamentos.push(new Departamento("Artigas"));
    this.departamentos.push(new Departamento("Salto"));
    this.departamentos.push(new Departamento("Paysandu"));
    this.departamentos.push(new Departamento("Rio Negro"));
    this.departamentos.push(new Departamento("Rivera"));
    this.departamentos.push(new Departamento("Tacuarembo"));
    this.departamentos.push(new Departamento("Durazno"));
    this.departamentos.push(new Departamento("Cerro Largo"));
    this.departamentos.push(new Departamento("Montevideo"));
    this.departamentos.push(new Departamento("Canelones"));
    this.departamentos.push(new Departamento("Flores"));
    this.departamentos.push(new Departamento("Florida"));
    this.departamentos.push(new Departamento("Colonia"));
    this.departamentos.push(new Departamento("San Jose"));
    this.departamentos.push(new Departamento("Soriano"));
    this.departamentos.push(new Departamento("Maldonado"));
    this.departamentos.push(new Departamento("Rocha"));
    this.departamentos.push(new Departamento("Lavalleja"));
    this.departamentos.push(new Departamento("Treinta y Tres"));

    //Carga de censistas
    this.censistas.push(new Censista("Luis Gomez","Luis15", "Gran15"));
    this.censistas.push(new Censista( "Juan Perez", "juanperez3", "Pa$$w0rd1"));
    this.censistas.push(new Censista( "Alberto Fernandez", "alberto2356", "Pa$$w0rd3"));

    //Carga de usuarios (invitados)
    //Los 2 primeros son fijos, uno validado y otro sin validar
    this.usuarios.push(new Usuario("Leonel", "Messi", 36, 23456789, this.departamentos[4], this.ocupacion[3], this.censistas[1],false))
    this.usuarios.push(new Usuario("Sabina", "Cortesagui", 39, 12345678, this.departamentos[9], this.ocupacion[0], this.censistas[1],true))
    
    //El resto aleatorios combinando los bancos
    for (let  i = 2; i <30; i++) { // se recorre el array de usuarios
      this.usuarios.push(new Usuario( // se agrega un usuario al array
        this.nombres[Math.floor(Math.random() * this.nombres.length)], // se agrega un nombre aleatorio
        this.apellidos[Math.floor(Math.random() * this.apellidos.length)], // se agrega un apellido aleatorio
        Math.floor(Math.random() * 90), // se agrega una edad aleatoria
        Math.floor(Math.random() * 10000000), // se agrega una cedula aleatoria
        this.departamentos[Math.floor(Math.random() * this.departamentos.length)], // se agrega un departamento aleatorio
        this.ocupacion[Math.floor(Math.random() * this.ocupacion.length)], // se agrega una ocupacion aleatoria
        this.censistas[Math.floor(Math.random() * this.censistas.length)], // se agrega un censista aleatorio
        this.validacion[Math.floor(Math.random() * this.validacion.length)] // se agrega una validacion aleatoria entre true y false
      ))
    }
  }

    //Funciones aplicables a usuarios---------------------------------------------------------------

    agregarUsuarioNuevo(nombre, apellido, edad, cedula, departamento, ocupacion,) {
      // Esta funcion se utiliza para agregar un usuario nuevo
    let censista=this.censistas[Math.floor(Math.random() * this.censistas.length)];
    this.usuarios.push(new Usuario(nombre, apellido, edad, cedula, departamento, ocupacion, censista, false));
    }

    buscarUsuario(txtCiUsuario) {
      // Esta funcion se utiliza para buscar un usuario por su cedula
      let objUsuario = null; 
      for (let i = 0; i < this.usuarios.length; i++) { // se recorre el array de usuarios
        if (this.usuarios[i].cedula === txtCiUsuario) { // se recorre el array de usuarios y se compara la cedula
          objUsuario = this.usuarios[i]; // si la cedula es igual a la ingresada se guarda el usuario en objUsuario
          break;
        }
      }
      return objUsuario; // se retorna el usuario
    }

    buscarDepartamento(departamento) {
      // Esta funcion se utiliza para buscar un departamento por su nombre
      let objDpto = null; 
      for (let i = 0; i < this.departamentos.length; i++) { // se recorre el array de departamentos
        if (this.departamentos[i].nombre === departamento) {  // se recorre el array de departamentos y se compara el nombre
          objDpto = this.departamentos[i]; // si el nombre es igual al ingresado se guarda el departamento en objDpto
          break; 
        }
      }
      return objDpto;
    }

    borrarUsuarioDelArray(ci) {
      // Esta funcion se utiliza para borrar un usuario del array
      let bandera=-1; // se inicializa la bandera en -1
      let usuarioAborrar=null
       for (let i = 0; i < this.usuarios.length; i++) { // se recorre el array de usuarios
       let unUsuario = this.usuarios[i].cedula; // se guarda la cedula del usuario en unUsuario
       if (unUsuario===ci) {  // se compara la cedula del usuario con la ingresada
         bandera=i; // si la cedula es igual a la ingresada se guarda la posicion en la bandera
         usuarioAborrar=this.usuarios[i];
         break;
        }
        
       }
       if (bandera!=-1) { // si la bandera es distinta de -1 se borra el usuario del array
        usuarioAborrar.departamento.totalDepto--;
        if(usuarioAborrar.ocupacion==="Estudiante"){
         usuarioAborrar.departamento.estudian--;
        }
        if(usuarioAborrar.ocupacion==="No trabaja"){
        usuarioAborrar.departamento.noTrabajan--;
        }
        if(usuarioAborrar.ocupacion==="Dependiente" || usuarioAborrar.ocupacion==="Independiente"){
        usuarioAborrar.departamento.depOind--;
        }
        this.usuarios.splice(bandera,1); // se borra el usuario del array
       } 
    }

    sorbreescribirUsuario(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion){
      // Esta funcion se utiliza para sobreescribir los datos del objeto usuario logueado y del array de usuarios
      this.usuarioLogueado.nombre=nombre; 
      this.usuarioLogueado.apellido=apellido; 
      this.usuarioLogueado.edad=edad;
      this.usuarioLogueado.cedula=cedulaInvitado;
      this.usuarioLogueado.departamento=departamento;
      this.usuarioLogueado.ocupacion=ocupacion;
    }

    /* --------------------------- */

    /* ESTAS FUNCIONES APLICAN EN CENSISTA */

    agregarCensista(unCensista) {
      this.censistas.push(unCensista); // se agrega un censista al array
    }

    buscarCensista(nombreCensista) {
      // Esta funcion se utiliza para buscar un censista por su nombre
      let persona=null; // se inicializa la persona en null
      for (let i = 0; i < this.censistas.length; i++) { // se recorre el array de censistas
        let censistaActual = this.censistas[i]; // se guarda el censista en censistaActual
        if (censistaActual.usuario.toLowerCase() === nombreCensista.toLowerCase()) { // se compara el nombre del censista con el ingresado
          persona = censistaActual; // si el nombre es igual al ingresado se guarda el censista en persona
          break;
        }
      }
      return persona; // se retorna el censista
    }

    realizarLogin(usuario, pass) {
      // Esta funcion se utiliza para realizar el login, lo busca por nombre de usuario y contraseña.
      let resp = false; // se inicializa la respuesta en false
      let persona = this.buscarCensista(usuario); // se guarda el censista en persona
      if (persona.pass === pass) { // se compara la contraseña del censista con la ingresada
        resp = true; // si la contraseña es igual a la ingresada se cambia la respuesta a true
        this.usuarioLogueado = persona; // se guarda el censista en usuarioLogueado
      }
      return resp; // se retorna la respuesta
    }

     realizarLogout() {
      this.usuarioLogueado = null; // se inicializa el usuarioLogueado
    }

    agregarUsuarioNuevoCen(nombre, apellido, edad, cedula, departamento, ocupacion, censista) { 
      this.usuarios.push(new Usuario(nombre, apellido, edad, cedula, departamento, ocupacion, censista, true)); // se agrega un usuario al array con la variable validado=true
      }
      
    guardarCensado(ci){
      this.usuarioCensado=(this.buscarUsuario(parseInt(ci))); // se guarda el usuario en usuarioCensado
    }
      
    sorbreescribirUsuarioCen(nombre, apellido, edad, cedulaInvitado, departamento, ocupacion, censista){ 
      // Esta funcion se utiliza para sobreescribir los datos de un usuario y cambiar la propiedad validado a True
      this.usuarioCensado.nombre=nombre;
      this.usuarioCensado.apellido=apellido;
      this.usuarioCensado.edad=edad;
      this.usuarioCensado.cedula=cedulaInvitado;
      this.usuarioCensado.departamento=departamento;
      this.usuarioCensado.ocupacion=ocupacion;
      this.usuarioCensado.censista=censista;
      this.usuarioCensado.validado=true;
      this.usuarioCensado=null;
    }

    /* --------------------------- */

    censadosTrue(){
      let cantidad=0; // se inicializa la cantidad en 0
      for (let index = 0; index < this.usuarios.length; index++) { // se recorre el array de usuarios
        let censo = this.usuarios[index]; // se guarda el usuario en censo
        if (censo.validado===true) { // se compara el validado del usuario con true
          cantidad++; // si el validado es true se suma 1 a la cantidad, para fines estadisticos.
        }
      }
      return cantidad; // se retorna la cantidad
    }

    censosValidados(Dpto){
      let cantidad=0; // se inicializa la cantidad en 0
      for (let index = 0; index < this.usuarios.length; index++) { // se recorre el array de usuarios
        let unUsuario = this.usuarios[index]; // se guarda el usuario en unUsuario
        if (unUsuario.departamento===Dpto && unUsuario.validado===true){ // se compara el departamento del usuario con el ingresado y el validado con true
          cantidad++; // si el departamento y el validado son iguales a los ingresados se suma 1 a la cantidad, para fines estadisticos.
        }
      }
      return cantidad; // se retorna la cantidad
    }

    reasignarCensista(usuCedula, censistaUsuario){
      this.buscarUsuario(usuCedula).censista=this.buscarCensista(censistaUsuario); // se busca el usuario por su cedula y se le asigna un censista segun su nombre de usuario
    }

    mayoresValidados(departamento){
      let cantidad = 0; // se inicializa la cantidad en 0
      for (let index = 0; index < this.usuarios.length; index++) { // se recorre el array de usuarios
        let unUsuario = this.usuarios[index]; // se guarda el usuario en unUsuario
        if (unUsuario.edad>=18 && unUsuario.validado===true && unUsuario.departamento===departamento){ // se compara la edad del usuario con 18, el validado con true y el departamento con el ingresado
          cantidad++; // si la edad es mayor a 18, el validado es true y el departamento son iguales a los ingresados se suma 1 a la cantidad, para fines estadisticos.
        }
    }
    return cantidad; // se retorna la cantidad
  }

  menoresValidados(departamento){
    let cantidad = 0; // se inicializa la cantidad en 0
    for (let index = 0; index < this.usuarios.length; index++) { // se recorre el array de usuarios
      let unUsuario = this.usuarios[index]; // se guarda el usuario en unUsuario
      if (unUsuario.edad<18 && unUsuario.validado===true && unUsuario.departamento===departamento){ // se compara la edad del usuario con 18, el validado con true y el departamento con el ingresado
        cantidad++; // si la edad es menor a 18, el validado es true y el departamento son iguales a los ingresados se suma 1 a la cantidad, para fines estadisticos.
      }
  }
  return cantidad;
}

}