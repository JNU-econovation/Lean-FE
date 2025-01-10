import style from './RentalInfoBox.module.css';
import PropTypes from 'prop-types';

const RentalInfoBox = ({rentalInfo, page}) => {
    if (page === 'info-detail') {
        return (
            <div className={style.container}>
                <div>
                    <p className={style.info}>대여 일자</p>
                    <p className={style.value}>{rentalInfo.rentalDate}</p>
                </div>
                <div>
                    <p className={style.info}>만료 일자</p>
                    <p className={style.value}>{rentalInfo.expirationDate}</p>
                </div>
                <div>
                    <p className={style.info}>반납 장소</p>
                    <p className={style.value}>{rentalInfo.returnAddress}</p>
                </div>
                <div>
                    <p className={style.info}>대여 물품</p>
                    <p className={style.value}>{rentalInfo.rentalItem}</p>
                </div>
                <div>
                    <p className={style.info}>초과 일자</p>
                    <p className={`${style.value} ${style.expirationDate}`}>{rentalInfo.overdueDuration}</p>
                </div>
            </div>
        )
    }
    
};

RentalInfoBox.propTypes = {
    rentalInfo: PropTypes.array.isRequired,
    page: PropTypes.string.isRequired,
};

export default RentalInfoBox;