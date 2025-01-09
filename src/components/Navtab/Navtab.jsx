import { useState } from 'react';
import './Navtab.css';

const Navtab = () => {
    const [activeTab, setActiveTab] = useState('전체');
    const tabs = ['전체', '예약', '대여', '반납', '만료'];

    return (
        <div id = 'nav-tab-container'>
            {tabs.map((tab, index) => (
                <span
                    key={index}
                    className={`tab-item ${activeTab === tab ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </span>
            ))}
        </div>
    );
};

export default Navtab;