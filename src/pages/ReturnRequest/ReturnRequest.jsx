import style from './ReturnRequest.module.css';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';
import Button from '../../components/Button/Button';
import { USER_ID } from '../../constants/userId';
import apiClient from '../../services/apiClient';
import { formatDDay } from '../../hooks/dateFormatChange';

const ReturnRequest = () => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [rentalList, setRentalList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('전체');
    const navigate = useNavigate();
    const tabs = ['전체', '만료', '대여중'];
        
        // 데이터 가져오기
        useEffect(() => {
            const fetchRentalList = async () => {
                try {
                    const response = await apiClient.get(`/api/v1/rentals/${USER_ID.USER}`);
                    setRentalList(response.data);
                } catch (error) {
                    console.error("Failed to fetch rental list:", error);
                }
            };
    
            fetchRentalList();
        }, []);

        // Status 처리 
        const handleExpirationDate = (status, expiration) => {
            switch (status) {
                case '대여중':
                    return formatDDay(expiration);
                case '반납':
                    return '반납';
                case '대기중':
                    return '승인 대기중';
                case '만료':
                    return '초과';
                default:
                    return '';
            }
        };

        // 필터링
        const filteredRentalList = rentalList.filter((rental) => {
            if (selectedTab === '전체') {
                return true;
            }
            return rental.rental_status === selectedTab;
        });

        // 버튼 활성화 확인
        const checkInputs = useCallback(() => {
            const allSelectedAreRentals = selectedCards.every((id) => {
                const rental = rentalList.find((rental) => rental.rental_id === id);
                return rental?.rental_status === '대여중';
            });
            setIsButtonDisabled(selectedCards.length === 0 || !allSelectedAreRentals);
        }, [selectedCards, rentalList]);
    
        useEffect(() => {
            checkInputs();
        }, [selectedCards, checkInputs]);

        // 카드 클릭시 선택/해제
        const handleClickCard = (id) => {
            setSelectedCards((prev) => {
                if (prev.includes(id)) {
                    return prev.filter(cardId => cardId !== id);
                } else {
                    return [...prev, id];
                }
            });
        };

        // 반납 버튼 클릭 핸들러
        const handleReturn = async () => {
            if (!isButtonDisabled) {
                try {
                    await Promise.all(
                        selectedCards.map((rental_id) =>
                            apiClient.put(`/api/v1/rentals/details/${rental_id}`)
                        )
                    );
                    navigate('/rent/return/complete');
                } catch (error) {
                    console.error('Failed to send return request:', error);
                }
            }
        };
    
    return(
        <div className={style.container}>
            <Navbar title={"반납 신청"} onBackClick={() => window.history.back()}/>
            <Navtab tabs={tabs} onSelect={(tab) => setSelectedTab(tab)}/>
            {filteredRentalList.map((rental) => {
                const isCardSelected = selectedCards.includes(rental.rental_id);
                return (
                <ItemRentalStateCard
                    key={rental.rental_id}
                    name={rental.student_council_name} 
                    rentalStatus={rental.rental_status}
                    item={rental.item_name}
                    expirationDate={handleExpirationDate(rental.rental_status, rental.rental_date_expiration)}
                    onClick = {() => {
                        handleClickCard(rental.rental_id)}
                        }
                    isSelected={`${isCardSelected ? 'selected': ''}`}
                    />
                )
            })}
            <div className={style.buttonBox}>
                <Button
                        text="반납하기"
                        onClick={()=>handleReturn()}
                        className={`fixWidth ${style.returnButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                        />
            </div>
        </div>
    )
};

export default ReturnRequest;