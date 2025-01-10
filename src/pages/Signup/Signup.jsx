import { useState } from 'react';
import ProfileStep from './SignupProfileStep';
import AcademicStep from './SignupAcademicStep';
import IDStep from './SignupIDStep';
import CompleteStep from './SignupCompleteStep';
import style from './Signup.module.css';

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [signupData, setSignupData] = useState({});

    const handleBackClick = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            window.history.back();
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ProfileStep
                        onNext={(data) => {
                            setSignupData({ ...signupData, ...data });
                            setCurrentStep(2);
                        }}
                        onBack={handleBackClick}
                    />
                );
            case 2:
                return (
                    <AcademicStep
                        onNext={(data) => {
                            setSignupData({ ...signupData, ...data });
                            setCurrentStep(3);
                        }}
                        onBack={handleBackClick}
                    />
                );
            case 3:
                return (
                    <IDStep
                        onNext={(data) => {
                            setSignupData({ ...signupData, ...data });
                            setCurrentStep(4);
                        }}
                        onBack={handleBackClick}
                    />
                );
            case 4:
                console.log(signupData);
                return <CompleteStep/>;
            default:
                return null;
        }
    };

    return <div className={`pageContainer ${style.signupContainer}`}>{renderCurrentStep()}</div>;
};

export default Signup;
