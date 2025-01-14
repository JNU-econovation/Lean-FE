import style from './ReservationInfo.module.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';

const ReservationInfo = () => {
    const navigate = useNavigate();
    const tabs = ['전체', '예약', '대여', '반납', '만료'];
    const tempRentalList = [
        {   user : "카리나",
            rentalStatus : "EXPIRED",
            item : "우산(대)",
            expirationDate : "초과"}, 
        {   user : "안유진",
            rentalStatus : "RESERVED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   user : "윈터",
            rentalStatus : "RENTED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   user : "장원영",
            rentalStatus : "RETURNED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   user : "설윤",
            rentalStatus : "EXPIRED",
            item : "우산(대)",
            expirationDate : "초과"},
        ]

    return (
        <div className={style.container}>
            <Navbar title="예약 내역 확인" onBackClick={() => window.history.back()} />
            <Navtab tabs={tabs}/>
            {tempRentalList.map((rental, index) => (
                <ItemRentalStateCard
                    key={index}
                    name={rental.user} 
                    rentalStatus={rental.rentalStatus}
                    item={rental.item}
                    expirationDate = {rental.expirationDate}
                    onClick = {() => navigate('/reservation/info/detail')}/>
            ))}
            
        </div>
    );
};

export default ReservationInfo;