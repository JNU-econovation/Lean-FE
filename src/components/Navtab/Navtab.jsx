import { useState } from 'react';
import style from './Navtab.module.css';

const Navtab = () => {
    const [activeTab, setActiveTab] = useState('전체');
    const tabs = ['전체', '예약', '대여', '반납', '만료'];

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

export default Navtab;