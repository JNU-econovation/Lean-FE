import PropTypes from 'prop-types';
import style from './RentalStatusBadge.module.css';

const RentalStatusBadge = ({rentalStatus, backgroundColor}) => {
    return (
        <div className={style.rentalState} style={{backgroundColor: backgroundColor}}>{rentalStatus}</div>
    )
}

RentalStatusBadge.propTypes = {
    rentalStatus: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};

export default RentalStatusBadge;