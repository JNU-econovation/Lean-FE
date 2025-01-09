import './Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ title, onBackClick }) => {
    const handleBackClick = (e) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick();
        }
    };

    return (
        <nav id="navbar">
            <button id="back-button" onClick={handleBackClick}>
                <ion-icon size="large" name="chevron-back-outline" style={{ cursor: 'pointer' }}></ion-icon>
            </button>
            <h2 id="nav-title">{title}</h2>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string,
    onBackClick: PropTypes.func,
};

export default Navbar;