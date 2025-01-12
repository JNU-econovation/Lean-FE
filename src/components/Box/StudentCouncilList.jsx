import style from './StudentCouncilList.module.css'
import PropTypes from 'prop-types';

const StudentCouncilList = ({name, address, onClick}) => {
    return(
        <div className={style.container}>
            <div className={`circle ${style.studentCouncilImage}`}>

            </div>
            <div className={style.studentCouncilInfo}>
                <p className={style.name}>{name}</p>
                <p className={style.address}>{address}</p>
            </div>
            <div 
                className={style.buttonBox}
                onClick={onClick}>
                <ion-icon name="chevron-forward"></ion-icon>
            </div>
        </div>
    )
};

StudentCouncilList.propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    onClick: PropTypes.func
}

export default StudentCouncilList;