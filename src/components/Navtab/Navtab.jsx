import { useState } from 'react';
import style from './Navtab.module.css';
import PropTypes from 'prop-types';

const Navtab = ({tabs}) => {
    const [activeTab, setActiveTab] = useState('전체');

    return (
        <div className = {style.container}>
            {tabs.map((tab, index) => (
                <span
                    key={index}
                    className={`${style.tabItem} ${activeTab === tab ? style.tabActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </span>
            ))}
        </div>
    );
};

Navtab.propTypes = {
    tabs: PropTypes.array.isRequired,
};

export default Navtab;