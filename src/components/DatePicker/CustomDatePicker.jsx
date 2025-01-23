import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import CustomInput from "./CustomInput";
import style from "./CustomDatePicker.module.css";
import PropTypes from "prop-types";

const CustomDatePicker = ({ isDate, selected, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const filterDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate >= today; 
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      return style.disabledDay;
    }

    return date.getDay() === 0 || date.getDay() === 6
      ? style.weekendDay
      : style.weekdayDay;
  };


  if (isDate) {
    return (
      <div className={style.datePickerContainer}>
        <DatePicker
          selected={selected}
          onChange={onDateChange}
          customInput={<CustomInput isDate={isDate} isOpen={isOpen} />}
          calendarClassName={style.customCalendar}
          dayClassName={dayClassName}
          onCalendarClose={() => setIsOpen(false)}
          onCalendarOpen={() => setIsOpen(true)}
          locale={ko}
          dateFormat="yy년 MM월 dd일(E)"
          filterDate={filterDate}
          onClickOutside={() => setIsOpen(false)}
        />
      </div>
    );
  } else {
    return (
      <DatePicker
        selected={selected}
        onChange={onDateChange}
        customInput={<CustomInput isDate={isDate} isOpen={isOpen} />}
        calendarClassName={style.customCalendar}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="HH:mm"
        showTimeCaption={false}
        onCalendarClose={() => setIsOpen(false)}
        onCalendarOpen={() => setIsOpen(true)}
        locale={ko}
        minTime={new Date().setHours(12, 0, 0, 0)}
        maxTime={new Date().setHours(18, 0, 0, 0)}
        onClickOutside={() => setIsOpen(false)}
      />
    );
  }
};

CustomDatePicker.propTypes = {
  isDate: PropTypes.bool,
  selected: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
};

export default CustomDatePicker;
