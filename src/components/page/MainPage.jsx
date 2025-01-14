import style from './MainPage.module.css';
import MainCard from '../Card/MainCard';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainPage = ({name, isStudentCouncil}) => {
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <div className={style.profileCard}>
                <div className={style.profileCardBox}>
                    <div className={`circle ${style.profileImage}`}>
                        <ion-icon name="person"></ion-icon>
                    </div>
                    <span>{name}</span>
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
            {
                isStudentCouncil?(
                    <div className={style.dateCard}>
                        <p className={style.dateText}>2024년 11월 27일</p>
                        <p className={style.untilText}>들어온 요청</p>
                        <p className={style.dDayText}>3건 존재</p>
                    </div>
                ):(
                    <div className={style.dateCard}>
                        <p className={style.dateText}>2024년 11월 27일</p>
                        <p className={style.untilText}>반납기한까지</p>
                        <p className={style.dDayText}>1DAY 2H</p>
                    </div>
                )
            }
            
            <div className={style.itemCardBox}>
                <MainCard 
                    title={isStudentCouncil?"물품 관리":"물품 대여"}
                    description={isStudentCouncil?"물품을 관리할 수 있어요":"물품을 대여할 수 있어요"}
                    backgroundColor='var(--card-background-gray)'
                    titleColor='black'
                    descriptionColor='var(--sub-text-gray)'
                    icon='bag-check'
                    iconColor='var(--sub-text-gray)'
                    iconOverlayColor='#d5d9e0'
                    onClick={isStudentCouncil?() => navigate('/manage/item'):() => navigate('/rent')}
                />
                <MainCard 
                    title={isStudentCouncil?"대여 및 반납 관리":"반납 신청"}
                    description={isStudentCouncil?"대여와 반납을 간편하게":"물품을 반납할 수 있어요"}
                    backgroundColor='var(--card-background-gray)'
                    titleColor='black'
                    descriptionColor='var(--sub-text-gray)'
                    icon='bag-remove'
                    iconColor='var(--sub-text-gray)'
                    iconOverlayColor='#d5d9e0'
                    onClick={isStudentCouncil?() => navigate('/reservation/info'):() => navigate('/rent/return')}
                    />
            </div>
            <MainCard
                title={isStudentCouncil?"학생 유저 승인":'대여 정보'}
                description={isStudentCouncil?"학생 유저의 회원가입을 승인할 수 있어요":'대여 정보를 확인할 수 있어요'}
                backgroundColor='#b4bfb6'
                titleColor='white'
                descriptionColor='white'
                icon='library'
                iconColor='#727c74'
                iconBackgroundColor='#9DB0A3'
                iconOverlayColor='#9DB0A3'
                onClick={isStudentCouncil?() => {}:() => navigate('/rent/info')}/>
                
        </div>
    );
};

MainPage.propTypes = {
    name: PropTypes.string.isRequired,
    isStudentCouncil: PropTypes.bool.isRequired,
};

export default MainPage;