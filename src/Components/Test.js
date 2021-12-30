import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Question from './Question'

function Test(props) {

    const location = useLocation()
    const navigate = useNavigate()
    // console.log(window.location.href)
    // const url = window.location.href
    // document.getElementById(window.location.href)
    // console.log(location.state)
    // window.onload = window.location.href = url

    const { id, name, questions } = location.state.test
    console.log("qnum="+location.state.q_id)
    console.log(questions.filter((question,index) => question._id === location.state.q_id))
    console.log(questions.indexOf(questions.filter((question,index) => question._id === location.state.q_id)[0]))
    const ansArray = JSON.parse(localStorage.getItem(`answers${id}`)) === null ? Array(questions.length).fill(null) : JSON.parse(localStorage.getItem(`answers${id}`))

    const newQnum = location.state.qnum ? location.state.qnum : 0
    console.log(newQnum + ".....")
    const [question, setQuestion] = useState()
    const [qnum, setQnum] = useState(newQnum)
    const [answers, setAnswers] = useState(ansArray)
    // const [tabChange, setTabChange] = useState(false)
    // const [warnings, setWarnings] = useState(0)
    // const [score, setScore] = useState(0)
    console.log(JSON.parse(localStorage.getItem(`answers${id}`)))
    useEffect(() => {
        setQnum(newQnum)
        console.log(window.location)
        console.log(window.history)
    },[window.location.pathname])
    // console.log(window.location)
    /* 
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                setTabChange(true)
            } else {
                setTabChange(false)
            }
    
        }) */
    /* 
        window.addEventListener("focus", function (e) {
    
            console.log(e)
            setTabChange(true)
        })
    
        console.log("##" + window.frames.location.href) */

    /* useEffect(() => {

        if (tabChange) {
            if (warnings === 3) {
                setResult()
            } else {
                setWarnings(prevWarn => prevWarn + 1)
                alert(`Warning ${warnings + 1}: Don't switch your current window!!!`)
            }
            setTabChange(false)
        }
    }, [tabChange])

    console.log("Warnings = " + warnings) */

    useEffect(() => {
        console.log(questions.length + " " + qnum)
        setQuestion(questions[qnum])
        navigate(`/exam-portal_app/test/${id}/${questions[qnum]._id}`, {state: {test: location.state.test, qnum: qnum}})
        console.log(questions[qnum]._id)
    }, [qnum])

    useEffect(() => {

        localStorage.setItem(`answers${id}`, JSON.stringify(answers))

    }, [answers])

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
                        value :
                    answer)
        }))
    }

    function setResult() {
        let Score = 0
        for (let i = 0; i < answers.length; i++) {
            console.log(questions[i].correctOptionIndex)
            console.log(answers[i])
            if (Array.isArray(answers[i])) {
                console.log("ans =" + answers[i].sort())
                console.log(answers[i].map(Number))
                const newArr = answers[i].map(Number)
                if (JSON.stringify(questions[i].correctOptionIndex) === JSON.stringify(newArr)) {
                    Score++
                }
            }
            else if (questions[i].correctOptionIndex === parseInt(answers[i])) {
                Score++
            }
        }
        localStorage.setItem(`answers${id}`, null)
        navigate(`/exam-portal_app/finish`, { state: { score: Score, questions: questions.length, testName: name } })
    }

    /* const optionElements = question.options.map((option, index) => {

        const optType = question.type === "Multiple-Response" ? "checkbox" : "radio"
        const name = question.type === "Multiple-Response" ? `checkbox${index}` : "option"
        let checkedValue = parseInt(answers[qnum]) === index
        if (Array.isArray(answers[qnum])) {
            checkedValue = answers[qnum].includes(String(index))
        }

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
    }) */



    return (
        <div className="col-md-12">
            <div className="panel panel-default" style={{ userSelect: "none" }}>
                <div className="panel-heading">{name}</div>
                <div className="panel-body" style={{ height: "185px" }}>
                    {/* <form>
                        <label>{question.questionText}</label>
                        {optionElements}
                    </form> */}
                    {question && <Question
                        question={question}
                        answers={answers}
                        qnum={qnum}
                        setAnswer={setAnswer}
                    />}
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
