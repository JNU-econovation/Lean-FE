import { useState } from 'react';
import PropTypes from 'prop-types';
import './SignupDropdown.css';

const SignupDropdown = ({ label, list = [], onSelect, selected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleItemClick = (index) => {
        setActiveIndex(index);
        setIsOpen(false);
        if (onSelect) {
            onSelect(list[index]);
        }
    };

    return (
        <div className={`signup-dropdown-group`}>
            <label className="signup-label">{label}</label>
            <div className="dropdown">
                <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span className="selected">
                        {selected || '단과대학 선택'}
                    </span>
                    <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
                </div>
                <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
                    {list.map((item, index) => (
                        <li
                            key={index}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleItemClick(index)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

SignupDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.array,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
};

export default SignupDropdown;
