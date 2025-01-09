import './MainCard.css';
import PropTypes from 'prop-types';

const MainCard = ({ 
    title, 
    description, backgroundColor, 
    titleColor, descriptionColor, 
    icon, 
    iconColor, 
    iconBackgroundColor,
    iconOverlayColor }) => {
    return (
        <div className="main-card" style={{ backgroundColor: backgroundColor }}>
            <div 
                className="card-image"
                style={{ backgroundColor: iconBackgroundColor}} >
                <ion-icon 
                    name={icon} 
                    style={{ color: iconColor }}></ion-icon>
            </div>
            <p className='text-title' style={{ color: titleColor }}>{title}</p>
            <p className='text-description' style={{ color: descriptionColor }}>{description}</p>
            <div className="icon-overlay">
                <ion-icon 
                    name={icon}
                    style={{ color: iconOverlayColor }}></ion-icon>
            </div>
        </div>
    );
};

MainCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    titleColor: PropTypes.string.isRequired,
    descriptionColor: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    iconBackgroundColor: PropTypes.string,
    iconOverlayColor: PropTypes.string
};

export default MainCard;
