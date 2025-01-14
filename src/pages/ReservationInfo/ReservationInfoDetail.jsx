import style from './ReservationInfoDetail.module.css'
import Navbar from '../../components/Navbar/Navbar';
import ItemInfoBox from '../../components/Box/ItemInfoBox';
import RentalInfoBox from '../../components/Box/RentalInfoBox';
import StudentInfoBox from '../../components/Box/StudentInfoBox';

const ReservationInfoDetail = () => {
    const tempRentalInfo = 
        {   studentCouncil : "카리나",
            rentalStatus : "EXPIRED",
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

    const studentInfo = 
        {   phoneNumber: "010-1234-5678", 
            college: "공과대학",
            department: "컴퓨터정보통신공학과" };

    return (
        <div className={style.container}>
            <Navbar title="세부 정보 확인" onBackClick={() => window.history.back()} home={true} shadow={true} isStudentCouncil={true}/>
            <ItemInfoBox
                studentCouncil = {tempRentalInfo.studentCouncil}
                item = {tempRentalInfo.item}
                rentalStatus = {tempRentalInfo.rentalStatus}/>
            <hr/>
            <RentalInfoBox 
                rentalInfo={rentalInfo}
                isStudentCouncil={true}/>
            <hr/>
            <p className={style.infoText}>학생 정보</p>
            <StudentInfoBox
                studentInfo={studentInfo}/>
        </div>
    );
};

export default ReservationInfoDetail;