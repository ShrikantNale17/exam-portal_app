import React from 'react'
import { useNavigate } from 'react-router-dom'

function TableRow(props) {

    const { _id, name, questions } = props.test

    const navigate = useNavigate()

    function setTest() {
        localStorage.setItem("isTestStarted", JSON.stringify(true))
        // localStorage.setItem("answers",null)
        navigate(`/test/${_id}`,{state: {id: _id, name: name, questions: questions}})
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{questions.length}</td>
            <td><div onClick={() => setTest()} className="btn btn-warning">Start Test</div></td>
        </tr>
    )
}

export default TableRow
