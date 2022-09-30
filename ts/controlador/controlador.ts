//esta linea importaba el modulo y me deja usar la clase
//pero no me deja usar el script en el html
//import { jugador } from '../modelo/modelo.js'

//---------------------------inicia el modelo ----------------------------------------
interface jugadorI{

    //atributos de la clase
    //los que he pensado hasta ahora

    nombre:string
    puntuacion:number
    dificultad:string

    //3 principales comportamientos
    //sumar puntos
    //guardar el registro en el local storage
    //construir los objetos

    //sumarPuntos():void
    //he sacado el metodo sumar puntos porque considero que los voy a sumar con el backend
    //y solo los asigno al objeto finalizar el juego
    //por facilidad sacrificamos diseño

    //al parecer el metodo constructor no se puede considerar en una interfaz
    //constructor(nombre:string,puntos:number):void

    guardarRegistro2(a:player):void

    //metodos get set para traer y modificar los atributos

    getNombre():string
    setNombre(nombre:string):void

    getPuntuacion():number
    setPuntuacion(puntos:number):void
}

//clase del jugador por ahora tiene nombre y puntuacion

class player implements jugadorI{

    nombre:string
    puntuacion:number
    dificultad:string

    guardarRegistro2(jugador2:player):void{
        //aca debo ir directo al local storage
        //con el objeto
        //toca guardar los que estan, despues recuperar y meter uno nuevo, y guardar toda la lista

        let datos:player[]=[]

        var leida = localStorage.getItem("tabla")

        if(leida==null){
            let datos:player[]=[]
        }else{
            datos = JSON.parse(leida)
        }

        datos.push(jugador2)

        //limitar un maximo de 10 entradas
        localStorage.setItem("tabla",JSON.stringify(datos))
    }

    constructor(nombre:string,puntos:number,dificultad:string) {
        this.nombre = nombre;
        this.puntuacion = puntos;
        this.dificultad=dificultad;
    }

    getNombre(): string {
        return this.nombre
    }

    getPuntuacion(): number {
        return this.puntuacion
    }

    getDificultad(): string {
        return this.dificultad
    }

    //estos metodos los creo por tradicion pero la persistencia es muy poca
    //y voy a llenar los datos directamente en el constructor

    setNombre(nombre:string): void {
        this.nombre=nombre
    }

    setPuntuacion(puntos: number): void {
        this.puntuacion=this.puntuacion
    }

    setDificultad(): string {
        return this.dificultad
    }
}

class partida{
    mostrarTabla(){
        var guardado:player[] = JSON.parse(localStorage.getItem("tabla") || "")
        return guardado
    }
    //cosas para iterar y sacar los datos=
    //guardado[0]["nombre"]
    //posicion de la lista y atributo
}

//-----------------------------------termina el modelo----------------------------------------------------

//iniciamos con el boton start
//despues de start almacena el nombre
//continuar para ingresar el modo de dificultad
//iniciar para empezar a parpadear
//funcion que damos start y nos pide el nombre


function ocultar(): void{
    const startEsconder = document.getElementById("start");
    const nombreMostrar = document.getElementById("ingresarNombre");
    startEsconder?.classList.add("esconder");
    nombreMostrar?.classList.add("mostrar");
}

//establecemos variables generales apra que solo existan una a la vez
//practicamente son los variables del objeto
let nombre:string = "kevin"
let puntos:number = 0
let dificultad:string = "easy"

//variables del juego como tal
let segundos:number = 1000
let estado:string = "activo"

//lista que almacena los pulsos de cada ronda
let listapulsos:number[]=[]
let listaColores:number[]=[]
let tiempoUsable:number=0
let intervalo:any

//damos continuar y le capturamos el nombre
function continuar(){
    const continuarMostrar = document.getElementById("iniciarJuego");
    const nombreMostrar = document.getElementById("ingresarNombre");

    dificultad = (<HTMLInputElement>document.getElementById("dificultadJuego")).value
    nombre = (<HTMLInputElement>document.querySelector("#nombre")).value;

    nombreMostrar?.classList.remove("mostrar")
    continuarMostrar?.classList.add("mostrar");
}

