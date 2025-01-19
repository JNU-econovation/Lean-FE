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

const ItemAddEdit = ({title, buttonText, data}) => {
    const [itemName, setItemName] = useState(data?.itemName||'');
    const [itemAmount, setItemAmount] = useState(data?.itemAmount||'');
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

    const handleConfirmEdit = async () => {
        try {
            // 사용자 ID로 studentCouncilId 가져오기
            const userResponse = await apiClient.get(`/api/v1/users/${USER_ID.ADMIN}`);
            const { studentCouncilId } = userResponse.data;

            // POST 요청 보내기
            const requestBody = {
                name: itemName,
                itemAmounts: {
                    amounts: parseInt(itemAmount, 10), // 수량을 숫자로 변환
                },
            };

            // POST 요청 실행
            console.log('Sending POST request:', requestBody); // 디버깅용 로그
            await apiClient.post(`/api/v1/items/student-council/${studentCouncilId}`, requestBody);
            
            setDialogOpen(false);
            navigate('/manage/item'); // 성공 시 물품 관리 페이지로 이동
        } catch (error) {
            console.error('Failed to save item:', error);
        }
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
                onConfirm={handleConfirmEdit}
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