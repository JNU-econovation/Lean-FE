import './ItemRentalStateCard.css';
import PropTypes from 'prop-types';

const ItemRentalStateCard = ({studentCouncil, rentalStatus, item, expirationDate}) => {
    return (
        <div className="card rental-state-card">
            <div id="head-container">
                <span id="student-council">{studentCouncil}</span>
                <div id="rental-state" style={{backgroundColor: '#ec8886'}}>{rentalStatus}</div>
            </div>
            <div id="body-container">
                <div className="circle item-icon">

                </div>
                <div id="text-container">
                    <p id="item-name">{item}</p>
                    <p id="item-description">물품</p>
                </div>
                <div id="text-container">
                    <p id="item-rental-status">{expirationDate}</p>
                    <p id="item-description">반납기한</p>
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
};

export default ItemRentalStateCard;
