import style from './ItemAddEdit.module.css';
import Navbar from '../Navbar/Navbar';
import SignupInput from '../Input/SignupInput';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmDialog from '../Dialog/ConfirmDialog';

const ItemAddEdit = ({title, buttonText, data, onSubmit}) => {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState(data?.itemName||'');
    const [itemAmount, setItemAmount] = useState(data?.itemAmount?.toString() || '');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const checkInputs = useCallback(() => {
        if (itemName && itemAmount) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [itemName, itemAmount]);

    const handleItemName = (e) => {
        setItemName(e.target.value)
    };

    const handleItemAmount = (e) => {
        setItemAmount(e.target.value)
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmAdd = () => {
        setDialogOpen(false);

        console.log('Submitting data:', {
            name: itemName,
            amount: parseInt(itemAmount, 10),
        }); // 디버깅용 로그

        onSubmit({
            name: itemName,
            amount: parseInt(itemAmount, 10),
        });
    };


    const handleItem= (e) => {
        e.preventDefault();

        if (itemName && itemAmount) {
            setDialogOpen(true);
        }
    };

    useEffect(() => {
        checkInputs();
    }, [itemName, itemAmount, data, checkInputs]);


    return (
        <div className={`${style.container} pageContainer`}>
            <Navbar title={title} shadow={true} onBackClick={() => navigate('/manage/item')}/>
            <div className={`${style.itemImage}`}>
                <ion-icon name="camera"></ion-icon>
            </div>
            <SignupInput
                type="text"
                id="itemName"
                label="물품 이름"
                placeholder="물품 이름 입력"
                value={itemName}
                onChange={handleItemName}
                />
            <SignupInput
                type="number"
                id="itemAmount"
                label="수량"
                placeholder="수량 입력"
                value={itemAmount}
                onChange={handleItemAmount}
                />
            <Button
                text={buttonText}
                onClick={handleItem}                    
                className={`fixWidth ${style.itemAddButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
            />
            <ConfirmDialog
                title="변경 사항 저장"
                description="변경 사항을 정말 저장하시겠습니까? 저장 후에는 되돌릴 수 없습니다."
                closeText="취소"
                confirmText="저장"
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleConfirmAdd}
            />
        </div>
    )
};

ItemAddEdit.propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    data: PropTypes.object,
    
};

export default ItemAddEdit;