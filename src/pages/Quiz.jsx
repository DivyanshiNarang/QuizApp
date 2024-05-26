import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { CircularProgress } from "@mui/material";
import Question from "../components/Question";
import { decode } from "html-entities";

const Quiz = ({ name, score, questions, setScore }) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (questions && questions.length > 0) {
            setLoading(false);
            const answers = [
                questions[currQues].correct_answer,
                ...questions[currQues].incorrect_answers
            ];
            setOptions(handleShuffle(answers));
        }
    }, [questions, currQues]);

    const handleShuffle = (answers) => {
        return answers.sort(() => Math.random() - 0.5);
    }

    return (
        <div className="quiz">
            <span className="subtitle">
                Welcome {name}!
            </span>
            {loading ? (
                <CircularProgress style={{ margin: 100 }} color='inherit' size={150} thickness={1} />
            ) : (
                <>
                    <div className="quizInfo">
                        <span>{decode(questions[currQues]?.category)}</span>
                        <span>Score: {score}</span>
                    </div>
                    <Question currQues={currQues} setCurrQues={setCurrQues} questions={questions} options={options} score={score} setScore={setScore} correct={questions[currQues].correct_answer} />
                </>
            )}
        </div>
    )
}

Quiz.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    questions: PropTypes.array,
    setScore: PropTypes.func.isRequired,
}

export default Quiz
