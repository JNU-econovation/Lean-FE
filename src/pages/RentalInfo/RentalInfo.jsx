import '../../styles/Style.css'
import './RentalInfo.css'
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';

const RentalInfo = () => {
    const tempRentalList = [
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            expirationDate : "초과"}, 
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            expirationDate : "초과"},
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            expirationDate : "초과"},
        ]

    return (
        <div id="rent-info-container">
            <Navbar title="대여 정보 확인" onBackClick={() => window.history.back()} />
            <Navtab />
            {tempRentalList.map((rental, index) => (
                <ItemRentalStateCard
                    key={index}
                    studentCouncil={rental.studentCouncil} 
                    rentalStatus={rental.rentalStatus}
                    item={rental.item}
                    expirationDate = {rental.expirationDate}/>
            ))}
            
        </div>
    );
};

export default RentalInfo;