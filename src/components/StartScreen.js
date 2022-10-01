import React, {useEffect, useState} from "react"
import apiCategoriesData from "../apiData"
import { Context } from "../Context"

export default function StartScreen() {
    const {changeApi, changeStart} = React.useContext(Context)

    const [apiForm, setApiForm] = useState({amount: "10", category: "8", difficulty: "any", type: "any"})

    const categoriesHtml = apiCategoriesData.map(category => (
        <option 
            key={category.value}
            value={category.value}
        >
            {category.category}
        </option>)
    )

    function handleChange(event) {
        const {name, value} = event.target

        setApiForm(prevData => ({
            ...prevData,
            [name]: value
        }))

    }

    function provideApi() {
        changeApi(apiData)
    }

    const apiData = `https://opentdb.com/api.php?amount=${apiForm.amount}${apiForm.category > 8 ? `&category=${apiForm.category}` : ""}${apiForm.difficulty !== "any" ? `&difficulty=${apiForm.difficulty}` : ""}${apiForm.type !== "any" ? `&type=${apiForm.type}` : ""}`
    
    useEffect(provideApi, [apiData])
    
    return (
        <div className="start-screen">
            <h1 className="start-screen--title">Quizzical</h1>
            <p className="start-screen--description">
                Test your knowledge with hundreds of questions from different categories
            </p>
            <form className="start-screen--form">
                <label htmlFor="amount" className="start-screen--form-label">Number of questions:</label>
                <select className="start-screen--form-select" id="amount" value={apiForm.amount} name="amount" onChange={handleChange}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <label htmlFor="category" className="start-screen--form-label">Category:</label>
                <select className="start-screen--form-select" id="category" value={apiForm.category} name="category" onChange={handleChange}>
                    {categoriesHtml}
                </select>
                <label htmlFor="difficulty" className="start-screen--form-label">Difficulty:</label>
                <select className="start-screen--form-select" id="difficulty" value={apiForm.difficulty} name="difficulty" onChange={handleChange}>
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="high">Hard</option>
                </select>
                <label htmlFor="type" className="start-screen--form-label">Question type:</label>
                <select className="start-screen--form-select" id="type" value={apiForm.type} name="type" onChange={handleChange}>
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True/False</option>
                </select>
            </form>
            <button className="start--btn" onClick={changeStart}>Start quiz!</button>
        </div>
    )
}