import style from './ItemRentalStateCard.module.css';
import Badge from '../Badge/RentalStatusBadge';
import PropTypes from 'prop-types';
import RENTAL_STATUS from '../../constants/rentalStatus';
import ImageBox from '../ImageBox/ImageBox';

const ItemRentalStateCard = ({name, rentalStatus, item, expirationDate, onClick, isSelected}) => {
    const statusInfo = RENTAL_STATUS[rentalStatus];
    return (
        <div className={`card selectCardContainer ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <div className={style.headBox}>
                <span>{name}</span>
                <Badge rentalStatus={rentalStatus}/>
            </div>
            <div className={style.bodyBox}>
                <div className={`circle ${style.itemIcon}`}>
                    <ImageBox item={item}/>
                </div>
                <div className={style.textBox}>
                    <p className={style.itemName}>{item}</p>
                    <p className={style.description}>물품</p>
                </div>
                <div className={style.textBox}>
                    <p className={style.rentalStatus} style={{color: statusInfo.color}}>{expirationDate}</p>
                    <p className={style.description}>반납기한</p>
                </div>
            </div>
        </div>
    );
};

ItemRentalStateCard.propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    rentalStatus: PropTypes.string.isRequired,
    expirationDate : PropTypes.string,
    onClick : PropTypes.func,
    isSelected: PropTypes.string,
};

export default ItemRentalStateCard;
