import style from './MainCard.module.css';
import PropTypes from 'prop-types';

const MainCard = ({ 
    title, 
    description, backgroundColor, 
    titleColor, descriptionColor, 
    icon, 
    iconColor, 
    iconBackgroundColor,
    iconOverlayColor,
    onClick }) => {
    return (
        <div className={`card ${style.mainCard}`} onClick={onClick} style={{ backgroundColor: backgroundColor }}>
            <div 
                className={`circle ${style.cardImage}`}
                style={{ backgroundColor: iconBackgroundColor}} >
                <ion-icon 
                    name={icon} 
                    style={{ color: iconColor }}></ion-icon>
            </div>
            <p className={style.title} style={{ color: titleColor }}>{title}</p>
            <p className={style.description} style={{ color: descriptionColor }}>{description}</p>
            <div className={style.iconOverlay}>
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
    iconOverlayColor: PropTypes.string,
    onClick: PropTypes.func
};

export default MainCard;
