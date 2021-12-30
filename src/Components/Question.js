import React from 'react'

function Question(props) {
    const { question, answers, qnum, setAnswer } = props

    const optionElements = question.options.map((option, index) => {

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
    })

    return (
        <form>
            <label>{question.questionText}</label>
            {optionElements}
        </form>
    )
}

export default Question
