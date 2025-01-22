import style from './ReservationInfoDetail.module.css'
import Navbar from '../../components/Navbar/Navbar';
import ItemInfoBox from '../../components/Box/ItemInfoBox';
import RentalInfoBox from '../../components/Box/RentalInfoBox';
import StudentInfoBox from '../../components/Box/StudentInfoBox';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import { useSearchParams } from 'react-router-dom';

const ReservationInfoDetail = () => {
    const [searchParams] = useSearchParams();
    const [rentalId, setRentalId] = useState()
    const [rentalInfo, setRentalInfo] = useState({
        studentCouncilName: '',
        itemName: '',
        rentalStatus: '',
    });

    useEffect(() => {
        const id = searchParams.get('id')
        setRentalId(id)
        const fetchRentalData = async () => {
            try {
                const rentalResponse = await apiClient.get(`/api/v1/rentals/details/${id}`);
                setRentalInfo(rentalResponse.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchRentalData();
        }, [rentalId, searchParams]);

    return (
        <div className={style.container}>
            <Navbar title="세부 정보 확인" onBackClick={() => window.history.back()} home={true} shadow={true}/>
            <ItemInfoBox
                studentCouncil = {rentalInfo.studentCouncilName}
                item = {rentalInfo.itemName}
                rentalStatus = {rentalInfo.rentalStatus}/>
            <hr/>
            <RentalInfoBox 
                rentalInfo={rentalInfo}
                isStudentCouncil={true}
                rentalId={rentalId}/>
            <hr/>
            <p className={style.infoText}>학생 정보</p>
            <StudentInfoBox
                studentInfo={rentalInfo}/>
        </div>
    );
};

export default ReservationInfoDetail;