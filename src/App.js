import React from "react"
import StartScreen from "./components/StartScreen"
import Game from "./components/Game"
import {Context} from "./Context"

export default function App() {
    
    const {start} = React.useContext(Context)
    
    return (
        <div>
            {start ?
            <Game /> :
            <StartScreen 
            />}
        </div>
    )
}