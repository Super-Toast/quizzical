import React from "react"
import StartScreen from "./components/StartScreen"
import Game from "./components/Game"

export default function App() {
    
    const [start, setStart] = React.useState(false)
    
    function startGame() {
        setStart(true)
    }
    
    return (
        <div>
            {start ?
            <Game /> :
            <StartScreen 
                handleClick={startGame}
            />}
        </div>
    )
}