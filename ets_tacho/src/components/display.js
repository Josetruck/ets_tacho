import { useEffect, useState } from "react"
import driveLarge from "../img/DRIVE_large.png"
import Image from "next/image"

export default function Display(props) {


    return (
        <div>
            {props.view === 0 &&
                <div id="textdisplay" class="display">
                    <div class="column1" >
                        <div class="row1">
                            </div>
                        <div class="row2">
                            </div>
                    </div>
                    <div class="column2" >
                        &nbsp;0</div>
                    <div class="column3" >
                        <div class="row1">
                            &nbsp;</div>
                        <div class="row2">
                            h</div>
                    </div>
                    <div class="column4" >
                        00</div>
                    <div class="column5" >
                        <div class="row1">
                            &nbsp;&nbsp;</div>
                        <div class="row2">
                            4h13</div>
                    </div>
                </div>
            }
            {props.view === 1 &&
                <div id="textdisplay" class="display display1" >
                    <div id="largeicon" >
                        <Image class="largeicon-img" src={driveLarge} />
                    </div>
                    <div class="column1">
                        0</div>
                    <div class="column2">
                        <div class="row1">
                            &nbsp;</div>
                        <div class="row2">
                            h</div>
                    </div>
                    <div class="column3" >
                        00</div>
                    <div class="column4" >
                        </div>
                    <div class="column5" >
                        <div class="row1">
                            &nbsp;</div>
                        <div class="row2">
                            &nbsp;9h</div>
                    </div>
                </div>
            }
            {props.view === 2 &&
                <div id="textdisplay" class="display display2" >
                <div class="row1">&nbsp;&nbsp;&nbsp;{parseInt(props.truck.speed)}km/h&nbsp;&nbsp;&nbsp;</div>
                <div class="row2">--&nbsp;&nbsp;&nbsp;{props.truck.odometer.toFixed(2)}km</div>
                </div>
            }
        </div>


    )
}