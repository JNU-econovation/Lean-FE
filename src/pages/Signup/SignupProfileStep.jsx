import { useState, useCallback } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import SigninInput from '../../components/Input/SignupInput';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import './Signup.css';

const SignupProfileStep = ({ onNext, onBack }) => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const checkInputs = useCallback(() => {
        if (username && phone) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, phone]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        checkInputs();
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        checkInputs();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && phone) {
            onNext({ username, phone });
        }
    };

    return (
        <>
            <Navigation title="학사인증" onBackClick={onBack} />
            <div className="info-container">
                <p className="info-text">서비스를 위해</p>
                <div className="info-container-flex">
                    <p className="info-text-green">기본정보</p>
                    <p className="info-text">가 필요해요</p>
                </div>
            </div>
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
                <SigninInput
                    type="text"
                    id="username"
                    label="이름"
                    placeholder="이름 입력"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <SigninInput
                    type="tel"
                    id="phone"
                    label="휴대폰번호"
                    placeholder="띄어쓰기나 -를 제외하고 입력"
                    value={phone}
                    onChange={handlePhoneChange}
                />
                <Button text="다음" type="submit" className={`signup-button ${isButtonDisabled ? 'disabled' : ''}`} disabled={isButtonDisabled} />
            </form>
        </>
    );
};

SignupProfileStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default SignupProfileStep;
