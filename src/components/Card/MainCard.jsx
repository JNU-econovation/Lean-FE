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
        <div className="card main-card" style={{ backgroundColor: backgroundColor }}>
            <div 
                className="circle card-image"
                style={{ backgroundColor: iconBackgroundColor}} >
                <ion-icon 
                    name={icon} 
                    style={{ color: iconColor }}></ion-icon>
            </div>
            <p id='title' style={{ color: titleColor }}>{title}</p>
            <p id='description' style={{ color: descriptionColor }}>{description}</p>
            <div id="icon-overlay">
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
