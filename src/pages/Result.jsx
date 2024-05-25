import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";

const Result = ({ name, score }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!name) {
            navigate('/');
        }
    }, [name, navigate]);

    return (
        <div className="result">
            <span className="title">Final score: {score}</span>
            <Button variant="contained" color="secondary" size="large" style={{ alignSelf: "center", marginTop: 20 }} href='/'>Go to HomePage</Button>
        </div>
    )
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
}

export default Result
