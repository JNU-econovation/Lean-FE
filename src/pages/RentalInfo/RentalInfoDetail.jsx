import style from './RentalInfoDetail.module.css'
import Navbar from '../../components/Navbar/Navbar';
import ItemInfoBox from '../../components/Box/ItemInfoBox';
import RentalInfoBox from '../../components/Box/RentalInfoBox';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import { useSearchParams } from 'react-router-dom';

const RentalInfoDetail = () => {
    const [searchParams] = useSearchParams();
    const [rentalInfo, setRentalInfo] = useState({
        studentCouncilName: '',
        itemName: '',
        rentalStatus: '',
    });

    useEffect(() => {
        const rentalId = searchParams.get('id');
        const fetchRentalData = async () => {
            try {
                const rentalResponse = await apiClient.get(`/api/v1/rentals/details/${rentalId}`);
                setRentalInfo(rentalResponse.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchRentalData();
        }, [searchParams]);


    return (
        <div className={style.container}>
            <Navbar title="세부 정보 확인" onBackClick={() => window.history.back()} home={true} shadow={true} />
            <ItemInfoBox
                studentCouncil = {rentalInfo.studentCouncilName}
                item = {rentalInfo.itemName}
                rentalStatus = {rentalInfo.rentalStatus}/>
            <hr/>
            <RentalInfoBox 
                rentalInfo={rentalInfo}
                isStudentCouncil={false}/>
        </div>
    );
};

export default RentalInfoDetail;