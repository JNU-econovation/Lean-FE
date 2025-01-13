import CompletePage from "../../components/page/CompletePage";

const SignupCompleteStep = () => {
    return (
        <CompletePage title='회원가입 완료' description='회원가입이 성공적으로 완료되었어요' buttonText='로그인하러 가기' link='/signin'/>
    );
};

export default SignupCompleteStep;
