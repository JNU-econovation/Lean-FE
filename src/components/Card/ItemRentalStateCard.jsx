import style from './ItemRentalStateCard.module.css';
import Badge from '../Badge/RentalStatusBadge';
import PropTypes from 'prop-types';

const ItemRentalStateCard = ({studentCouncil, rentalStatus, item, expirationDate, onClick, isSelected}) => {
    return (
        <div className={`card ${style.rentalStateCard} ${isSelected ? style.selected : ''}`} onClick={onClick}>
            <div className={style.headBox}>
                <span>{studentCouncil}</span>
                <Badge rentalStatus={rentalStatus} backgroundColor={'#ec8886'}/>
            </div>
            <div className={style.bodyBox}>
                <div className={`circle ${style.itemIcon}`}>

                </div>
                <div className={style.textBox}>
                    <p className={style.itemName}>{item}</p>
                    <p className={style.description}>물품</p>
                </div>
                <div className={style.textBox}>
                    <p className={style.rentalStatus}>{expirationDate}</p>
                    <p className={style.description}>반납기한</p>
                </div>
            </div>
        </div>
    );
};

ItemRentalStateCard.propTypes = {
    studentCouncil: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    rentalStatus: PropTypes.string.isRequired,
    expirationDate : PropTypes.string.isRequired,
    onClick : PropTypes.func,
    isSelected: PropTypes.string,
};

export default ItemRentalStateCard;
