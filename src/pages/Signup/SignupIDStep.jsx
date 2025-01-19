import { useState, useCallback, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SigninInput from '../../components/Input/SignupInput';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import { isValidPassword, doPasswordsMatch, showError } from '../../hooks/useSignupValidation';
import style from './Signup.module.css';
import apiClient from '../../services/apiClient';

const SignupIDStep = ({ onNext, onBack, signupData }) => {
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
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSubmit = async (e) => {
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
            try {
                const payload = { ...signupData, password };
                const response = await apiClient.post('/api/v1/users', payload);
                console.log('회원가입 성공:', response.data);
                onNext({ password });
            } catch (error) {
                console.error('회원가입 실패:', error);
                showError(null, '회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    useEffect(() => {
        checkInputs();
    }, [password, passwordConfirm, checkInputs]);

    return (
        <>
            <Navbar title="회원가입" onBackClick={onBack} />
            <div className={style.infoBox}>
                <p className={style.infoText}>마지막으로</p>
                <p className={style.infoText}>회원가입을 진행해볼까요?</p>
            </div>
            <form className={style.signupForm} onSubmit={handleSubmit} noValidate>
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
                    className={`fixWidth ${style.signupButton} ${isButtonDisabled ? "disabled" : ''}`}
                    disabled={isButtonDisabled}
                />
            </form>
        </>
    );
};

SignupIDStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    signupData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        collegeId: PropTypes.number.isRequired,
        department: PropTypes.string.isRequired,
        studentNumber: PropTypes.string.isRequired,
    }).isRequired,
};

export default SignupIDStep;
