import '../../styles/Style.css'
import style from './RentalInfo.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';
import apiClient from '../../services/apiClient';
import RENTAL_STATUS from '../../constants/rentalStatus';
import { formatDDay } from '../../hooks/dateFormatChange';
import { UserContext } from '../../hooks/userContext';

const RentalInfo = () => {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const tabs = ['전체',...Object.values(RENTAL_STATUS).map(status => status.label)];
    const [rentalList, setRentalList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('전체')

    useEffect(() => {
        const fetchRentalData = async () => {
            try {
                const rentalResponse = await apiClient.get(`/api/v1/rentals/${currentUser.user_id}`);
                setRentalList(rentalResponse.data);
                console.log(rentalResponse.data)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchRentalData();
        }, [currentUser.user_id]);

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
        return rental.rental_status === selectedTab;
    }).reverse();

    return (
        <div className={style.container}>
            <Navbar title="대여 정보 확인" onBackClick={() => window.history.back()} />
            <Navtab tabs={tabs} onSelect={(tab) => setSelectedTab(tab)}/>
            {filteredRentalList.map((rental) => (
                <ItemRentalStateCard
                    key={rental.rental_id}
                    name={rental.student_council_name} 
                    rentalStatus={rental.rental_status}
                    item={rental.item_name}
                    onClick = {() => navigate(`/rent/info/detail?id=${rental.rental_id}`)}
                    expirationDate = {handleExpirationDate(rental.rental_status, rental.rental_date_expiration)}
                    />
            ))}
            
        </div>
    );
};

export default RentalInfo;