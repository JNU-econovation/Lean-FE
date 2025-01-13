import style from './CompletePage.module.css';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';

const CompletePage = ({title, description, buttonText, link}) => {
    return (
        <div className="centerContainer">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p className={style.infoText}>{title}</p>
            <p className={style.infoTextGray}>{description}</p>
            <Button text={buttonText} type="button" className={`fixWidth ${style.mainButton}`} link={link}/>
        </div>
    )
};

CompletePage.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default CompletePage;