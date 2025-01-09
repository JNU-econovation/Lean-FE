import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/SigninInput';
import './Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const [signinError, setSigninError] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const tempSigninInfo = {
        username: 'admin',
        password: 'admin1234'
    };

    const getErrorMessage = () => {
        switch (signinError) {
            case 0:
                return '';
            case 1:
                return '아이디, 또는 비밀번호를 입력해주세요';
            case 2:
                return '로그인 정보가 일치하지 않습니다';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (username === '' || password === '') {
            setSigninError(1);
        } else if (handleSignin(username, password)) {
            navigate('/main');
        } else {
            setSigninError(2);
        }
    };

    const handleSignin = (username, password) => {
        return username === tempSigninInfo.username && password === tempSigninInfo.password;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="signin-container">
            <span id="service-name">전남대학교 물품 대여 서비스</span>
            <a href="/signin" id="lean-name">LEAN</a>
            <form id="signinForm" className="signin-form" onSubmit={handleSubmit} noValidate>
                <Input
                    type="text"
                    name="username"
                    placeholder="아이디를 입력해주세요"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className="error-message-container">
                    {signinError ? <p className="signin-error">{getErrorMessage()}</p> : ''}
                </div>
                <Button text="로그인" type="submit" className="signin-button" />
            </form>
            <div className="signup-link">
                <span>아직 회원이 아니신가요?</span>
                <a href="/signup" id="signupLink">회원가입</a>
            </div>
        </div>
    );
};

export default Signin;