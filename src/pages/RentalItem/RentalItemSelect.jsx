import style from './RentalItemSelect.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import Button from '../../components/Button/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import apiClient from '../../services/apiClient';

const RentalItemSelect = () => {
    const [selectedCard, setSelectedCard] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [studentCouncilInfo, setStudentCouncilInfo] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const studentCouncilId = searchParams.get('id');
        const fetchItemData = async () => {
            try {
                const itemsResponse = await apiClient.get(`/api/v1/items/${studentCouncilId}`);
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
        
        
        const checkInputs = useCallback(() => {
            if (selectedCard.length === 0) {
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        }, [selectedCard]);
        
        useEffect(() => {
            checkInputs();
        }, [selectedCard, checkInputs]);

        const handleClickCard = (id) => {
            setSelectedCard((prev) => {
                if (prev.includes(id)) {
                    return prev.filter(cardId => cardId !== id);
                } else {
                    return [...prev, id];
                }
            });
        };

        const handleRental = () => {
            if (!isButtonDisabled) {
                navigate('/rent/item/time');
            }
        };

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
                const isCardSelected = selectedCard.includes(item.id);
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick = {() => {
                            handleClickCard(item.id)}}
                        isSelected={isCardSelected}
                        />
                )
            })}
            <div className={style.buttonBox}>
                <Button
                        text="대여하기"
                        onClick={()=>handleRental()}
                        className={`fixWidth ${style.returnButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                        />
            </div>
        </div>
    )
};

export default RentalItemSelect
