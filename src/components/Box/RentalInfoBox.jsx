import style from './RentalInfoBox.module.css';
import PropTypes from 'prop-types';
import { formatDate, formatDDay, formatOverDate } from '../../hooks/dateFormatChange';

const RentalInfoBox = ({ rentalInfo, isStudentCouncil = false }) => {
    const renderInfo = (label, value, extraStyle = '') => (
        <div>
            <p className={style.info}>{label}</p>
            <p className={`${style.value} ${extraStyle}`}>{value}</p>
        </div>
        );
    
        const renderRentalInfo = () => {
        const { rentalStatus, rentalStartDate, rentalExpireDate, returnDate, studentCouncilAddress, itemName, reservationStartDate, reservationExpirationDate } = rentalInfo;
    
        switch (rentalStatus) {
            case '대기중':
            return (
                <>
                {renderInfo('예약 일자', formatDate(reservationStartDate))}
                {renderInfo('예약 만료 일자', formatDate(reservationExpirationDate))}
                {renderInfo('대여 장소', studentCouncilAddress)}
                {renderInfo('대여 물품', itemName)}
                </>
            );
    
            case '대여중':
            case '처리중':
            return (
                <>
                {renderInfo('대여 일자', formatDate(rentalStartDate))}
                {renderInfo('만료 일자', formatDate(rentalExpireDate))}
                {renderInfo('반납 장소', studentCouncilAddress)}
                {renderInfo('대여 물품', itemName)}
                {renderInfo('반납 기한', formatDDay(rentalExpireDate), style.rentalDate)}
                </>
            );
    
            case '반납':
            return (
                <>
                {renderInfo('대여 일자', formatDate(rentalStartDate))}
                {renderInfo('반납 일자', formatDate(returnDate))}
                {renderInfo('대여 장소', studentCouncilAddress)}
                {renderInfo('대여 물품', itemName)}
                </>
            );
    
            case '초과':
            return (
                <>
                {renderInfo('대여 일자', formatDate(rentalStartDate))}
                {renderInfo('만료 일자', formatDate(rentalExpireDate))}
                {renderInfo('반납 장소', studentCouncilAddress)}
                {renderInfo('대여 물품', itemName)}
                {renderInfo('초과 일자', `${formatOverDate(rentalExpireDate)} 초과`, style.expirationDate)}
                </>
            );
    
            default:
            return <p>해당 상태에 대한 정보를 표시할 수 없습니다.</p>;
        }
    };
  
    return (
      <div className={style.container}>
        {renderRentalInfo()}
        {isStudentCouncil && renderInfo('추후 처리', 'N/A')}
      </div>
    );
  };

RentalInfoBox.propTypes = {
    rentalInfo: PropTypes.shape({
        rentalStatus: PropTypes.string.isRequired,
        rentalStartDate: PropTypes.string,
        rentalExpireDate: PropTypes.string,
        reservationStartDate: PropTypes.string,
        reservationExpirationDate: PropTypes.string,
        returnDate: PropTypes.string,
        studentCouncilAddress: PropTypes.string,
        itemName: PropTypes.string,
    }).isRequired,
    isStudentCouncil: PropTypes.bool,
};

export default RentalInfoBox;