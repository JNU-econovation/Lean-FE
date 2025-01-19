import style from './ManageItem.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import ItemFab from '../../components/Fab/ItemFab';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { USER_ID } from '../../constants/userId';
import { useState, useEffect } from 'react';

const ManageItem = () => {
    const navigate = useNavigate();

    // 상태 정의
    const [studentCouncilInfo, setStudentCouncilInfo] = useState({
        studentCouncilName: '',
        studentCouncilAddress: '',
        collegeName: '',
    });
    const [itemList, setItemList] = useState([]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchStudentCouncilInfo = async () => {
            try {
                // UserId로 요청 보내기
                const userResponse = await apiClient.get(`/api/v1/users/${USER_ID.ADMIN}`);
                const {studentCouncilId} = userResponse.data;

                // studentCouncilId로 요청
                const response = await apiClient.get(`/api/v1/items/student-council/${studentCouncilId}`);
                const { studentCouncilName, studentCouncilAddress, collegeName, items } = response.data;

                // 상태 업데이트
                setStudentCouncilInfo({
                    studentCouncilName,
                    studentCouncilAddress,
                    collegeName,
                });
                setItemList(items); // 아이템 리스트 업데이트
            } catch (error) {
                console.error('Failed to fetch student council info:', error);
            }
        };

        fetchStudentCouncilInfo();
    }, []);

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar title="관리 물품 선택" onBackClick={() => window.history.back()} shadow={true}/>
            <div className={style.studentCouncilInfoBox}>
                <p className={style.name}>{studentCouncilInfo.collegeName} {studentCouncilInfo.studentCouncilName}</p>
                <p className={style.address}>{studentCouncilInfo.studentCouncilAddress}</p>
            </div>
            {itemList.map((item) => {
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick={() => navigate(`/manage/item/info?id=${item.id}&itemName=${encodeURIComponent(item.name)}
                        &studentCouncilAddress=${encodeURIComponent(studentCouncilInfo.studentCouncilAddress)}`)}/>
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