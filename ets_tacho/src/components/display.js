import { useEffect, useState } from "react"
import driveLarge from "../img/DRIVE_large.png"
import Image from "next/image"

export default function Display(props) {

    const [view, setView] = useState(0)
    useEffect(() =>{
        setView(props.view)
    }, [])

    return (
        <div>
            {view === 0 &&
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
            {view === 1 &&
                <div id="textdisplay" class="display display1" style="font-size: 2.08em;">
                    <div id="largeicon" style="width:20%;clear: none; float: left; padding-top: 3%; ">
                    <Image style="height: 2em; width: 2em;" src={driveLarge}/>
                    </div>
                <div class="column" style="width: 13%; font-size: 2.4em; font-family: JustusDisplayHiRes;">
                    0</div>
                <div class="column" style="width: 7%; font-family: JustusDisplay;">
                    <div class="row1">
                    &nbsp;</div>
                <div class="row2">
                    h</div>
                </div>
                <div class="column" style="width: 32%; font-size: 2.4em; font-family: JustusDisplayHiRes;">
                    00</div>
                <div class="column" style="width: 10%; font-size: 1.8em; margin-top: 2%; font-family: JustusDisplay;">
                    </div>
                <div class="column" style="font-family: JustusDisplay; width: 18%;">
                    <div class="row1">
                    &nbsp;</div>
                <div class="row2">
                    &nbsp;9h</div>
                </div>
                </div>

            }
        </div>


    )
}