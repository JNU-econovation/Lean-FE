import style from './SigninInput.module.css';
import PropTypes from 'prop-types';

const SigninInput = ({ type, name, placeholder, value, onChange, required = false }) => {
    return (
        <div className={style.container}>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={style.inputField}
            />
        </div>
    );
};

SigninInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

export default SigninInput;
