import PropTypes from 'prop-types';
import style from './RentalStatusBadge.module.css';
import RENTAL_STATUS from '../../constants/rentalStatus';

const RentalStatusBadge = ({rentalStatus}) => {
    const statusInfo = RENTAL_STATUS[rentalStatus];

    if (!statusInfo) {
        return <div className={style.rentalState}>Invalid Status</div>; // 유효하지 않은 상태 처리
    }

    return (
        <div className={style.rentalState} style={{backgroundColor: statusInfo.color}}>{statusInfo.label}</div>
    )
}

RentalStatusBadge.propTypes = {
    rentalStatus: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};

export default RentalStatusBadge;