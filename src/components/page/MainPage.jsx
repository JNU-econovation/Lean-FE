import { useEffect, useState } from 'react';
import MainCard from '../Card/MainCard';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiClient from '../../services/apiClient';
import style from './MainPage.module.css';
import { formatDDay } from '../../hooks/dateFormatChange';

const MainPage = ({userId}) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [isStudentCouncil, setIsStudentCouncil] = useState(false);
  const [requestsCount, setRequestsCount] = useState(0); 
  const [rentalStatus, setRentalStatus] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);

  // 오늘 날짜 동적으로 계산
  const today = new Date();
  const year = today.getFullYear(); 
  const month = today.getMonth() + 1; 
  const day = today.getDate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(userId)
        // 사용자 정보 API 호출
        const response = await apiClient.get(`api/v1/users/${userId}`);
        const { name, isStudentCouncil, studentCouncilId } = response.data;

        setUserName(name);
        setIsStudentCouncil(isStudentCouncil);

        // 학생회 여부에 따라 대기중/처리중 요청 카운트
        if (isStudentCouncil) {
          await fetchRentalRequests(studentCouncilId);
        } else {
          await fetchRentalData(userId)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchRentalRequests = async (studentCouncilId) => {
      try {
        // 학생회 요청 데이터 API 호출
        const response = await apiClient.get(
          `api/v1/rentals/student_council/${studentCouncilId}`
        );

        // "대기중" 또는 "처리중" 상태만 필터링
        const filteredRequests = response.data.filter((request) =>
          ["대기중", "처리중"].includes(request.rentalStatus)
        );

        // 필터링된 요청 개수 설정
        setRequestsCount(filteredRequests.length);
      } catch (error) {
        console.error("Failed to fetch rental requests:", error);
        setRequestsCount(0); // 실패 시 0으로 설정
      }
    };

    const fetchRentalData = async (userId) => {
      try {
        const response = await apiClient.get(
          `api/v1/rentals/${userId}`
        );

        const expiredRequests = response.data.filter(
          (request) => request.rental_status === "만료"
        );

        const rentingRequests = response.data
          .filter((request) => request.rental_status === "대여중")
          .sort((a, b) => new Date(a.rental_date_expiration) - new Date(b.rental_date_expiration));

        if (expiredRequests.length > 0) {
          setRentalStatus('expired');
        } else if (rentingRequests.length > 0) {
          setRentalStatus('rental');
          setExpirationDate(rentingRequests[0].rental_date_expiration);
        }else {
          setRentalStatus('reservable');
        }
      } catch (error) {
        console.error("Failed to fetch rental requests:", error);
      }
    };
    fetchUserData();
  }, [userId, rentalStatus, expirationDate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/signin');
  };

  const cardBackgroundColor = (() => {
    switch (rentalStatus) {
      case "expired":
        return "#ec8886";
      case "rental":
        return "#72a8f8";
      case "reservable":
      default:
        return "#6EBA8B";
    }
  })();

  const displayText = (() => {
    switch (rentalStatus) {
      case "expired":
        return "기한초과";
      case "rental":
        return expirationDate
          ? `${formatDDay(expirationDate)}`
          : "만료일 없음";
      case "reservable":
      default:
        return "대여 가능";
    }
  })();

  return (
    <div className={style.container}>
      {/* 프로필 카드 */}
      <div className={style.profileCard}>
        <div className={style.profileCardBox}>
          <div className={`circle ${style.profileImage}`} onClick={handleLogout} style={{cursor: 'pointer'}}>
            <ion-icon name="person"></ion-icon>
          </div>
          <span>{userName + '님'}</span>
          {
            !isStudentCouncil?
            <div
            className={style.backButtonBox}
            onClick={() => navigate('/mypage')}
          >
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
          : ''
          }
          
        </div>
        <div className={style.profileTextBox}>
          <span>오늘 대운동장에서 피크닉 어때요?</span>
        </div>
      </div>

      {/* 날짜 및 요청/반납 상태 카드 */}
      {isStudentCouncil ? (
        <div className={style.dateCard} style={{ background: cardBackgroundColor }}>
          <p className={style.dateText}>{`${year}년 ${month}월 ${day}일`}</p>
          <p className={style.untilText}>들어온 요청</p>
          <p className={style.dDayText}>
            {requestsCount !== null ? `${requestsCount}건 존재` : ''}
          </p>
        </div>
      ) : (
        <div className={style.dateCard} style={{ background: cardBackgroundColor }}>
          <p className={style.dateText}>{`${year}년 ${month}월 ${day}일`}</p>
          <p className={style.untilText}>{rentalStatus === 'rental' ? '반납까지' : '서비스 이용'}</p>
          <p className={style.dDayText}>{displayText}</p>
        </div>
      )}

      {/* 카드 섹션 */}
      <div className={style.itemCardBox}>
        <MainCard
          title={isStudentCouncil ? '물품 관리' : '물품 대여'}
          description={
            isStudentCouncil
              ? '물품을 관리할 수 있어요'
              : '물품을 대여할 수 있어요'
          }
          backgroundColor="var(--card-background-gray)"
          titleColor="black"
          descriptionColor="var(--sub-text-gray)"
          icon="bag-check"
          iconColor="var(--sub-text-gray)"
          iconOverlayColor="#d5d9e0"
          onClick={
            isStudentCouncil
              ? () => navigate('/manage/item')
              : () => navigate('/rent')
          }
        />
        <MainCard
          title={isStudentCouncil ? '대여 및 반납 관리' : '반납 신청'}
          description={
            isStudentCouncil
              ? '대여와 반납을 간편하게'
              : '물품을 반납할 수 있어요'
          }
          backgroundColor="var(--card-background-gray)"
          titleColor="black"
          descriptionColor="var(--sub-text-gray)"
          icon="bag-remove"
          iconColor="var(--sub-text-gray)"
          iconOverlayColor="#d5d9e0"
          onClick={
            isStudentCouncil
              ? () => navigate('/reservation/info')
              : () => navigate('/rent/return')
          }
        />
      </div>
      <MainCard
        title={isStudentCouncil ? '학생 유저 승인' : '대여 정보'}
        description={
          isStudentCouncil
            ? '학생 유저의 회원가입을 승인할 수 있어요'
            : '대여 정보를 확인할 수 있어요'
        }
        backgroundColor="#b4bfb6"
        titleColor="white"
        descriptionColor="white"
        icon="library"
        iconColor="#727c74"
        iconBackgroundColor="#9DB0A3"
        iconOverlayColor="#9DB0A3"
        onClick={
          isStudentCouncil ? () => {} : () => navigate('/rent/info')
        }
      />
    </div>
  );
};

MainPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default MainPage;