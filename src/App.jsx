import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category, difficulty) => {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`);
    setQuestions(data.results);
  }

  return (
    <BrowserRouter>
      <div className='app'>

        <Header />

        <Routes>
          <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path='/quiz' element={<Quiz name={name} score={score} questions={questions} setScore={setScore} />} />
          <Route path='/result' element={<Result name={name} score={score} />} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>

  )
}

export default App
