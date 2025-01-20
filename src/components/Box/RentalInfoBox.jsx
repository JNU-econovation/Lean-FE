import style from './RentalInfoBox.module.css';
import PropTypes from 'prop-types';
import { formatDate, formatDDay, formatOverDate } from '../../hooks/dateFormatChange';
import ConfirmDialog from '../Dialog/ConfirmDialog';
import { useState } from 'react';
import apiClient from '../../services/apiClient';
import { showError } from '../../hooks/useSignupValidation';

const RentalInfoBox = ({ rentalInfo, isStudentCouncil = false, rentalId }) => {
    const [rentalDialogOpen, setRentalDialogOpen] = useState(false);
    const [returnDialogOpen, setReturnDialogOpen] = useState(false);
    const handleRental = async () => {
        try {
            await apiClient.put(`/api/v1/rentals/details/${rentalId}`);
            setRentalDialogOpen(false);
            setReturnDialogOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('상태 변경 실패:', error);
            showError(null, '상태 변경에 실패했습니다. 다시 시도해주세요.');
        }
    }

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
                {
                    isStudentCouncil?
                    <div className={style.infoBox}>
                        <p className={`${style.info} ${style.reservation}`}>신청 승인</p>
                        <ion-icon name="chevron-forward" onClick={() => setRentalDialogOpen(true)}></ion-icon>
                    </div>: ''
                }
                
                </>
            );
    
            case '대여중':
                return (
                    <>
                    {renderInfo('대여 일자', formatDate(rentalStartDate))}
                    {renderInfo('만료 일자', formatDate(rentalExpireDate))}
                    {renderInfo('반납 장소', studentCouncilAddress)}
                    {renderInfo('대여 물품', itemName)}
                    {renderInfo('반납 기한', formatDDay(rentalExpireDate), style.rentalDate)}
                    
                    </>
                );
            case '처리중':
            return (
                <>
                {renderInfo('대여 일자', formatDate(rentalStartDate))}
                {renderInfo('만료 일자', formatDate(rentalExpireDate))}
                {renderInfo('반납 장소', studentCouncilAddress)}
                {renderInfo('대여 물품', itemName)}
                {renderInfo('반납 기한', formatDDay(rentalExpireDate), style.rentalDate)}
                {
                    isStudentCouncil?
                    <div className={style.infoBox}>
                        <p className={`${style.info} ${style.rentalDate}`}>반납 승인</p>
                        <ion-icon name="chevron-forward" onClick={() => setReturnDialogOpen(true)}></ion-icon>
                    </div>: ''
                }
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
                {
                    isStudentCouncil?
                    <div className={style.infoBox}>
                        <p className={`${style.info} ${style.expirationDate}`}>반납 승인</p>
                        <ion-icon name="chevron-forward" onClick={() => setReturnDialogOpen(true)}></ion-icon>
                    </div>: ''
                }
                </>
            );
    
            default:
            return <p>해당 상태에 대한 정보를 표시할 수 없습니다.</p>;
        }
    };
  
    return (
        <div className={style.container}>
            {renderRentalInfo()}
            <ConfirmDialog
                    title="대여 승인"
                    description={
                        <>
                            대여 일시는 {formatDate(rentalInfo.reservationStartDate)} <br />
                            대여 물품은 {rentalInfo.itemName} 입니다. <br />
                            대여를 승인하시겠습니까?
                        </>
                    }
                    closeText="거절"
                    confirmText="승인"
                    open={rentalDialogOpen}
                    onClose={() => setRentalDialogOpen(false)}
                    onConfirm={handleRental}
                    isRental={true}/>
            <ConfirmDialog
                    title="반납 승인"
                    description={
                        <>
                            반납 물품은 {rentalInfo.itemName} 입니다. <br />
                            반납을 승인하시겠습니까?
                        </>
                    }
                    closeText="거절"
                    confirmText="승인"
                    open={returnDialogOpen}
                    onClose={() => setReturnDialogOpen(false)}
                    onConfirm={handleRental}
                    isRental={true}/>
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
    rentalId: PropTypes.string,
};

export default RentalInfoBox;