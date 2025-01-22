import style from './ItemInfoBox.module.css';
import PropTypes from 'prop-types';
import RentalStatusBadge from '../Badge/RentalStatusBadge';
import ImageBox from '../ImageBox/ImageBox';

const ItemInfoBox = ({studentCouncil, item, rentalStatus}) => {

    return (
        <div className={style.container}>
            <div className={`circle ${style.itemIcon}`}>
                <ImageBox item={item}/>
            </div>
            <div className={style.textBox}>
                <p className={style.studentCouncil}>{studentCouncil}</p>
                <p className={style.itemName}>{item}</p>
                <RentalStatusBadge 
                    rentalStatus={rentalStatus}
                />
            </div>
        </div>
    )
};

ItemInfoBox.propTypes = {
    studentCouncil: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    rentalStatus: PropTypes.string.isRequired,
};

export default ItemInfoBox;