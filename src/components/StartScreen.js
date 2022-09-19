import React from "react"

export default function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1 className="start-screen--title">Quizzical</h1>
            <p className="start-screen--description">
                Test your knowledge with hundreds of questions from different categories
            </p>
            <button className="start-btn" onClick={props.handleClick}>Start quiz!</button>
        </div>
    )
}