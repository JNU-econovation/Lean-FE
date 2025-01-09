import './Main.css';
import MainCard from '../../components/Card/MainCard';
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate();
    return (
        <div className="main-container">
            <div className="profile-card">
                <div className="profile-name-container">
                    <div className="profile-image">
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <span className='profile-name'>이현호님</span>
                    <div 
                        className="chevron-forward-container"
                        onClick={() => navigate('/mypage')}>
                        <ion-icon name="chevron-forward"></ion-icon>
                    </div>
                </div>
                <div className="profile-text-container">
                    <span>오늘 대운동장에서 피크닉 어때요?</span>
                </div>
            </div>
            <div className="date-card">
                <p className="date-text">2024년 11월 27일</p>
                <p className="until-text">반납기한까지</p>
                <p className="d-day-text">1DAY 2H</p>
            </div>
            <div className="sub-container">
                <MainCard 
                    title="물품 대여"
                    description='물품을 대여할 수 있어요'
                    backgroundColor='var(--card-background-gray)'
                    titleColor='black'
                    descriptionColor='var(--sub-text-gray)'
                    icon='bag-check'
                    iconColor='var(--sub-text-gray)'
                    iconOverlayColor='#d5d9e0'
                />
                <MainCard 
                    title="물품 반납"
                    description='물품을 반납할 수 있어요'
                    backgroundColor='var(--card-background-gray)'
                    titleColor='black'
                    descriptionColor='var(--sub-text-gray)'
                    icon='bag-remove'
                    iconColor='var(--sub-text-gray)'
                    iconOverlayColor='#d5d9e0'
                    />
            </div>
            <MainCard
                title='대여 정보'
                description='대여 정보를 확인할 수 있어요'
                backgroundColor='#b4bfb6'
                titleColor='white'
                descriptionColor='white'
                icon='library'
                iconColor='#727c74'
                iconBackgroundColor='#9DB0A3'
                iconOverlayColor='#9DB0A3'/>
                
        </div>
    );
};

export default Main;