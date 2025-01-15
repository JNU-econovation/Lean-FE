import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/SigninInput';
import style from './Signin.module.css';
import apiClient from '../../services/apiClient';

const Signin = () => {
    const navigate = useNavigate();
    const [signinError, setSigninError] = useState(0);
    const [formData, setFormData] = useState({
        // 상태관리
        studentNumber: '',
        password: ''
    });

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

    // POST요청 보내는 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { studentNumber, password } = formData;
            const response = await apiClient.post('/api/v1/signin', {
                // request Body
                studentNumber: studentNumber,
                password : password,
            })
            const { isStudentCouncil } = response.data;
            if(response.data){
                navigate('/admin/main');
            } else {
                navigate('/main')
            }
        } catch (error) {
            setSigninError(2);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={style.container}>
            <span className={style.serviceName}>전남대학교 물품 대여 서비스</span>
            <a href="/signin" className={style.lean}>LEAN</a>
            <form className={style.signinForm} id="signin-form" onSubmit={handleSubmit} noValidate>
                <Input
                    type="text"
                    name="studentNumber"
                    placeholder="학번을 입력해주세요"
                    value={formData.studentNumber}
                    onChange={handleChange} // 값이 바뀔 때마다 handleChange 호출해서 formData에 저장
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
                <div className={style.errorMessage}>
                    {signinError ? <p className={style.errorMessage}>{getErrorMessage()}</p> : ''}
                </div>
                <Button text="로그인" type="submit" className={style.signinButton} />
            </form>
            <div className={style.signupLink}>
                <span>아직 회원이 아니신가요?</span>
                <a href="/signup" className={style.signupLink}>회원가입</a>
            </div>
        </div>
    );
};

export default Signin;