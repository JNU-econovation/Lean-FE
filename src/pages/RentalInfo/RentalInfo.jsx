import '../../styles/Style.css'
import style from './RentalInfo.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';
import apiClient from '../../services/apiClient';
import {USER_ID} from "../../constants/userId";
import RENTAL_STATUS from '../../constants/rentalStatus';
import { formatTimeDifference } from '../../hooks/dateFormatChange';

const RentalInfo = () => {
    const navigate = useNavigate();
    const tabs = ['전체',...Object.values(RENTAL_STATUS).map(status => status.label)];
    const [rentalList, setRentalList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('전체')

    useEffect(() => {
        const fetchStudentCouncilData = async () => {
            try {
                const rentalResponse = await apiClient.get(`/api/v1/rentals/${USER_ID.USER}`);
                setRentalList(rentalResponse.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchStudentCouncilData();
        }, []);

    const handleExpirationDate = (status, expiration) => {
        switch(status) {
            case '대여중' :
                return formatTimeDifference(expiration);
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
    });

    return (
        <div className={style.container}>
            <Navbar title="대여 정보 확인" onBackClick={() => window.history.back()} />
            <Navtab tabs={tabs} onSelect={(tab) => setSelectedTab(tab)}/>
            {filteredRentalList.map((rental, index) => (
                <ItemRentalStateCard
                    key={index}
                    name={rental.student_council_name} 
                    rentalStatus={rental.rental_status}
                    item={rental.item_name}
                    onClick = {() => navigate('/rent/info/detail')}
                    expirationDate = {handleExpirationDate(rental.rental_status, rental.rental_date_expiration)}
                    />
            ))}
            
        </div>
    );
};

export default RentalInfo;