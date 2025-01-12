import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, type = 'button', className, link, onClick }) => {
    if (link) {
        return (
            <a href={link} className={`button ${className}`}>
                <span style={{ cursor: 'pointer' }}>{text}</span>
            </a>
        );
    } else if (onClick)
    {
        return (
            <div onClick={onClick} className={`button ${className}`}>
                <span style={{ cursor: 'pointer' }}>{text}</span>
            </div>
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
    onClick: PropTypes.func,
};

export default Button;