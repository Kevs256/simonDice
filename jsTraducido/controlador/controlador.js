"use strict";
//esta linea importaba el modulo y me deja usar la clase
//pero no me deja usar el script en el html
//import { jugador } from '../modelo/modelo.js'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//clase del jugador por ahora tiene nombre y puntuacion
class player {
    constructor(nombre, puntos, dificultad) {
        this.nombre = nombre;
        this.puntuacion = puntos;
        this.dificultad = dificultad;
    }
    guardarRegistro2(jugador2) {
        //aca debo ir directo al local storage
        //con el objeto
        //toca guardar los que estan, despues recuperar y meter uno nuevo, y guardar toda la lista
        let datos = [];
        var leida = localStorage.getItem("tabla");
        if (leida == null) {
            let datos = [];
        }
        else {
            datos = JSON.parse(leida);
        }
        datos.push(jugador2);
        //limitar un maximo de 10 entradas
        localStorage.setItem("tabla", JSON.stringify(datos));
    }
    getNombre() {
        return this.nombre;
    }
    getPuntuacion() {
        return this.puntuacion;
    }
    getDificultad() {
        return this.dificultad;
    }
    //estos metodos los creo por tradicion pero la persistencia es muy poca
    //y voy a llenar los datos directamente en el constructor
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setPuntuacion(puntos) {
        this.puntuacion = this.puntuacion;
    }
    setDificultad() {
        return this.dificultad;
    }
}
class partida {
    mostrarTabla() {
        var guardado = JSON.parse(localStorage.getItem("tabla") || "");
        return guardado;
    }
}
//-----------------------------------termina el modelo----------------------------------------------------
//iniciamos con el boton start
//despues de start almacena el nombre
//continuar para ingresar el modo de dificultad
//iniciar para empezar a parpadear
//funcion que damos start y nos pide el nombre
function ocultar() {
    const startEsconder = document.getElementById("start");
    const nombreMostrar = document.getElementById("ingresarNombre");
    startEsconder === null || startEsconder === void 0 ? void 0 : startEsconder.classList.add("esconder");
    nombreMostrar === null || nombreMostrar === void 0 ? void 0 : nombreMostrar.classList.add("mostrar");
}
//establecemos variables generales apra que solo existan una a la vez
//practicamente son los variables del objeto
let nombre = "kevin";
let puntos = 0;
let dificultad = "easy";
//variables del juego como tal
let segundos = 1000;
let estado = "activo";
//lista que almacena los pulsos de cada ronda
let listapulsos = [];
let listaColores = [];
let tiempoUsable = 0;
let intervalo;
//damos continuar y le capturamos el nombre
function continuar() {
    const continuarMostrar = document.getElementById("iniciarJuego");
    const nombreMostrar = document.getElementById("ingresarNombre");
    dificultad = document.getElementById("dificultadJuego").value;
    nombre = document.querySelector("#nombre").value;
    nombreMostrar === null || nombreMostrar === void 0 ? void 0 : nombreMostrar.classList.remove("mostrar");
    continuarMostrar === null || continuarMostrar === void 0 ? void 0 : continuarMostrar.classList.add("mostrar");
}
function iniciarJuego() {
    return __awaiter(this, void 0, void 0, function* () {
        const mostrarTode = document.getElementById("mostrarCosas");
        mostrarTode === null || mostrarTode === void 0 ? void 0 : mostrarTode.classList.remove("esconder");
        let contenido1 = '<p>' + nombre + '</p>';
        mostrarTode === null || mostrarTode === void 0 ? void 0 : mostrarTode.insertAdjacentHTML('beforeend', contenido1);
        //paso el nombre del jugador
        const continuarMostrar = document.getElementById("iniciarJuego");
        continuarMostrar === null || continuarMostrar === void 0 ? void 0 : continuarMostrar.classList.remove("mostrar");
        //vacio las listas
        while (listaColores.length) {
            listaColores.pop();
        }
        //lista vacia
        //pasara a estado perdedor una vez falle
        while (estado == "activo") {
            while (listapulsos.length) {
                listapulsos.pop();
            }
            //generamos un nmero aleatorio
            let numeroAleatorio = tomarRandom(1, 4);
            //mtemos el numero aleatorio
            listaColores.push(numeroAleatorio);
            //recorremos la lista de numeros aleatorios
            for (let i = 0; i < listaColores.length; i++) {
                //metemos el tiempo
                modificadorDif();
                //evaluamos el contenido
                let contenidoLista = listaColores[i];
                //deacuerdo al contenido se prende una luz
                if (contenidoLista == 1) {
                    const g = document.getElementById("1");
                    //falta el audio
                    g === null || g === void 0 ? void 0 : g.classList.add("parpadeo");
                    setTimeout(function () {
                        g === null || g === void 0 ? void 0 : g.classList.remove("parpadeo");
                    }, segundos);
                }
                if (contenidoLista == 2) {
                    const g = document.getElementById("2");
                    //falta el audio
                    g === null || g === void 0 ? void 0 : g.classList.add("parpadeo");
                    setTimeout(function () {
                        g === null || g === void 0 ? void 0 : g.classList.remove("parpadeo");
                    }, segundos);
                }
                if (contenidoLista == 3) {
                    const g = document.getElementById("3");
                    //falta el audio
                    g === null || g === void 0 ? void 0 : g.classList.add("parpadeo");
                    setTimeout(function () {
                        g === null || g === void 0 ? void 0 : g.classList.remove("parpadeo");
                    }, segundos);
                }
                if (contenidoLista == 4) {
                    const g = document.getElementById("4");
                    //falta el audio
                    g === null || g === void 0 ? void 0 : g.classList.add("parpadeo");
                    setTimeout(function () {
                        g === null || g === void 0 ? void 0 : g.classList.remove("parpadeo");
                    }, segundos);
                }
                yield sleep(segundos + 200);
            }
            tiempoUsable = Math.round(listaColores.length * segundos * 2 / 1000);
            console.log(tiempoUsable);
            intervalo = setInterval('mostrarTiempo()', 1000);
            yield sleep(listaColores.length * segundos * 2);
            puntos = puntos + 1;
        }
        //una vez que pierde se lo vamos a informar y procedemos a guardar el dato
        const perdio = document.getElementById("perdio");
        mostrarTode === null || mostrarTode === void 0 ? void 0 : mostrarTode.classList.add("esconder");
        perdio === null || perdio === void 0 ? void 0 : perdio.classList.remove("esconder");
        //apareciendo de nuevo start
        const startEsconder = document.getElementById("start");
        startEsconder === null || startEsconder === void 0 ? void 0 : startEsconder.classList.remove("esconder");
        //creando objeto
        const player1 = new player(nombre, puntos, dificultad);
        player1.guardarRegistro2(player1);
        carga();
        console.log("salio");
    });
}
//funcion que muestra el tiempo restante para introducir la respuesta
function mostrarTiempo() {
    return __awaiter(this, void 0, void 0, function* () {
        let mostrar = tiempoUsable - 1;
        const mostrarTode = document.getElementById("mostrarCosas");
        let contenido2 = '<p>' + mostrar + '</p>';
        mostrarTode === null || mostrarTode === void 0 ? void 0 : mostrarTode.insertAdjacentHTML('beforeend', contenido2);
        tiempoUsable = tiempoUsable - 1;
        if (tiempoUsable == 0) {
            if (JSON.stringify(listaColores) == JSON.stringify(listapulsos)) {
                estado = "activo";
                clearInterval(intervalo);
            }
            else {
                estado = "perdio";
                clearInterval(intervalo);
            }
        }
    });
}
//genera un numero entero en un rango
function tomarRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//nos asigna los segundos segun dificultad
function modificadorDif() {
    if (dificultad == "facil") {
        segundos = 800;
    }
    if (dificultad == "medio") {
        segundos = 700;
    }
    if (dificultad == "dificil") {
        segundos = 500;
    }
}
//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir1() {
    listapulsos.push(1);
}
//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir2() {
    listapulsos.push(2);
}
//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir3() {
    listapulsos.push(3);
}
//intente con un eventlistener pero no salio, toco hacerlo a lo maldita sea
function añadir4() {
    listapulsos.push(4);
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
//esta funcion va a cargar la tabla de puntos
function carga() {
    const p = new partida();
    let tabla = p.mostrarTabla();
    console.log(tabla[0].nombre);
    for (let index = 0; index < tabla.length; index++) {
        const tableido = document.getElementById("tableido");
        let contenido3 = '<div class="item flex-container"><p>' + tabla[index].dificultad + '</p><p>' + tabla[index].nombre + '</p><p>' + tabla[index].puntuacion + '</p></div>';
        tableido === null || tableido === void 0 ? void 0 : tableido.insertAdjacentHTML('beforeend', contenido3);
    }
}