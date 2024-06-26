import { useState } from 'react';
import PropTypes from 'prop-types'
import ErrorMessage from '../components/ErrorMessage'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';

const Question = ({ currQues, questions, options, correct, score, setCurrQues, setScore }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const handleSelect = (i) => {
        if (selected === i && selected === correct) {
            return 'correct';
        }
        else if (selected === i && selected !== correct) {
            return 'wrong';
        }
        else if (i === correct) {
            return 'correct';
        }
    }

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false);
    }

    const handleQuit = () => {
        setScore(0);
        navigate('/')
    }

    const handleNext = () => {
        if (currQues > 8) {
            navigate('/result');
        }
        else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        }
        else {
            setError("Please select an option first");
        }
    }

    return (
        <div className='question'>
            <h1>Question {currQues + 1}</h1>
            <div className='question-box'>
                <h2>{decode(questions[currQues].question)}</h2>
                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options &&
                        (options.map(i => (
                            <button key={i} onClick={() => { handleCheck(i) }} className={`option-box ${selected && handleSelect(i)}`} disabled={selected}>{decode(i)}</button>
                        )))}
                </div>
                <div className='controls'>
                    <Button variant='contained' color='secondary' size='large' style={{ width: 185 }} onClick={handleQuit}>Quit</Button>
                    <Button variant='contained' color='primary' size='large' style={{ width: 185 }} onClick={handleNext}>Next</Button>
                </div>
            </div>
        </div>
    )
}

Question.propTypes = {
    currQues: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    correct: PropTypes.string.isRequired,
    setCurrQues: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired,
}

export default Question
