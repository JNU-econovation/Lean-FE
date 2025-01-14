import style from './ManageItem.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import ItemFab from '../../components/Fab/ItemFab';
import { useNavigate } from 'react-router-dom';

const ManageItem = () => {
    const navigate = useNavigate();
    const tempItemList = [
        {   id: 1,
            name:"우산(대)"},
        {   id: 2,
            name:"우산(소)"},
        {   id: 3,
            name:"돗자리(소)"},
        {   id: 4,
            name:"휴대용 충전기(C타입)"},
        ]

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar title="관리 물품 선택" onBackClick={() => window.history.back()} shadow={true}/>
            <div className={style.studentCouncilInfoBox}>
                <p className={style.name}>총학생회 HEYDAY</p>
                <p className={style.address}>제1학생회관</p>
            </div>
            {tempItemList.map((item) => {
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick = {() => {}}/>
                )
            })}
            <ItemFab 
                onClickAdd={()=>navigate('/manage/item/add')}
                onClickDelete={()=>navigate('/manage/item/delete')}
                />
        </div>
    )
};

export default ManageItem;