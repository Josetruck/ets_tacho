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
import { useState } from 'react'


export default function Tacografo() {

    const [btnBack, setbtnBack] = useState(false)
    const [btnUp, setbtnUp] = useState(false)
    const [btnDown, setbtnDown] = useState(false)
    const [btnOk, setbtnOk] = useState(false)
    const [btnOne, setbtnOne] = useState(false)



    return (
        <div id="emulator">
            <Image id="background" src={background74} />
            <Display view={0}/>
            <div id="back" class="imgContainer" onMouseDown={() => { setbtnBack(true) }} onMouseUp={() => { setbtnBack(false) }} >
                {!btnBack ? <div>
                    <Image src={back} class="displaying" />
                    <Image src={back_pressed} class="hidding" />
                </div> :
                    <div>
                        <Image src={back} class="hidding" />
                        <Image src={back_pressed} class="displaying" />
                    </div>
                }
            </div>
            <div id="up" class="imgContainer" onMouseDown={() => { setbtnUp(true) }} onMouseUp={() => { setbtnUp(false) }} >
                {!btnUp ? <div>
                    <Image src={up} class="displaying child1" />
                    <Image src={up_pressed} class="hidding child2" />
                </div> :
                    <div>
                        <Image src={up} class="hidding" />
                        <Image src={up_pressed} class="displaying" />
                    </div>
                } </div>
            <div id="down" class="imgContainer" onMouseDown={() => { setbtnDown(true) }} onMouseUp={() => { setbtnDown(false) }} >
                {!btnDown ? <div>
                    <Image src={down} class="displaying" />
                    <Image src={down_pressed} class="hidding" />
                </div> :
                    <div>
                        <Image src={down} class="hidding" />
                        <Image src={down_pressed} class="displaying" />
                    </div>
                } </div>
            <div id="ok" class="imgContainer" onMouseDown={() => { setbtnOk(true) }} onMouseUp={() => { setbtnOk(false) }} >
                {!btnOk ? <div>
                    <Image src={ok} class="displaying" />
                    <Image src={ok_pressed} class="hidding" />
                </div> :
                    <div>
                        <Image src={ok} class="hidding" />
                        <Image src={ok_pressed} class="displaying" />
                    </div>
                } </div>
            <div id="one" class="imgContainer" onMouseDown={() => { setbtnOne(true) }} onMouseUp={() => { setbtnOne(false) }} >
                {!btnOne ? <div>
                    <Image src={one} class="displaying" />
                    <Image src={one_pressed} class="hidding" />
                </div> :
                    <div>
                        <Image src={one} class="hidding" />
                        <Image src={one_pressed} class="displaying" />
                    </div>
                } </div>
        </div>

    )
}
