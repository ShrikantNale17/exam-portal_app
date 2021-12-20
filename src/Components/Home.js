import React from 'react'
// import { useNavigate } from 'react-router-dom'
import TableRow from './TableRow'

function Home(props) {

    // const navigate = useNavigate()

    

    const testElements = props.tests.map((test) => <TableRow test={test} key={test._id}/>)

    return (
        <div className="col-md-12">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>No of Questions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {testElements}
                </tbody>
            </table>
        </div>
    )
}

export default Home
