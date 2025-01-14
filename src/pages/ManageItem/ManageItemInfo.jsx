import style from './ManageItemInfo.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const ManageItemInfo = () => {
    const navigate = useNavigate();
    return (
        <div className={`${style.container} pageContainer`}>
            <Navbar title="물품 정보 보기" shadow={true} home="true" onBackClick={() => window.history.back()}/>
            <div className={style.itemBox}>
                <div className={`${style.itemImage} circle`}>

                </div>
                <div className={style.itemNameBox}>
                    <p className={style.name}>우산(대)</p>
                    <p className={style.address}>제1학생회관</p>
                </div>
            </div>
            <hr/>
            <div className={style.itemInfoBox}>
                <div className={style.textBox}>
                    <p>재고</p>
                    <p className={style.amount}>15</p>
                </div>
                <div className={style.textBox}>
                    <p>대여중</p>
                    <p className={style.amount}>3</p>
                </div>
                <div className={style.textBox}>
                    <p>대여 예약</p>
                    <p className={style.amount}>1</p>
                </div>
                <div className={style.textBox}>
                    <p>총량</p>
                    <p className={style.amount}>19</p>
                </div>
            </div>
            <Button
                    text="수정하기"
                    onClick={()=>{}}                    
                    className={`fixWidth ${style.itemEditButton}`}
                />
        </div>
    )
};

export default ManageItemInfo;