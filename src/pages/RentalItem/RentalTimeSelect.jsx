import Navbar from '../../components/Navbar/Navbar';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import style from './RentalTimeSelect.module.css'
import Button from '../../components/Button/Button';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const RentalTimeSelect = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [itemInfo, setItemInfo] = useState({})
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const itemId = searchParams.get('id');
        const fetchItemData = async () => {
            try {
                const itemsResponse = await apiClient.get(`/api/v1/items/${itemId}`);
                const { name, studentCouncilAddress } = itemsResponse.data;
                setItemInfo({name: name, address: studentCouncilAddress})
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchItemData();
        }, [searchParams]);

    const checkInputs = useCallback(() => {
        if (selectedDate && selectedTime) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [selectedDate, selectedTime]);

    useEffect(() => {
        checkInputs();
    }, [selectedDate, selectedTime, checkInputs]);

    const handleRental = () => {
        if (!isButtonDisabled) {
            navigate('/rent/item/complete');
        }
    };

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar 
                title={"대여 시간 선택"} 
                shadow={true} 
                home={true} 
                onBackClick={() => window.history.back()}/>
            <div className={style.itemBox}>
                <div className={`${style.itemImage} circle`}>

                </div>
                <div className={style.itemNameBox}>
                    <p className={style.name}>{itemInfo.name}</p>
                    <p className={style.address}>{itemInfo.address}</p>
                </div>
            </div>
            <div className={style.DatePickerBox}>
                <CustomDatePicker 
                    isDate={true}
                    selected={selectedDate}
                    onDateChange={(date) => setSelectedDate(date)}
                />
            </div>
            <div className={style.DatePickerBox}>
                <CustomDatePicker 
                    isDate={false}
                    selected={selectedTime}
                    onDateChange={(time) => setSelectedTime(time)}/>
            </div>
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

export default RentalTimeSelect;