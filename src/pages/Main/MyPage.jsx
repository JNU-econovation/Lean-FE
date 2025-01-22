import { useEffect, useState, useContext } from "react";
import style from "./MyPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import apiClient from "../../services/apiClient";
import { formatDate } from "../../hooks/dateFormatChange";
import { UserContext } from "../../hooks/userContext";
// 전화번호 포맷 함수
const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    department: "",
    phoneNumber: "",
  });
  const [rentalList, setRentalList] = useState([]); // 대여 목록
  const currentUser = useContext(UserContext);
  
  // 사용자 정보 및 대여 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 첫 번째 API 호출: 사용자 정보 가져오기
        const userResponse = await apiClient.get(`/api/v1/users/${currentUser.user_id}`);
        const { name, phoneNumber, department } = userResponse.data;
        setUserInfo({
            name,
            phoneNumber: formatPhoneNumber(phoneNumber), // 전화번호 포맷 적용
            department,
          });

        // 두 번째 API 호출: 대여 목록 가져오기
        const rentalResponse = await apiClient.get(
          `/api/v1/rentals/${currentUser.user_id}`
        );
        const filteredRentalList = [];

        for (const rental of rentalResponse.data) {
          if (
            ["대여중", "처리중", "반납"].includes(rental.rental_status)
          ) {
            // 세 번째 API 호출: 대여 상세 정보 가져오기
            const rentalDetailResponse = await apiClient.get(
              `/api/v1/rentals/details/${rental.rental_id}`
            );
            const { rentalStartDate, itemName } = rentalDetailResponse.data;

            filteredRentalList.push({
              date: formatDate(rentalStartDate) || "날짜 없음", // rentalStartDate가 없으면 "날짜 없음" 표시
              item: itemName,
              rental_date: "1", 
            });
          }
        }
        setRentalList(filteredRentalList);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserData();
  }, [currentUser.user_id]);

  return (
    <div className={`pageContainer ${style.container}`}>
      <Navbar onBackClick={() => window.history.back()} />
      {/* 프로필 정보 */}
      <div className={`card ${style.profileInfo}`}>
        <div className={style.profileIcon}></div>
        <h3 className={style.name}>{userInfo.name || "사용자 이름"}</h3>
        <h5 className={style.department}>
          {userInfo.department || "소속 정보 없음"}
        </h5>
        <h5 className={style.phoneNumber}>
          {userInfo.phoneNumber || "전화번호 없음"}
        </h5>
        <div className={`${style.profileEdit} card`}>
          <p>프로필 수정</p>
        </div>
      </div>
      {/* 대여 정보 */}
      <div className={`card ${style.rentalInfo}`}>
        <h3 className={style.rentalInfo}>대여 정보</h3>
        {rentalList.length > 0 ? (
          rentalList.map((rental, index) => (
            <div key={index} className={style.rentalInfoBox}>
              <div className={style.textBox}>
                <h5 className={style.date}>{rental.date}</h5>
                <h5 className={style.item}>{rental.item}</h5>
                <h5 className={style.rentalDate}>
                  {rental.rental_date}일간 대여
                </h5>
              </div>
              {index < rentalList.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p className={style.noRentals}>대여 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;