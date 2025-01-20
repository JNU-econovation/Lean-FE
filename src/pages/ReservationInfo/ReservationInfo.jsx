import style from './ReservationInfo.module.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import RENTAL_STATUS from '../../constants/rentalStatus';
import { USER_ID } from '../../constants/userId';
import { formatDDay } from '../../hooks/dateFormatChange';

const ReservationInfo = () => {
    const navigate = useNavigate();
    const tabs = ['전체',...Object.values(RENTAL_STATUS).map(status => status.label)];
    const [rentalList, setRentalList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('전체')

    useEffect(() => {
        const fetchRentalData = async () => {
            try {
                const response = await apiClient.get(`api/v1/users/${USER_ID.ADMIN}`);
                const { studentCouncilId } = response.data;
                const rentalResponse = await apiClient.get(`/api/v1/rentals/student_council/${studentCouncilId}`);
                setRentalList(rentalResponse.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchRentalData();
        }, []);

    const handleExpirationDate = (status, expiration) => {
        switch(status) {
            case '대여중' :
                return formatDDay(expiration);
            case '처리중' :
                return formatDDay(expiration);
            case '반납' :
                return '반납'
            case '대기중' :
                return '승인 대기중'
            case '만료' :
                return '초과'
        }
    }

    const filteredRentalList = rentalList.filter((rental) => {
        if (selectedTab === '전체') {
            return true;
        }
        return rental.rentalStatus === selectedTab;
    }).reverse();

    return (
        <div className={style.container}>
            <Navbar title="예약 내역 확인" onBackClick={() => window.history.back()} />
            <Navtab tabs={tabs} onSelect={(tab) => setSelectedTab(tab)}/>
            {filteredRentalList.map((rental) => (
                <ItemRentalStateCard
                    key={rental.rentalId}
                    name={rental.userName} 
                    rentalStatus={rental.rentalStatus}
                    item={rental.itemName}
                    expirationDate = {handleExpirationDate(rental.rentalStatus, rental.expirationTime)}
                    onClick = {() => navigate(`/reservation/info/detail?id=${rental.rentalId}`)}/>
            ))}
            
        </div>
    );
};

export default ReservationInfo;