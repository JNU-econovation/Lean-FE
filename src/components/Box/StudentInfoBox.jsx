import style from './StudentInfoBox.module.css';
import PropTypes from 'prop-types';

const StudentInfoBox = ({studentInfo}) => {
    return (
        <div className={style.container}>
            <div>
                <p className={style.info}>연락처</p>
                <p className={style.value}>{studentInfo.userPhoneNumber}</p>
            </div>
            <div>
                <p className={style.info}>단과대학</p>
                <p className={style.value}>{studentInfo.userCollegeName}</p>
            </div>
            <div>
                <p className={style.info}>학과</p>
                <p className={style.value}>{studentInfo.userDepartment}</p>
            </div>
        </div>
    )
    
};

StudentInfoBox.propTypes = {
    studentInfo: PropTypes.shape({
        userPhoneNumber: PropTypes.string,
        userCollegeName: PropTypes.string,
        userDepartment: PropTypes.string,
    }).isRequired,
};

export default StudentInfoBox;