import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Test(props) {

    const location = useLocation()
    const navigate = useNavigate()
    // console.log(window.location.href)
    // const url = window.location.href
    // document.getElementById(window.location.href)
    // console.log(location.state)
    // window.onload = window.location.href = url

    const { id, name, questions } = location.state

    const ansArray = JSON.parse(localStorage.getItem(`answers${id}`)) === null ? Array(questions.length).fill(null) : JSON.parse(localStorage.getItem(`answers${id}`))

    const [question, setQuestion] = useState(questions[0])
    const [qnum, setQnum] = useState(0)
    const [answers, setAnswers] = useState(ansArray)
    const [tabChange, setTabChange] = useState(false)
    const [warnings, setWarnings] = useState(0)
    const [score, setScore] = useState(0)
    console.log(JSON.parse(localStorage.getItem("answers")))

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            setTabChange(true)
        } else {
            setTabChange(false)
        }

    })

    console.log("##"+window.frames.location.href)

    useEffect(() => {

        if (tabChange) {
            if (warnings === 3) {
                setResult()
            } else {
                setWarnings(prevWarn => prevWarn + 1)
                alert(`Warning ${warnings + 1}: Don't switch your current window!!!`)
            }
        }
    }, [tabChange])

    console.log("Warnings = " + warnings)

    useEffect(() => {
        console.log(questions.length + " " + qnum)
        setQuestion(questions[qnum])
    }, [qnum])

    function setAnswer(e) {
        const { type, value } = e.target

        setAnswers(prevAnswers => prevAnswers.map((answer, index) => {
            return (
                index === qnum ?
                    type === "checkbox" ?
                        answer === null ?
                            [value] :
                            answer.includes(value) ?
                                answer = answer.filter(ans => ans !== value) :
                                [...answer, value] :

                        // arr = arr.push(value) :
                        value :
                    answer)
        }))
    }



    useEffect(() => {
        setScore(0)
        for (let i = 0; i < answers.length; i++) {
            // console.log(questions[i].correctOptionIndex)
            // console.log(answers[i])
            if (Array.isArray(answers[i])) {
                // console.log("ans =" + answers[i].sort())
                // console.log(answers[i].map(Number))
                const newArr = answers[i].map(Number)
                if (JSON.stringify(questions[i].correctOptionIndex) === JSON.stringify(newArr)) {
                    setScore(prev => prev + 1)
                }
            }
            else if (questions[i].correctOptionIndex === parseInt(answers[i])) {
                setScore(prev => prev + 1)
            }
        }
        localStorage.setItem(`answers${id}`, JSON.stringify(answers))

    }, [answers])
    // console.log("Score = " + score)

    const optionElements = question.options.map((option, index) => {

        const optType = question.type === "Multiple-Response" ? "checkbox" : "radio"
        const name = question.type === "Multiple-Response" ? `checkbox${index}` : "option"
        // const setOn = optType === "checkbox" ? true : false
        // const ans = answers[qnum] !== null ? answers[qnum] : ""
        let checkedValue = parseInt(answers[qnum]) === index
        // console.log(checkedValue)
        // const valCheck = question.type === "Multiple-Response" ? answers[qnum].includes(index) :
        // console.log(valCheck)
        /* 
        if (answers[qnum] !== null)
            console.log(answers[0].option) */
        // console.log(Array.isArray(answers[qnum]))
        if (Array.isArray(answers[qnum])) {
            checkedValue = answers[qnum].includes(String(index))
            // console.log(checkedValue + " *** ")
        }
        // console.log(answers[qnum] !== null && answers[qnum].includes(index) + `${index}`)
        // console.log(answers[qnum], checkedValue)

        return (
            <div className={optType} key={index}>
                <label>
                    <input
                        type={optType}
                        name={name}
                        value={index}
                        checked={checkedValue}
                        onChange={setAnswer}
                    />
                    {option}
                </label>
            </div>
        )
    })

    function setResult() {
        navigate(`/finish`, { state: { score: score, questions: questions.length, testName: name } })
    }

    // console.log("All answered = " + answers.every(item => item !== null))
    // console.log(Array.isArray(answers[1]))
    return (
        <div className="col-md-12">
            <div className="panel panel-default" style={{ userSelect: "none" }}>
                <div className="panel-heading">{name}</div>
                <div className="panel-body" style={{ height: "185px" }}>
                    <form>
                        <label>{question.questionText}</label>
                        {optionElements}
                    </form>
                </div>
                <div className="panel-footer">
                    <div className="btn btn-primary" onClick={() => qnum > 0 && setQnum(prev => prev - 1)} style={qnum === 0 ? { opacity: "40%", marginRight: "5px", pointerEvents: "none" } : { marginRight: "5px" }}>Previous</div>
                    <div className="btn btn-success" onClick={() => qnum < questions.length - 1 && setQnum(prev => prev + 1)} style={qnum === questions.length - 1 ? { opacity: "40%", pointerEvents: "none" } : { opacity: "" }}>Next</div>
                    <div className="pull-right btn btn-danger" onClick={setResult} style={
                        answers.every(answer =>
                            Array.isArray(answer) ?
                                answer.length !== 0 :
                                answer !== null) ?
                            { opacity: "" } :
                            { opacity: "40%", pointerEvents: "none" }
                    }>Finish</div>

                </div>
            </div>
        </div>
    )
}

export default Test
