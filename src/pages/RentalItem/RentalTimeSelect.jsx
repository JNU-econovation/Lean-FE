import Navbar from '../../components/Navbar/Navbar';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import style from './RentalTimeSelect.module.css'
import Button from '../../components/Button/Button';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RentalTimeSelect = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
                    <p className={style.name}>우산(대)</p>
                    <p className={style.address}>제1학생회관</p>
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