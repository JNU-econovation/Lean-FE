import style from './Main.module.css';
import MainCard from '../../components/Card/MainCard';
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <div className={style.profileCard}>
                <div className={style.profileCardBox}>
                    <div className={`circle ${style.profileImage}`}>
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <span>이현호님</span>
                    <div 
                        className={style.backButtonBox}
                        onClick={() => navigate('/mypage')}>
                        <ion-icon name="chevron-forward"></ion-icon>
                    </div>
                </div>
                <div className={style.profileTextBox}>
                    <span>오늘 대운동장에서 피크닉 어때요?</span>
                </div>
            </div>
            <div className={style.dateCard}>
                <p className={style.dateText}>2024년 11월 27일</p>
                <p className={style.untilText}>반납기한까지</p>
                <p className={style.dDayText}>1DAY 2H</p>
            </div>
            <div className={style.itemCardBox}>
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
                    onClick={() => navigate('/rent/return')}
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
                iconOverlayColor='#9DB0A3'
                onClick={() => navigate('/rent/info')}/>
                
        </div>
    );
};

export default Main;