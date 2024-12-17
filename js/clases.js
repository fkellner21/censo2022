let contadorCensista = 1;
let contadorUsuario = 1;

class Censista { 
  constructor(nombre, usuario, pass) {
    this.id = contadorCensista++;
    this.nombre = nombre;
    this.usuario = usuario;
    this.pass = pass;
  }
}

class Departamento {
  constructor(nombre) {
    this.nombre = nombre;
    this.totalDepto = 0;
    this.estudian=0;
    this.noTrabajan=0;
    this.depOind=0
  }
}

class Usuario {
  constructor(
    nombre,
    apellido,
    edad,
    cedula,
    departamento,
    ocupacion,
    censista,
    validado
  ) {
    this.id = contadorUsuario++;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.cedula = cedula;
    this.departamento = departamento;
    this.ocupacion = ocupacion;
    this.censista = censista;
    this.validado = validado;
    
    //----------------------------------
    
    this.departamento.totalDepto++;

    if(this.ocupacion==="Estudiante"){
      this.departamento.estudian++;
    }
    if(this.ocupacion==="No trabaja"){
      this.departamento.noTrabajan++;
    }
    if(this.ocupacion==="Dependiente" || this.ocupacion==="Independiente"){
      this.departamento.depOind++;
    }
    
 }
}
