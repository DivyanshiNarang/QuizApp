import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, MenuItem, Button } from '@mui/material'
import PropTypes from 'prop-types'
import Categories from '../data/Categories'
import ErrorMessage from '../components/ErrorMessage'

const Home = ({ name, setName, fetchQuestions }) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (!name || !category || !difficulty) {
            setError(true);
            return;
        }
        setError(false);
        fetchQuestions(category, difficulty);
        navigate('/quiz');
    }

    return (
        <div className='content'>
            <div className='settings'>

                <span style={{ fontSize: 30 }}>
                    Quiz Settings
                </span>

                <div className='settings_select'>
                    {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
                    <TextField label='Enter Your Name' variant='outlined' style={{ marginBottom: 25 }} onChange={(e) => setName(e.target.value)} />

                    <TextField select label='Select Category' variant='outlined' style={{ marginBottom: 30 }} value={category} onChange={(e) => setCategory(e.target.value)}>
                        {Categories.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.category}</MenuItem>
                        ))}
                    </TextField>

                    <TextField select label='Select Difficulty' variant='outlined' style={{ marginBottom: 30 }}
                        value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>

                        <MenuItem key="Easy" value="easy">Easy</MenuItem>
                        <MenuItem key="Medium" value="medium">Medium</MenuItem>
                        <MenuItem key="Hard" value="hard">Hard</MenuItem>

                    </TextField>

                    <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>Start Quiz</Button>

                </div>
            </div>
            <img src='/quiz.svg' alt='quiz image' className='banner' />
        </div>
    )
}

Home.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
}

export default Home