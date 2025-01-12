import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import style from './Signup.module.css';

const SignupCompleteStep = () => {
    return (
        <div className="centerContainer">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p className={style.infoText}>회원가입 완료</p>
            <p className={style.infoTextGray}>회원가입이 성공적으로 완료되었어요</p>
            <Button text="로그인하러 가기" type="button" className={`fixWidth ${style.signupButton}`} link='/signin'/>
        </div>
    );
};

SignupCompleteStep.propTypes = {
    navigate: PropTypes.func
};

export default SignupCompleteStep;
