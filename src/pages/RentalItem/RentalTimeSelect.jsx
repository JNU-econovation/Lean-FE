import Navbar from '../../components/Navbar/Navbar';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import style from './RentalTimeSelect.module.css'
import Button from '../../components/Button/Button';
import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { UserContext } from '../../hooks/userContext';

const RentalTimeSelect = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [itemInfo, setItemInfo] = useState({})
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [searchParams] = useSearchParams();
    const currentUser = useContext(UserContext);

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

    const handleRental = async () => {
        if (!isButtonDisabled) {
            const itemId = searchParams.get('id');
            const userId = currentUser.user_id;
            console.log(userId);
            console.log(itemId);
    
            try {
                
                const startTime = new Date(selectedDate);
                startTime.setHours(selectedTime.getHours());
                startTime.setMinutes(selectedTime.getMinutes());
    
                
                const expirationTime = new Date(startTime);
                expirationTime.setMinutes(startTime.getMinutes() + 30);

                const requestBody = {
                    startTime: startTime.toISOString(), 
                    expirationTime: expirationTime.toISOString(), 
                };

                console.log(startTime);
                console.log(expirationTime);
                console.log("Request Body:", requestBody);
    
                await apiClient.post(`/api/v1/rentals/${userId}/reservation/${itemId}`, requestBody);
    
                navigate('/rent/item/complete'); 
            } catch (error) {
                console.error("Failed to make reservation:", error);
                alert("예약에 실패했습니다. 다시 시도해주세요.");
            }
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
                    <ion-icon  on-icon name="cube-outline"></ion-icon>
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