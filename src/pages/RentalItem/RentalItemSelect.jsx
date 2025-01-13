import style from './RentalItemSelect.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';

const RentalItemSelect = () => {
    const [selectedCard, setSelectedCard] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
        
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

    const tempItemList = [
        {   id: 1,
            name:"우산(대)"},
        {   id: 2,
            name:"우산(소)"},
        {   id: 3,
            name:"돗자리(소)"},
        {   id: 4,
            name:"휴대용 충전기(C타입)"},
    ]
    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar 
                title={"대여 물품 선택"} 
                home={true} 
                shadow={true}
                onBackClick={() => window.history.back()}/>
            <div className={style.studentCouncilInfoBox}>
                <p className={style.name}>총학생회 HEYDAY</p>
                <p className={style.address}>제1학생회관</p>
            </div>
            {tempItemList.map((item) => {
                const isCardSelected = selectedCard.includes(item.id);
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick = {() => {
                            handleClickCard(item.id)}
                            }
                        isSelected={`${isCardSelected ? 'selected': ''}`}
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
