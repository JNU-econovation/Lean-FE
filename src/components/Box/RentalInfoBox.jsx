import style from './RentalInfoBox.module.css';
import PropTypes from 'prop-types';
import { formatDate, formatOverDate } from '../../hooks/dateFormatChange';

const RentalInfoBox = ({rentalInfo, isStudentCouncil=false}) => {
    console.log(isStudentCouncil)
    return (
        <div className={style.container}>
            <div>
                <p className={style.info}>대여 일자</p>
                <p className={style.value}>{formatDate(rentalInfo.rentalStartDate)}</p>
            </div>
            <div>
                <p className={style.info}>만료 일자</p>
                <p className={style.value}>{formatDate(rentalInfo.rentalExpireDate)}</p>
            </div>
            <div>
                <p className={style.info}>반납 장소</p>
                <p className={style.value}>{rentalInfo.studentCouncilAddress}</p>
            </div>
            <div>
                <p className={style.info}>대여 물품</p>
                <p className={style.value}>{rentalInfo.itemName}</p>
            </div>
            <div>
                <p className={style.info}>초과 일자</p>
                <p className={`${style.value} ${style.expirationDate}`}>
                        {formatOverDate(rentalInfo.rentalExpireDate)} 초과</p>
            </div>
            {isStudentCouncil?
                <div>
                    <p className={style.info}>추후 처리</p>
                </div>
                :''
            }
            
        </div>
    )    
};

RentalInfoBox.propTypes = {
    rentalInfo: PropTypes.array.isRequired,
    isStudentCouncil: PropTypes.bool,
};

export default RentalInfoBox;