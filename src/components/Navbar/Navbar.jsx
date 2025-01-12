import style from './Navbar.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title, onBackClick, home=false, shadow=false }) => {
    const navigate = useNavigate();
    const handleBackClick = (e) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick();
        }
    };

    if(home) {
        return (
            <nav className={`${shadow ? style.shadow : ''} ${style.navbar}`}>
                <div className={style.backButton} onClick={handleBackClick}>
                    <ion-icon size="large" name="chevron-back-outline" style={{ cursor: 'pointer' }}></ion-icon>
                </div>
                <h2>{title}</h2>
                <div className={style.home} onClick={() => navigate('/main')}>
                    <ion-icon name="home-outline" style={{ cursor: 'pointer' }}></ion-icon>
                </div>
            </nav>
    );}
    return (
        <nav className={`${shadow ? style.shadow : ''} ${style.navbar}`}>
            <div className={style.backButton} onClick={handleBackClick}>
                <ion-icon size="large" name="chevron-back-outline" style={{ cursor: 'pointer' }}></ion-icon>
            </div>
            <h2>{title}</h2>
        </nav>
);
    

};

Navbar.propTypes = {
    title: PropTypes.string,
    onBackClick: PropTypes.func,
    onClick: PropTypes.func,
    home:PropTypes.bool,
    shadow:PropTypes.bool,
};

export default Navbar;