import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Finish() {
    const location = useLocation()
    const { score, questions, testName } = location.state
    return (
        <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading">{testName} - Result</div>
                <div className="panel-body">
                    <center>
                        <h2 className="">Total no of Questions: {questions}</h2>
                        <h3 className="text-success">Correct Answers: {score}
                            <span className="text-danger">Wrong Answers: {questions - score}</span></h3>
                        
                    </center>
                </div>
            </div>
            <center><Link to='/' className="btn btn-primary">Go to Home</Link></center>
        </div>
    )
}

export default Finish
