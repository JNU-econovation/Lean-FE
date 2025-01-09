import './SignupInput.css';
import PropTypes from 'prop-types';

const SignupInput = ({ type, id, value, label, placeholder = '', onChange }) => {
    return (
        <div id="signup-input-container">
            <label htmlFor={id} id="signup-label">{label}</label>
            <input 
                type={type}
                id={id}
                value={value}
                className="signup-input-field"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

SignupInput.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired 
};

export default SignupInput;