import style from './ItemAddEdit.module.css';
import Navbar from '../Navbar/Navbar';
import SignupInput from '../Input/SignupInput';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmDialog from '../Dialog/ConfirmDialog';
import apiClient from '../../services/apiClient';
import { USER_ID } from '../../constants/userId';

const ItemAddEdit = ({title, buttonText, data, onSubmit}) => {
    const [itemName, setItemName] = useState(data?.itemName||'');
    const [itemAmount, setItemAmount] = useState(data?.itemAmount?.toString() || ''); // 숫자를 문자열로 변환
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

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
        // 부모 컴포넌트로 데이터 전달
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
            <Navbar title={title} shadow={true} onBackClick={() => window.history.back()}/>
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