async function iniciarJuego(){

    const mostrarTode = document.getElementById("mostrarCosas")
    mostrarTode?.classList.remove("esconder")

    let contenido1 = '<p>' + nombre + '</p>'
    mostrarTode?.insertAdjacentHTML('beforeend', contenido1);

    //paso el nombre del jugador
    const continuarMostrar = document.getElementById("iniciarJuego");
    continuarMostrar?.classList.remove("mostrar");

    //vacio las listas
    while(listaColores.length) {
        listaColores.pop();
    }
    
    //lista vacia
    //pasara a estado perdedor una vez falle
    while(estado=="activo"){
        while(listapulsos.length) {
            listapulsos.pop();
        }
        //generamos un nmero aleatorio
        let numeroAleatorio=tomarRandom(1,4)
        //mtemos el numero aleatorio
        listaColores.push(numeroAleatorio)
        //recorremos la lista de numeros aleatorios
        for(let i = 0; i<listaColores.length;i++){
            //metemos el tiempo
            modificadorDif()

            //evaluamos el contenido
            let contenidoLista=listaColores[i]

            //deacuerdo al contenido se prende una luz
            if(contenidoLista==1){
                const g = document.getElementById("1")
                //falta el audio
                g?.classList.add("parpadeo")
                setTimeout(function(){
                    g?.classList.remove("parpadeo")
                }, segundos);
            }
            if(contenidoLista==2){
                const g = document.getElementById("2")
                //falta el audio
                g?.classList.add("parpadeo")
                setTimeout(function(){
                    g?.classList.remove("parpadeo")
                }, segundos);
            }
            if(contenidoLista==3){
                const g = document.getElementById("3")
                //falta el audio
                g?.classList.add("parpadeo")
                setTimeout(function(){
                    g?.classList.remove("parpadeo")
                }, segundos);
            }
            if(contenidoLista==4){
                const g = document.getElementById("4")
                //falta el audio
                g?.classList.add("parpadeo")
                setTimeout(function(){
                    g?.classList.remove("parpadeo")
                }, segundos);
            }
            await sleep(segundos + 200)
        }
        tiempoUsable = Math.round(listaColores.length*segundos*2/1000)
        console.log(tiempoUsable)
        
        intervalo = setInterval('mostrarTiempo()',1000);
        await sleep(listaColores.length*segundos*2);
        puntos=puntos+1
    }
    //una vez que pierde se lo vamos a informar y procedemos a guardar el dato
    const perdio = document.getElementById("perdio")
    mostrarTode?.classList.add("esconder")
    perdio?.classList.remove("esconder");

    //creando objeto
    const player1 = new player(nombre,puntos,dificultad)
    player1.guardarRegistro2(player1)

    carga()
    console.log("salio")
}

//funcion que muestra el tiempo restante para introducir la respuesta
async function mostrarTiempo(){
    let mostrar:number = tiempoUsable-1
    const mostrarTode = document.getElementById("mostrarCosas")
    let contenido2 = '<p>' + mostrar + '</p>'
    mostrarTode?.insertAdjacentHTML('beforeend', contenido2);
    tiempoUsable=tiempoUsable-1
    if(tiempoUsable==0){
        if(JSON.stringify(listaColores)==JSON.stringify(listapulsos)){
            estado="activo"
            clearInterval(intervalo)
        }else{
            estado="perdio"
            clearInterval(intervalo)
        }
    }
}

//genera un numero entero en un rango
function tomarRandom(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function recargarPagina(){
    window.location.reload()
}

//nos asigna los segundos segun dificultad
function modificadorDif(){
    if(dificultad =="facil"){
        segundos=800
    }
    if(dificultad =="medio"){
        segundos=700
    }
    if(dificultad =="dificil"){
        segundos=500
    }
}

//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir1(){
    listapulsos.push(1)
}

//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir2(){
    listapulsos.push(2)
}

//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir3(){
    listapulsos.push(3)
}

//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir4(){
    listapulsos.push(4)
}

const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

//esta funcion va a cargar la tabla de puntos
function carga(): void{

    const p = new partida()
    let tabla = p.mostrarTabla()

    tabla.sort(((a, b) => a.puntuacion - b.puntuacion));
    tabla.reverse()

    for (let index = 0; index < 10; index++) {
        const tableido = document.getElementById("tableido")
        let contenido3 = '<div class="item flex-container"><p>'+tabla[index].dificultad+'</p><p>'+tabla[index].nombre+'</p><p>'+tabla[index].puntuacion+'</p></div>'
        tableido?.insertAdjacentHTML('beforeend', contenido3);
    }
}

//meter intentar de nuevo
//meter sonidos
//quitar la repetidera de numero y de la tabla