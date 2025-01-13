import PropTypes from 'prop-types';
import CompletePage from '../../components/page/CompletePage';

const RentalRequestComplete = () => {
    return (
        <CompletePage title='반납 신청 완료' description='반납 신청이 성공적으로 완료되었어요' buttonText='메인으로' link='/main'/>
    );
};

RentalRequestComplete.propTypes = {
    navigate: PropTypes.func
};

export default RentalRequestComplete;
