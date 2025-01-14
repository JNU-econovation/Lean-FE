import style from './ReturnRequest.module.css';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Navtab from '../../components/Navtab/Navtab';
import ItemRentalStateCard from '../../components/Card/ItemRentalStateCard';
import Button from '../../components/Button/Button';

const ReturnRequest = () => {
    const [selectedCards, setSelectedCards] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const tabs = ['전체', '만료', '대여'];
    const tempRentalList = [
        {   id: 1,
            studentCouncil : "HEYDAY",
            rentalStatus : "EXPIRED",
            item : "우산(대)",
            expirationDate : "초과"}, 
        {   id: 2,
            studentCouncil : "HEYDAY",
            rentalStatus : "RENTED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   id: 3,
            studentCouncil : "HEYDAY",
            rentalStatus : "RETURNED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   id: 4,
            studentCouncil : "HEYDAY",
            rentalStatus : "RESERVED",
            item : "우산(대)",
            expirationDate : "초과"},
        {   id: 5,
            studentCouncil : "HEYDAY",
            rentalStatus : "RESERVED",
            item : "우산(대)",
            expirationDate : "초과"},
        ]
        
        const checkInputs = useCallback(() => {
            if (selectedCards.length === 0) {
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        }, [selectedCards]);

        useEffect(() => {
            checkInputs();
        }, [selectedCards, checkInputs]);

        const handleClickCard = (id) => {
            setSelectedCards((prev) => {
                if (prev.includes(id)) {
                    return prev.filter(cardId => cardId !== id);
                } else {
                    return [...prev, id];
                }
            });
        };

        const handleReturn = () => {
            if (!isButtonDisabled) {
                navigate('/rent/return/complete');
            }
        };
    
    return(
        <div className={style.container}>
            <Navbar title={"반납 신청"} onBackClick={() => window.history.back()}/>
            <Navtab tabs={tabs}/>
            {tempRentalList.map((rental) => {
                const isCardSelected = selectedCards.includes(rental.id);
                return (
                <ItemRentalStateCard
                    key={rental.id}
                    studentCouncil={rental.studentCouncil} 
                    rentalStatus={rental.rentalStatus}
                    item={rental.item}
                    expirationDate = {rental.expirationDate}
                    onClick = {() => {
                        handleClickCard(rental.id)}
                        }
                    isSelected={`${isCardSelected ? 'selected': ''}`}
                    />
                )
            })}
            <div className={style.buttonBox}>
                <Button
                        text="반납하기"
                        onClick={()=>handleReturn()}
                        className={`fixWidth ${style.returnButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                        />
            </div>
        </div>
    )
};

export default ReturnRequest;