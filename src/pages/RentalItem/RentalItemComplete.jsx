import style from './RentalItemComplete.module.css';
import Button from '../../components/Button/Button';

const RentalItemComplete = () => {
    return (
        <div className="centerContainer">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p className={style.infoText}>예약 완료</p>
            <p className={style.infoTextGray}>예약이 성공적으로 완료되었어요</p>
            <Button text="메인으로" type="button" className={`fixWidth ${style.mainButton}`} link='/main'/>
        </div>
    )
};

export default RentalItemComplete;