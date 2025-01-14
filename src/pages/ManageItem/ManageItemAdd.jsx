import style from './ManageItemAdd.module.css';
import Navbar from '../../components/Navbar/Navbar';
import SignupInput from '../../components/Input/SignupInput';
import Button from '../../components/Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageItemAdd = () => {
    const [itemName, setItemName] = useState('');
    const [itemAmount, setItemAmount] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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

    const handleItemAdd = (e) => {
        e.preventDefault();

        if (itemName && itemAmount) {
            navigate('/manage/item')
        }
    };

    useEffect(() => {
        checkInputs();
    }, [itemName, itemAmount, checkInputs]);


    return (
        <div className={`${style.container} pageContainer`}>
            <Navbar title='물품 추가' shadow={true} onBackClick={() => window.history.back()}/>
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
                    text="다음"
                    onClick={handleItemAdd}                    
                    className={`fixWidth ${style.itemAddButton} ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                />
        </div>
    )
};

export default ManageItemAdd;