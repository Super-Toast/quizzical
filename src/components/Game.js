import React from "react"
import Question from "./Question"
import {Context} from "../Context"

export default function Game() {
    const {api, changeStart} = React.useContext(Context)
    
    const [questions, setQuestions] = React.useState([])
    const [formData, setFormData] = React.useState({})
    const [newGame, setNewGame] = React.useState(false)
    const [responseCode, setResponseCode] = React.useState(0)
    
    function getQuestions() {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setResponseCode(data.response_code)
                data = decodeHTMLEntities(data)
                setQuestions(data.results)
            })
    }
    
    React.useEffect(getQuestions, [])
    
    React.useEffect(() => {
        if(questions.length > 0) {
            getFormData()
        }
    }, [questions])
    
    function decodeHTMLEntities(text) {
        const entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', "''"],
            ['#039', "'"],
            ['rsquo', "'"],
            ['Alpha', "Α"],
            ['Beta', "Β"],
            ['Gamma', "Γ"],
            ['Delta', "Δ"],
            ['Epsilon', "Ε"],
            ['Zeta', "Ζ"],
            ['lrm', "‎"],
            ['eacute', "é"],
            ['uuml', "ü"],
            ['ldquo', "“"],
            ['rdquo', "”"],
        ];
        
        let questionsCopy = JSON.stringify(text)
        
        for (let i = 0, max = entities.length; i < max; i++) {
            questionsCopy = questionsCopy.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
        }
        
        questionsCopy = JSON.parse(questionsCopy)    
        return questionsCopy
    }
        
    function getFormData() {
        let questionsData = {}
        for(const question of questions) {
            questionsData = {...questionsData, [question.question]: ""}
        }
        setFormData(questionsData)
    }
    
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }
        
    const questionsElements = questions.map(question => {
        return (
            <Question
                key={question.question}
                type={question.type}
                question={question.question}
                correctAnswer={question.correct_answer}
                incorrectAnswers={question.incorrect_answers}
                handleChange={handleChange}
                isChecked={isChecked}
            />
        )
    })
    
    function isChecked(name, answer) {
        let check = false
        if(formData[name] === answer) {
            check = true
        }
        return check
    }
    
    const correctAnswers = questions.map(question => question.correct_answer)
    
    const [showStats, setShowStats] = React.useState(false)
    const [showMsg, setShowMsg] = React.useState(false)
    const [correctAnswersNum, setCorrectAnswersNum] = React.useState(0)
    
    function checkAnswers(event) {
        event.preventDefault()
        
        const formDataValues = Object.values(formData)
        
        if(formDataValues.every(item => item !== "")) {
            for(let i = 0; i < correctAnswers.length; i++) {
                if(formDataValues[i] === correctAnswers[i]) {
                    setCorrectAnswersNum(prevNum => prevNum + 1)
                    document.getElementById(questions[i].question + correctAnswers[i]).classList.add("correct")
                } else {
                    document.getElementById(questions[i].question + formDataValues[i]).classList.add("incorrect")
                    document.getElementById(questions[i].question + correctAnswers[i]).classList.add("correct")
                }
            }
            document.querySelectorAll("input").forEach(input => {
                input.disabled = true
                input.classList.add("finished-quiz")
            })
            setShowMsg(true)
            setShowStats(true)
            setNewGame(true)
            window.scrollTo({top:0, left:0, behavior: 'smooth'})
        } else {
            setShowMsg(true)
        }
    }
    
    function resetGame(event) {
        event.preventDefault()
        setFormData({})
        setQuestions([])
        getQuestions()
        getFormData()
        setNewGame(false)
        setShowMsg(false)
        setShowStats(false)
        setCorrectAnswersNum(0)
        window.scrollTo({top:0, left:0, behavior: 'smooth'})
    }
            
    return (
        responseCode === 0 ?
            <form className="game-container">
                {questionsElements}
                {showMsg && (showStats ?
                    <p className="end-msg">
                        You scored {correctAnswersNum}/{questions.length} correct answers
                    </p> :
                    <p className="end-msg end-msg-warning">
                        Please complete all questions!
                    </p>)
                }
                {questions.length > 0 &&
                    <React.Fragment>
                        <button className="end-game--btn" 
                            onClick={newGame ?
                            resetGame : 
                            checkAnswers}
                        >
                            {newGame ? "Play again" : "Check answers"}
                        </button>
                        <button className="show-menu--btn" onClick={changeStart}>Main menu</button>
                    </React.Fragment>    
                }
            </form> :
            <div className="game-error-msg-container">
                <p className="error-msg">An error occurred. Please try again and if the error persists try changing the game parameters.</p>
                <button className="show-menu--btn" onClick={changeStart}>Main menu</button>
            </div> 
    )
}