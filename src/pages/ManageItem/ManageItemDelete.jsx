import style from './ManageItem.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import Button from '../../components/Button/Button';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageItemDelete = () => {
    const [selectedCard, setSelectedCard] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
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

    const handleDelete = () => {
        if (!isButtonDisabled) {
            setDialogOpen(true);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log("Item deleted!");
        setDialogOpen(false);
        navigate('/manage/item')
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
            <Navbar title="물품 삭제" onBackClick={() => window.history.back()} shadow={true}/>
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
                        isSelected={isCardSelected ? true: false}
                        />
                )
            })}
            <div className={style.buttonBox}>
                <Button
                    text="삭제하기"
                    onClick={()=>handleDelete()}
                    className={`fixWidth ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                    />
            </div>
            <ConfirmDialog
                title="물품 삭제"
                description="물품을 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다."
                closeText="취소"
                confirmText="삭제"
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
};

export default ManageItemDelete;