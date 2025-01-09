import './Navigation.css';
import PropTypes from 'prop-types';

const Navigation = ({ title, onBackClick }) => {
    const handleBackClick = (e) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick();
        }
    };

    return (
        <nav className="navigation">
            <button className="back-button" onClick={handleBackClick}>
                <ion-icon size="large" name="chevron-back-outline" style={{ cursor: 'pointer' }}></ion-icon>
            </button>
            <h2 className="nav-title">{title}</h2>
        </nav>
    );
};

Navigation.propTypes = {
    title: PropTypes.string.isRequired,
    onBackClick: PropTypes.func,
};

export default Navigation;