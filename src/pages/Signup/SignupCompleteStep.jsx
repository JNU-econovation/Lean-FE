import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import './Signup.css';

const SignupCompleteStep = () => {
    return (
        <div className="complete-container">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p id="info-text">회원가입 완료</p>
            <p id="info-text-gray">회원가입이 성공적으로 완료되었어요</p>
            <Button text="로그인하러 가기" type="button" className="signup-button" link='/signin'/>
        </div>
    );
};

SignupCompleteStep.propTypes = {
    navigate: PropTypes.func
};

export default SignupCompleteStep;
