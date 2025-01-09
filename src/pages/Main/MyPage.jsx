import './MyPage.css';
import '../../styles/Style.css'
import Navigation from '../../components/Navigation/Navigation';

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
        <div className="page-container">
            <Navigation onBackClick={() => window.history.back()} />
            <div className="card profile-info">
                <div id="profile-icon"></div>
                <h3 id='name'>이현호님</h3>
                <h5 id='department'>치의학대학원</h5>
                <h5 id='phone-number'>010-7160-8490</h5>
                <div className="profile-edit card">
                    <p id="profile-edit">프로필 수정</p>
                </div>
            </div>
            <div className="card rental-info">
                <h3 id='rental-info'>대여 정보</h3>
                {tempRentalList.map((rental, index) => (
                    <div key={index} id="rental-info-container">
                        <div id="text-container">
                            <h5 id='date'>{rental.date}</h5>
                            <h5 id='item'>{rental.item}</h5>
                            <h5 id='rental-date'>{rental.rental_date}일간 대여</h5>
                        </div>
                        {index < tempRentalList.length - 1 && <hr />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPage;