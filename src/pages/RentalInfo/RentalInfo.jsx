import '../../styles/Style.css'
import style from './RentalInfo.module.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';

const RentalInfo = () => {
    const navigate = useNavigate();
    const tabs = ['전체', '예약', '대여', '반납', '만료'];
    const tempRentalList = [
        {   studentCouncil : "HEYDAY",
            rentalStatus : "EXPIRED",
            item : "우산(대)",
            expirationDate : "초과"}, 
        {   studentCouncil : "HEYDAY",
            rentalStatus : "RENTED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "RETURNED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "RESERVED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "EXPIRED",
            item : "우산(대)",
            expirationDate : "초과"},
        ]

    return (
        <div className={style.container}>
            <Navbar title="대여 정보 확인" onBackClick={() => window.history.back()} />
            <Navtab tabs={tabs}/>
            {tempRentalList.map((rental, index) => (
                <ItemRentalStateCard
                    key={index}
                    name={rental.studentCouncil} 
                    rentalStatus={rental.rentalStatus}
                    item={rental.item}
                    expirationDate = {rental.expirationDate}
                    onClick = {() => navigate('/rent/info/detail')}/>
            ))}
            
        </div>
    );
};

export default RentalInfo;