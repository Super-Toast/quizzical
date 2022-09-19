import React from "react"

export default function Question(props) {
  
    const [shuffledAnswers, setShuffledAnswers] = React.useState([])
    
    React.useEffect(() => {
        setShuffledAnswers(getAnswers())
    }, [])
    function getAnswers() {
        const answers = [...props.incorrectAnswers, props.correctAnswer]
        const answersCopy = answers
        const answersShuffled = []
        const answersLength = answers.length
        for(let i = 0; i < answersLength; i++) {
            const randomNum = Math.floor(Math.random() * answersCopy.length)
            answersShuffled.push(answersCopy[randomNum])
            answersCopy.splice(randomNum, 1)
        }
        return (
            answersShuffled
        )
    }
    
    const shuffledAnswersElements = shuffledAnswers.map(answer => {
        let isChecked = props.checked(props.question, answer)
        
        return (
            <li key={answer}>
                <input 
                    type="radio"
                    id={props.question + answer}
                    value={answer}
                    name={props.question}
                    onChange={props.handleChange}
                    required
                    checked={isChecked}
                />
                <label htmlFor={props.question + answer}>{answer}</label>
            </li>
        )
    })
    
    return (
        <div className="question-container">
            <h3 className="question-container--title">{props.question}</h3>
            <ul className="answers-container">
                {shuffledAnswersElements}
            </ul>
            <hr />
        </div>
    )
}