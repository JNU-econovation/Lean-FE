import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, type = 'button', className = '', link = '' }) => {
    if (link) {
        return (
            <a href={link} className={`button ${className}`}>
                <span style={{ cursor: 'pointer' }}>{text}</span>
            </a>
        );
    }

    return (
        <button type={type} className={`button ${className}`}>
            <span style={{ cursor: 'pointer' }}>{text}</span>
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
};

export default Button;