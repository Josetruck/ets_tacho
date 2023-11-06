//CLICK EFFECT BUTTONS
const buttons = $('.imgContainer');
buttons.each(function () {
    const button = $(this);

    button.mousedown(function () {
        button.children(':first-child').addClass("hidding");
        button.children(':first-child').removeClass("displaying");
        button.children(':last-child').addClass("displaying");
        button.children(':last-child').removeClass("hidding");
    });

    button.mouseup(function () {
        button.children(':first-child').removeClass("hidding");
        button.children(':first-child').addClass("displaying");
        button.children(':last-child').removeClass("displaying");
        button.children(':last-child').addClass("hidding");
    });
});
$('#up').click(function (e) { 
    e.preventDefault();
    nextScreen()
});
$('#down').click(function (e) { 
    e.preventDefault();
    prevScreen()
});
// Datos de la API
var truckData = {};
let registrosDeTiempo = [];
const velocidadUmbral = 2;
var fakeStop = null;

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startDate(time) {
    var today = new Date(time)
    var h = today.getHours();
    var m = today.getMinutes();
    // add a zero in front of numbers<10
    m = checkTime(m);
    h = checkTime(h);
    return (h + ":" + m);
}

function startTime(tiempoEnSegundos) {
    const horas = Math.floor(tiempoEnSegundos / 3600);
    const minutos = Math.floor((tiempoEnSegundos % 3600) / 60);

    return horas + ':' + (minutos < 10 ? '0' : '') + minutos;
}

// Función para determinar si el camión está en movimiento
function estaEnMovimiento() {
    return truckData.truck.speed > velocidadUmbral;
}

// Definir los estados posibles
const ESTADO_CONDUCCION = "Conducción";
const ESTADO_DISPONIBILIDAD = "Disponibilidad";
const ESTADO_DESCANSO = "Descanso";

//DRIVER STATE
var tachoState = "Descanso";

// Función para determinar el estado actual
function determinarEstadoActual() {
    if (truckData.truck.speed > velocidadUmbral) {
        tachoState = "Disponibilidad"
        return ESTADO_CONDUCCION;
    } else if (truckData.truck.speed === 0 && tachoState == "Disponibilidad") {
        return ESTADO_DISPONIBILIDAD;
    } else if (truckData.truck.speed === 0 && tachoState == "Descanso") {
        return ESTADO_DESCANSO;
    }
}

// Función para calcular el tiempo de actividad
function calcularTiempoDeActividad() {
    let tiempoTotalConduciendo = 0;
    let tiempoTotalDescansando = 0;
    let tiempoTotalPausado = 0;
    let intervalosGuardados = intervalosRegistrados;
    console.log(intervalosGuardados)

    for (let i = 0; i < intervalosGuardados.length; i++) {
        let tiempoTranscurrido = new Date(intervalosGuardados[i].fin) - new Date(intervalosGuardados[i].inicio);

        if (intervalosGuardados[i].estado == "Conducción") {
            tiempoTotalConduciendo += tiempoTranscurrido;
        } else if (intervalosGuardados[i].estado == "Disponibilidad") {
            tiempoTotalPausado += tiempoTranscurrido;
        } else {
            tiempoTotalDescansando += tiempoTranscurrido;
        }
    }

    return {
        tiempoTotalConduciendo,
        tiempoTotalDescansando,
        tiempoTotalPausado,
    };
}

// Variables para realizar un seguimiento de los intervalos de tiempo
let intervaloInicio = null;
let intervaloEstadoActual = null;
let intervalosRegistrados = [];

// Actualizar registros de intervalos de tiempo
function actualizarIntervalosDeTiempo() {
    const estadoActual = determinarEstadoActual();

    if (!intervaloEstadoActual) {
        intervaloEstadoActual = estadoActual;
        intervaloInicio = truckData.game.time;
    } else if (intervaloEstadoActual !== estadoActual) {
        const intervaloFin = truckData.game.time;
        const duracionIntervalo = (new Date(intervaloFin) - new Date(intervaloInicio)) / 1000; // en segundos
        console.log(duracionIntervalo)
        if (duracionIntervalo > 20) {
            intervalosRegistrados.push({
                estado: intervaloEstadoActual,
                inicio: intervaloInicio,
                fin: intervaloFin,
            });
        }
        intervaloEstadoActual = estadoActual;
        intervaloInicio = truckData.game.time;
    }
}

// Guardar los intervalos de tiempo en localStorage
function guardarIntervalosEnLocalStorage() {
    localStorage.setItem("intervalosRegistrados", JSON.stringify(intervalosRegistrados));
}

// Cargar intervalos de tiempo desde localStorage
function cargarIntervalosDesdeLocalStorage() {
    const intervalosGuardados = localStorage.getItem("intervalosRegistrados") || "[]";
    return JSON.parse(intervalosGuardados);
}

// Cargar los intervalos almacenados en localStorage
intervalosRegistrados = cargarIntervalosDesdeLocalStorage();

async function fetchData() {
    try {
        const response = await fetch('./api-run.json');
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const newData = await response.json();
        newData.game.time = new Date().toISOString();
        if (fakeStop) {
            newData.truck.speed = 0
        }
        truckData = newData;
        actualizarIntervalosDeTiempo();
        registrosDeTiempo.push(newData.game.time); // Agrega la marca de tiempo a los registros
        const tiempoDeActividad = calcularTiempoDeActividad();
        console.log("Tiempo de conducción: " + tiempoDeActividad.tiempoTotalConduciendo/1000 + " segundos");
        console.log("Tiempo de descanso: " + tiempoDeActividad.tiempoTotalDescansando/1000 + " segundos");
        console.log("Tiempo pausado: " + tiempoDeActividad.tiempoTotalPausado/1000 + " segundos");
        console.log(determinarEstadoActual())

        guardarIntervalosEnLocalStorage();
        startTime(truckData.game.time)
        $('#speed').text(truckData.truck.speed)
        $('#odometer').text(truckData.truck.odometer)
        $('#driving').text(startTime(tiempoDeActividad.tiempoTotalConduciendo))
        $('#time').text(startDate(truckData.game.time))

    } catch (error) {
        console.error('Error:', error);
    }
}


var intervalo = setInterval(fetchData, 1000); // Ejecuta la función fetchData cada segundo

function nextScreen() {
    var $current = $('.screen.active');
    var $next = $current.next('.screen').length ? $current.next('.screen') : $('.screen:first');
    $current.removeClass('active');
    $next.addClass('active');
  }
  
  function prevScreen() {
    var $current = $('.screen.active');
    var $prev = $current.prev('.screen').length ? $current.prev('.screen') : $('.screen:last');
    $current.removeClass('active');
    $prev.addClass('active');
  }