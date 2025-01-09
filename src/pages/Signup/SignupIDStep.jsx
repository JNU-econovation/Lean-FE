import { useState, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SigninInput from '../../components/Input/SignupInput';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import { isValidPassword, doPasswordsMatch, showError } from '../../hooks/useSignupValidation';
import './Signup.css';

const SignupIDStep = ({ onNext, onBack }) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const checkInputs = useCallback(() => {
        if (password && passwordConfirm) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [password, passwordConfirm]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkInputs();
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        checkInputs();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!isValidPassword(password)) {
            showError(document.getElementById('password'), '비밀번호는 8자 이상, 특수문자를 1개 이상 포함해야 합니다');
            isValid = false;
        }

        if (!doPasswordsMatch(password, passwordConfirm)) {
            showError(document.getElementById('password-confirm'), '비밀번호가 일치하지 않습니다');
            isValid = false;
        }

        if (isValid) {
            onNext({ password });
        }
    };

    return (
        <>
            <Navbar title="회원가입" onBackClick={onBack} />
            <div id="info-container">
                <p id="info-text">마지막으로</p>
                <p id="info-text">회원가입을 진행해볼까요?</p>
            </div>
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
                <SigninInput
                    type="password"
                    id="password"
                    label="비밀번호"
                    placeholder="비밀번호는 8자 이상, 특수문자 1개 이상"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <SigninInput
                    type="password"
                    id="password-confirm"
                    label="비밀번호 확인"
                    placeholder="비밀번호 확인"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                />
                <Button
                    text="회원가입"
                    type="submit"
                    className={`signup-button ${isButtonDisabled ? 'disabled' : ''}`}
                    disabled={isButtonDisabled}
                />
            </form>
        </>
    );
};

SignupIDStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default SignupIDStep;
