import { forwardRef } from "react";
import PropTypes from 'prop-types';
import style from './CustomInput.module.css';

const CustomInput = forwardRef(({ value, onClick, isDate, isOpen, onChange }, ref) => (
      <div className={style.container} onClick={onClick} ref={ref}>
        {isDate?
        <ion-icon name="calendar-clear-outline"></ion-icon>:
        <ion-icon name="time-outline"></ion-icon>}
        <input 
          type="text"
          className={style.inputBox}
          placeholder={
            isDate?"날짜 선택":"시간 선택"
          }
          value={value}
          onChange={onChange}/>
          <div className={`${style.caret} ${isOpen ? style.caretRotate : ''}`}></div>
      </div>
    ),
  );

  CustomInput.displayName = "CustomInput";
  CustomInput.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    isOpen: PropTypes.bool,
    isDate: PropTypes.bool,
    onChange: PropTypes.func,
};
  export default CustomInput;