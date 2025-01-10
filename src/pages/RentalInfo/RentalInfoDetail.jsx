import style from './RentalInfoDetail.module.css'
import Navbar from '../../components/Navbar/Navbar';
import ItemInfoBox from '../../components/Box/ItemInfoBox';
import RentalInfoBox from '../../components/Box/RentalInfoBox';

const RentalInfoDetail = () => {
    const tempRentalInfo = 
        {   studentCouncil : "HEYDAY",
            rentalStatus : "만료",
            item : "우산(대)",
            rentalDate : "2025/01/12",
            expirationDate : "2025/01/15",
            returnAddress : "제1학생회관",
            expirationStatus : "3D 2H 초과" };
    
    const rentalInfo = 
        {   rentalDate: "2025/01/12", 
            expirationDate: "2025/01/15", 
            returnAddress: "제1학생회관",
            rentalItem : "우산(소)",
            overdueDuration: "3D 2H 초과" };

    return (
        <div className={style.container}>
            <Navbar title="세부 정보 확인" onBackClick={() => window.history.back()} home={true} />
            <ItemInfoBox
                studentCouncil = {tempRentalInfo.studentCouncil}
                item = {tempRentalInfo.item}
                rentalStatus = {tempRentalInfo.rentalStatus}/>
            <hr/>
            <RentalInfoBox 
                rentalInfo={rentalInfo}
                page='info-detail'/>
        </div>
    );
};

export default RentalInfoDetail;