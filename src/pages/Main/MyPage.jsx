import style from './MyPage.module.css';
import Navbar from '../../components/Navbar/Navbar';

const MyPage = () => {
    const tempRentalList = [
        {   date : "2024년 1월 12일",
            item : "우산(대)",
            rental_date : "3"}, 
        {   date : "2024년 1월 11일",
            item : "돗자리(소)",
            rental_date : "5"},
        {   date : "2024년 1월 5일",
            item : "보조배터리",
            rental_date : "2"}]

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar onBackClick={() => window.history.back()} />
            <div className={`card ${style.profileInfo}`}>
                <div className={style.profileIcon}></div>
                <h3 className={style.name}>이현호님</h3>
                <h5 className={style.department}>치의학대학원</h5>
                <h5 className={style.phoneNumber}>010-7160-8490</h5>
                <div className={`${style.profileEdit} card`}>
                    <p>프로필 수정</p>
                </div>
            </div>
            <div className={`card ${style.rentalInfo}`}>
                <h3 className={style.rentalInfo}>대여 정보</h3>
                {tempRentalList.map((rental, index) => (
                    <div key={index} className={style.rentalInfoBox}>
                        <div className={style.textBox}>
                            <h5 className={style.date}>{rental.date}</h5>
                            <h5 className={style.item}>{rental.item}</h5>
                            <h5 className={style.rentalDate}>{rental.rental_date}일간 대여</h5>
                        </div>
                        {index < tempRentalList.length - 1 && <hr />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPage;