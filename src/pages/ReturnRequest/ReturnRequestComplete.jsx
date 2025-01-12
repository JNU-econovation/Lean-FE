import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';
import style from './ReturnRequestComplete.module.css';

const RentalRequestComplete = () => {
    return (
        <div className="centerContainer">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p className={style.infoText}>반납 신청 완료</p>
            <p className={style.infoTextGray}>반납 신청이 성공적으로 완료되었어요</p>
            <Button text="메인으로" type="button" className={`fixWidth ${style.mainButton}`} link='/main'/>
        </div>
    );
};

RentalRequestComplete.propTypes = {
    navigate: PropTypes.func
};

export default RentalRequestComplete;
