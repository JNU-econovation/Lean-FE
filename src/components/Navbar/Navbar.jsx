import style from './Navbar.module.css';
import PropTypes from 'prop-types';

const Navbar = ({ title, onBackClick }) => {
    const handleBackClick = (e) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick();
        }
    };

    return (
        <nav className={style.navbar}>
            <button className={style.backButton} onClick={handleBackClick}>
                <ion-icon size="large" name="chevron-back-outline" style={{ cursor: 'pointer' }}></ion-icon>
            </button>
            <h2>{title}</h2>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string,
    onBackClick: PropTypes.func,
};

export default Navbar;