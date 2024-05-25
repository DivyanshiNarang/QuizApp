import PropTypes from 'prop-types';

const ErrorMessage = ({ children }) => {
    return (
        <div className="error">
            {children}
        </div>
    )
}

ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ErrorMessage;
