//variables
let puntosJugador = 0;
let puntosComputadora = 0;

//manejo del DOM

const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnParar = document.querySelector("#btnParar");
const puntosHTML = document.querySelectorAll("small");
const cartasJugador = document.querySelector("#cartasJugador");
const CartasComputador = document.querySelector("#cartasComputador");

//cargamos las cartas en un arreglo
const baraja = [
    "2C",
    "2D",
    "2H",
    "2S",
    "3C",
    "3D",
    "3H",
    "3S",
    "4C",
    "4D",
    "4H",
    "4S",
    "5C",
    "5D",
    "5H",
    "5S",
    "6C",
    "6D",
    "6H",
    "6S",
    "7C",
    "7D",
    "7H",
    "7S",
    "8C",
    "8D",
    "8H",
    "8S",
    "9C",
    "9D",
    "9H",
    "9S",
    "10C",
    "10D",
    "10H",
    "10S",
    "AC",
    "AD",
    "AH",
    "AS",
    "JC",
    "JD",
    "JH",
    "JS",
    "KC",
    "KD",
    "KH",
    "KS",
    "QC",
    "QD",
    "QH",
    "QS",
];

//=============FUNCIONES BASICAS DEL JUEGO

// hacer funcion que mezcle la baraja

const mezclarBaraja = () => {
    baraja.sort(() => Math.random() - 0.5);
    //console.log(baraja);

    return baraja;
};
mezclarBaraja();
const pedirCarta = () => {
    if (baraja.length === 0) {
        throw "No existe mas cartas en la baraja";
    }
    const carta = baraja.pop();
    return carta;
};

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;
    if (isNaN(valor)) {
        puntos = valor === "A" ? 11 : 10;
    } else {
        puntos = valor * 1;
    }
    return puntos;
};

const jugarComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/img/${carta}.png`;
        imgCarta.classList.add("carta");
        CartasComputador.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    //el timeout pone a jugar al compu automaticamente durante 100 milisegundos
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert("nadie gana: (");
        } else if (puntosMinimos > 21) {
            alert("Computadora gana");
        } else if (puntosComputadora > 21) {
            alert("Jugador Gana");
        } else {
            alert("computadora gana");
        }
    }, 100);
};

//=============EVENTO DEL JUEGO===========

//evento nuevo juego

btnNuevo.addEventListener("click", () => {
    console.clear();
    mezclarBaraja();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    cartasJugador.innerHTML = "";
    CartasComputador.innerHTML = "";
    btnPedir.disabled = false;
    btnParar.disabled = false;
});

// evento pedir carta
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    console.log(carta);
    //aumentar valor de la carta en el contador
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    puntosHTML[0].innerText = puntosJugador;
    //mostrar las cartas en la capa correspondiente
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/img/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasJugador.append(imgCarta);
    //validamos puntos acumulados
    if (puntosJugador > 21) {
        console.warn("Lo siento, excedió el limite de puntos");
        btnPedir.disabled = true;
        btnParar.disabled = true;
        jugarComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn("Excelente, BlackJack !!!");
        btnPedir.disabled = true;
        btnParar.disabled = true;
        jugarComputadora(puntosJugador);
    }
});

// evento parar
btnParar.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnParar.disabled = true;
    jugarComputadora(puntosJugador);
});