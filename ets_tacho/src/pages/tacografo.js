'use client'

import background74 from './../img/background74.jpg'
import back from '../img/back.png'
import back_pressed from '../img/back_pressed.png'
import one from '../img/one.png'
import one_pressed from '../img/one_pressed.png'
import up from '../img/up.png'
import up_pressed from '../img/up_pressed.png'
import down from '../img/down.png'
import down_pressed from '../img/down_pressed.png'
import ok from '../img/ok.png'
import ok_pressed from '../img/ok_pressed.png'
import Image from 'next/image'
import Display from '@/components/display'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tacografo() {
    const [btnBack, setbtnBack] = useState(false);
    const [btnUp, setbtnUp] = useState(false);
    const [btnDown, setbtnDown] = useState(false);
    const [btnOk, setbtnOk] = useState(false);
    const [btnOne, setbtnOne] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState({});
    const [speed, setSpeed] = useState(0);
    const [time, setTime] = useState('')
    const views = [
        {
            "id": 0,
            "dsp": "current"
        }, {
            "id": 1,
            "dsp": "timeto"
        }, {
            "id": 2,
            "dsp": "speed"
        }
    ];
    const [tiempoDeActividad, setTiempoDeActividad] = useState({});
    //DRIVER STATE
    const [tachoState, setTachoState] = useState("Descanso");
        // Variables para realizar un seguimiento de los intervalos de tiempo
    const [intervaloInicio, setIntervaloInicio] = useState(false)
    const [intervaloEstadoActual, setIntervaloEstadoActual] = useState(false)
    const [intervalosRegistrados, setIntervalosRegistrados] = useState([]);
    const [estadoActual, setEstadoActual] = useState('')

    const handleUp = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % views.length);
    };

    const handleDown = () => {
        setCurrentIndex((prevIndex) => prevIndex > 0 ? (prevIndex - 1) : (views.length - 1));
    };

    const tachoSwitch = () => {
        if (tachoState == "Descanso") {
            console.log(1)
            setTachoState("Disponibilidad")
        } else if (tachoState == "Disponibilidad") {
            setTachoState("Descanso")
            console.log(0)
        }
        
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/ets2/telemetry', {
                    headers: {
                        'Accept': 'application/json',
                        // Puedes agregar más cabeceras si es necesario
                    },
                    mode: 'cors', // Configura el modo 'cors'
                });

                if (response.status !== 200) {
                    throw new Error('Error al obtener los datos');
                }
                setData(response.data);
                setSpeed(response.data.truck.speed)
                setTime(response.data.game.time)
                actualizarIntervalosDeTiempo(response.data);
                setTiempoDeActividad(calcularTiempoDeActividad());
                console.log(tiempoDeActividad)

            } catch (error) {
                console.error('Error:', error);
            }

        };

        // Ejecuta fetchData inmediatamente y luego cada segundo
        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

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



    // Función para determinar el estado actual
    function determinarEstadoActual(speed) {
        if (speed > 0) {
            var newspeed = parseInt(speed)
        } else if (speed < -1) {
            var newspeed = parseInt(speed)
        } else {
            var newspeed = 0
        }
        if (newspeed != 0) {
            setTachoState("Disponibilidad")
            return "Conducción";
        } else if (newspeed == 0 && tachoState == "Disponibilidad") {
            return "Disponibilidad";
        } else if (newspeed == 0 && tachoState == "Descanso") {
            return "Descanso";
        }
    }

    // Función para calcular el tiempo de actividad
    function calcularTiempoDeActividad() {
        let tiempoTotalConduciendo = 0;
        let tiempoTotalDescansando = 0;
        let tiempoTotalPausado = 0;
        console.log(intervalosRegistrados)

        for (let i = 0; i < intervalosRegistrados.length; i++) {
            let tiempoTranscurrido = new Date(intervalosRegistrados[i].fin) - new Date(intervalosRegistrados[i].inicio);

            if (intervalosRegistrados[i].estado == "Conducción") {
                tiempoTotalConduciendo += tiempoTranscurrido;
            } else if (intervalosRegistrados[i].estado == "Disponibilidad") {
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



    // Actualizar registros de intervalos de tiempo
    function actualizarIntervalosDeTiempo(data) {
        console.log(data.truck.speed, determinarEstadoActual(data.truck.speed), tachoState)
        setEstadoActual(determinarEstadoActual(data.truck.speed));

        if (!intervaloEstadoActual) {
            setIntervaloEstadoActual(estadoActual);
            setIntervaloInicio(data.game.time);
        } else if (intervaloEstadoActual !== estadoActual) {
            const duracionIntervalo = (new Date(data.game.time) - new Date(intervaloInicio)) / 1000; // en segundos
            //console.log(duracionIntervalo)
            if (duracionIntervalo > 20) {
                setIntervalosRegistrados([...intervalosRegistrados, {
                    estado: intervaloEstadoActual,
                    inicio: intervaloInicio,
                    fin: data.game.time,
                }]);
            }
            setIntervaloEstadoActual(estadoActual);
            setIntervaloInicio(data.game.time);
        }
    }

    return (
        <div id="emulator">
            <Image id="background" src={background74} />
            <Display view={currentIndex} truck={data.truck} game={data.game} />
            <div id="back" className="imgContainer" onMouseDown={() => { setbtnBack(true) }} onMouseUp={() => { setbtnBack(false) }} >
                {!btnBack ? <div>
                    <Image src={back} className="displaying" />
                    <Image src={back_pressed} className="hidding" />
                </div> :
                    <div>
                        <Image src={back} className="hidding" />
                        <Image src={back_pressed} className="displaying" />
                    </div>
                }
            </div>
            <div id="up" className="imgContainer" onMouseDown={() => { setbtnUp(true) }} onMouseUp={() => { setbtnUp(false) }} onClick={handleUp}>
                {!btnUp ? <div>
                    <Image src={up} className="displaying child1" />
                    <Image src={up_pressed} className="hidding child2" />
                </div> :
                    <div>
                        <Image src={up} className="hidding" />
                        <Image src={up_pressed} className="displaying" />
                    </div>
                } </div>
            <div id="down" className="imgContainer" onMouseDown={() => { setbtnDown(true) }} onMouseUp={() => { setbtnDown(false) }} onClick={handleDown} >
                {!btnDown ? <div>
                    <Image src={down} className="displaying" />
                    <Image src={down_pressed} className="hidding" />
                </div> :
                    <div>
                        <Image src={down} className="hidding" />
                        <Image src={down_pressed} className="displaying" />
                    </div>
                } </div>
            <div id="ok" className="imgContainer" onMouseDown={() => { setbtnOk(true) }} onMouseUp={() => { setbtnOk(false) }} >
                {!btnOk ? <div>
                    <Image src={ok} className="displaying" />
                    <Image src={ok_pressed} className="hidding" />
                </div> :
                    <div>
                        <Image src={ok} className="hidding" />
                        <Image src={ok_pressed} className="displaying" />
                    </div>
                } </div>
            <div id="one" className="imgContainer" onClick={() => tachoSwitch()} onMouseDown={() => { setbtnOne(true) }} onMouseUp={() => { setbtnOne(false) }} >
                {!btnOne ? <div>
                    <Image src={one} className="displaying" />
                    <Image src={one_pressed} className="hidding" />
                </div> :
                    <div>
                        <Image src={one} className="hidding" />
                        <Image src={one_pressed} className="displaying" />
                    </div>
                } </div>
            {intervalosRegistrados.map(x => <p>{x.estado}</p>)}
        </div>

    )
}
