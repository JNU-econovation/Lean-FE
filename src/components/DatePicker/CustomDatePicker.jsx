import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import CustomInput from "./CustomInput";
import style from "./CustomDatePicker.module.css";
import PropTypes from 'prop-types';

const CustomDatePicker = ({isDate, selected, onDateChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if(isDate){
    return (
      <div className={style.datePickerContainer}>
        <DatePicker
          selected={selected}
          onChange={onDateChange}
          customInput={<CustomInput isDate={isDate} isOpen={isOpen}/>}
          calendarClassName={style.customCalendar}
          dayClassName={date => (date.getDay() === 0 || date.getDay() === 6 ? style.weekendDay : style.weekdayDay)}
          onCalendarClose={()=>setIsOpen(false)}
          onCalendarOpen={()=>setIsOpen(true)}
          locale={ko}
          dateFormat="yy년 MM월 dd일(E)" 
        />
      </div>
    );
  }
  else {
    return (
      <DatePicker
        selected={selected}
        onChange={onDateChange}
        customInput={<CustomInput isDate={isDate} isOpen={isOpen}/>}
        calendarClassName={style.customCalendar}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="HH:mm"
        showTimeCaption={false}
        onCalendarClose={()=>setIsOpen(false)}
        onCalendarOpen={()=>setIsOpen(true)}
        locale={ko}
      />
    );
  }
  
};

CustomDatePicker.propTypes = {
  isDate: PropTypes.bool,
  selected: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
}

export default CustomDatePicker;
