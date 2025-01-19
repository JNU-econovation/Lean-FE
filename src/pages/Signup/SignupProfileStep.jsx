import { useState, useCallback, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SigninInput from '../../components/Input/SignupInput';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import style from './Signup.module.css';

const SignupProfileStep = ({ onNext, onBack }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const checkInputs = useCallback(() => {
        if (name && phoneNumber) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, phoneNumber]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        checkInputs();
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        checkInputs();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && phoneNumber) {
            onNext({ name, phoneNumber });
        }
    };

    useEffect(() => {
        checkInputs();
    }, [name, phoneNumber, checkInputs]);


    return (
        <>
            <Navbar title="학사인증" onBackClick={onBack} />
            <div className={style.infoBox}>
                <p className={style.infoText}>서비스를 위해</p>
                <div>
                    <p className={`${style.infoText} ${style.green}`}>기본정보</p>
                    <p className={style.infoText}>가 필요해요</p>
                </div>
            </div>
            <form className={style.signupForm} onSubmit={handleSubmit} noValidate>
                <SigninInput
                    type="text"
                    id="name"
                    label="이름"
                    placeholder="이름 입력"
                    value={name}
                    onChange={handleNameChange}
                />
                <SigninInput
                    type="tel"
                    id="phoneNumber"
                    label="휴대폰번호"
                    placeholder="띄어쓰기나 -를 제외하고 입력"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <Button text="다음" type="submit" className={`fixWidth ${style.signupButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} />
            </form>
        </>
    );
};

SignupProfileStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default SignupProfileStep;
