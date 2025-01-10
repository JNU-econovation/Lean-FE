import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SignupDropdown.module.css';

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
        <div className={style.signupDropdownGroup}>
            <label className='signupLabel'>{label}</label>
            <div className={style.dropdown}>
                <div className={`${style.select} ${isOpen ? style.selectClicked : ''}`} onClick={toggleDropdown}>
                    <span className={style.selected}>
                        {selected || '단과대학 선택'}
                    </span>
                    <div className={`${style.caret} ${isOpen ? style.caretRotate : ''}`}></div>
                </div>
                <ul className={`${style.menu} ${isOpen ? style.menuOpen : ''}`}>
                    {list.map((item, index) => (
                        <li
                            key={index}
                            className={activeIndex === index ? style.active : ''}
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
