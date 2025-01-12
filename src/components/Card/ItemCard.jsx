import style from './ItemCard.module.css';
import PropTypes from 'prop-types';

const ItemCard = ({item, onClick, isSelected = false}) => {
    return(
        <div className={`card selectCardContainer ${isSelected ? 'selected' : ''} ${style.container}`} onClick={onClick}>
            <div className={`${style.itemImage} circle`}>

            </div>
            <div className={style.itemNameBox}>
                <p>{item}</p>
            </div>
        </div>
    )
};

ItemCard.propTypes = {
    item: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

export default ItemCard;