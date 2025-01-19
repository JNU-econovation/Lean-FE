import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './SignupDropdown.module.css';

const SignupDropdown = ({ label, list = [], onSelect, selected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        const updatedList = list.filter(item => item.name !== '총학생회');
        setFilteredList(updatedList);
    }, [list]);

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
                        {(selected && selected.name) || '단과대학 선택'}
                    </span>
                    <div className={`${style.caret} ${isOpen ? style.caretRotate : ''}`}></div>
                </div>
                <ul className={`${style.menu} ${isOpen ? style.menuOpen : ''}`}>
                    {filteredList.map((item, index) => (
                        <li
                            key={index}
                            className={activeIndex === index ? style.active : ''}
                            onClick={() => handleItemClick(index)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

SignupDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
};

export default SignupDropdown;
