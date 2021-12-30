import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Test from "./Test"
import Finish from "./Finish"
// import axios from 'axios'
import api from '../API/api'

function App() {

  const [tests, setTest] = useState([])
  const [error, setError] = useState("")

  /* useEffect(async() => {
    await axios.get("http://interviewapi.stgbuild.com/getQuizData")
      .then(res => setTest(res.data.tests))
      .catch(error => setError(error.message))
  }, []) */

  useEffect(async() => {
    await api.get("/tests")
      .then(res => setTest(res.data))
      .catch(error => setError(error.message))
  }, [])

  console.log(error)

  return (
    <div className="container">
      {error === "" ?
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <BrowserRouter>

            <Routes>
              <Route path="/exam-portal_app" element={<Home tests={tests} />} />
              <Route path="/exam-portal_app/finish" element={<Finish />} />
              <Route path="/exam-portal_app/test/:id/*" element={<Test tests={tests} />} />
            </Routes>
          </BrowserRouter>
        </div> :
        <h1>{error}</h1>}
    </div>
  );
}

export default App;
