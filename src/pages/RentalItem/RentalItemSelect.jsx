import style from './RentalItemSelect.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';

const RentalItemSelect = () => {
    const [studentCouncilInfo, setStudentCouncilInfo] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const studentCouncilId = searchParams.get('id');
        const fetchItemData = async () => {
            try {
                const itemsResponse = await apiClient.get(`/api/v1/items/student-council/${studentCouncilId}`);
                const { studentCouncilName, studentCouncilAddress, items } = itemsResponse.data;
                setStudentCouncilInfo({
                    name: studentCouncilName,
                    address: studentCouncilAddress
                });
                setItemsList(items);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchItemData();
        }, [searchParams]);

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar 
                title={"대여 물품 선택"} 
                home={true} 
                shadow={true}
                onBackClick={() => window.history.back()}/>
            <div className={style.studentCouncilInfoBox}>
                <p className={style.name}>{studentCouncilInfo.name}</p>
                <p className={style.address}>{studentCouncilInfo.address}</p>
            </div>
            {itemsList.map((item) => {
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick = {() => navigate(`/rent/item/time?id=${item.id}`)}
                        />
                )
            })}
        </div>
    )
};

export default RentalItemSelect
