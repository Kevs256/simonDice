"use strict";
// //de acuero al requerimiento de persitencia crearemos
// //una sola clase
// //generamos al interfaz para garantizar los comportamientos de la clase
// interface jugadorI{
//     //atributos de la clase
//     //los que he pensado hasta ahora
//     nombre:string
//     puntuacion:number
//     dificultad:string
//     //3 principales comportamientos
//     //sumar puntos
//     //guardar el registro en el local storage
//     //construir los objetos
//     //sumarPuntos():void
//     //he sacado el metodo sumar puntos porque considero que los voy a sumar con el backend
//     //y solo los asigno al objeto finalizar el juego
//     //por facilidad sacrificamos diseño
//     //al parecer el metodo constructor no se puede considerar en una interfaz
//     //constructor(nombre:string,puntos:number):void
//     guardarRegistro(jugador:jugador):void
//     //metodos get set para traer y modificar los atributos
//     getNombre():string
//     setNombre(nombre:string):void
//     getPuntuacion():number
//     setPuntuacion(puntos:number):void
// }
// //clase del jugador por ahora tiene nombre y puntuacion
// export class jugador implements jugadorI{
//     nombre:string
//     puntuacion:number
//     dificultad:string
//     guardarRegistro(jugador:jugador):void{
//         //aca debo ir directo al local storage
//         //con el objeto
//         //toca guardar los que estan, despues recuperar y meter uno nuevo, y guardar toda la lista
//         let datos:jugador[]=[]
//         var leida = localStorage.getItem("tabla")
//         if(leida==null){
//             let datos:jugador[]=[]
//         }else{
//             datos = JSON.parse(leida)
//         }
//         datos.push(jugador)
//         //limitar un maximo de 10 entradas
//         localStorage.setItem("tabla",JSON.stringify(datos))
//     }
//     constructor(nombre:string,puntos:number,dificultad:string) {
//         this.nombre = nombre;
//         this.puntuacion = puntos;
//         this.dificultad=dificultad;
//     }
//     getNombre(): string {
//         return this.nombre
//     }
//     getPuntuacion(): number {
//         return this.puntuacion
//     }
//     getDificultad(): number {
//         return this.puntuacion
//     }
//     //estos metodos los creo por tradicion pero la persistencia es muy poca
//     //y voy a llenar los datos directamente en el constructor
//     setNombre(nombre:string): void {
//         this.nombre=nombre
//     }
//     setPuntuacion(puntos: number): void {
//         this.puntuacion=this.puntuacion
//     }
//     setDificultad(): number {
//         return this.puntuacion
//     }
// }
// class Juego{
//     mostrarTabla(){
//         var guardado = JSON.parse(localStorage.getItem("tabla") || "")
//         return guardado
//     }
//     //cosas para iterar y sacar los datos=
//     //guardado[0]["nombre"]
//     //posicion de la lista y atributo
// }
// //modos de dificultad
// //decirle cuando es el turno (cuando haya recorrido toda la lista)
// //mostrar puntos
// //decir que se ha equivocado, con una x o algo
// //boton volver al inicio cuando se equivoque
// //boton ver tabla
// //aca voy a ahcer los exports por si funciona porque no me han querido funcionar nunca
// //export{jugadorI,jugador,Juego}
// //resulta que para poder modularizar tengo que tomar el archivo controlador como modulo
// //pero al tiempo eso me obliga (a menos de que haya una forma de configurarlos en tsconfig)
// //a que el archivo sea un modulo y no pueda ser accedido por el html
// //se rennuncia a modularizar el modelo, toco incluir en el controlador
