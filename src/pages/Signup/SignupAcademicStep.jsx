import { useState, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SigninInput from '../../components/Input/SignupInput';
import Dropdown from '../../components/Dropdown/SignupDropdown';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import style from './Signup.module.css';

const SignupAcademicStep = ({ onNext, onBack }) => {
    const [college, setCollege] = useState('');
    const [department, setDepartment] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const checkInputs = useCallback(() => {
        if (college && department && studentNumber) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [college, department, studentNumber]);

    const handleCollege = (selectedValue) => {
        setCollege(selectedValue)
        checkInputs();
    };

    const handleDepartment = (e) => {
        setDepartment(e.target.value)
        checkInputs();
    };

    const handleStudentNumber = (e) => {
        setStudentNumber(e.target.value)
        checkInputs();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (college && department && studentNumber) {
            onNext({ college, department, studentNumber });
        }
    };

    return (
        <>
            <Navbar title="학사인증" onBackClick={onBack} />
            <div className={style.infoBox}>
                <p className={style.infoText}>추후 인증을 위해</p>
                <div>
                    <p className={`${style.infoText} ${style.green}`}>학사정보</p>
                    <p className={style.infoText}>가 필요해요</p>
                </div>
            </div>
            <form className={style.signupForm} onSubmit={handleSubmit} noValidate>
                <Dropdown
                    label="단과대학"
                    list={['공과대학', '인문대학', '사회대학', "AI융합대학", "교육대학"]}
                    selected={college}
                    onSelect={handleCollege}
                />
                <SigninInput
                    type="text"
                    id="department"
                    label="학과"
                    placeholder="학과 입력"
                    value={department}
                    onChange={handleDepartment}
                />
                <SigninInput
                    type="number"
                    id="student-number"
                    label="학번"
                    placeholder="Ex) 201576"
                    value={studentNumber}
                    onChange={handleStudentNumber}
                />
                <Button
                    text="다음"
                    type="submit"
                    className={`fixWidth ${style.signupButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                />
            </form>
        </>
    );
};

SignupAcademicStep.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default SignupAcademicStep;
