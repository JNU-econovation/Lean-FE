import style from './ManageItem.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ItemCard from '../../components/Card/ItemCard';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import Button from '../../components/Button/Button';
import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { UserContext } from '../../hooks/userContext';

const ManageItemDelete = () => {
    const [selectedCard, setSelectedCard] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [studentCouncilInfo, setStudentCouncilInfo] = useState({
        studentCouncilName: '',
        studentCouncilAddress: '',
        collegeName: '',
    });
    const currentUser = useContext(UserContext);

    const navigate = useNavigate();

    // studentCouncilId 가져오기
    useEffect(() => {
        const fetchStudentCouncilData = async () => {
            try {
                // User ID로 studentCouncilId 가져오기
                const userResponse = await apiClient.get(`/api/v1/users/${currentUser.user_id}`);
                const { studentCouncilId } = userResponse.data;

                // studentCouncilId로 물품 데이터 가져오기
                const councilResponse = await apiClient.get(`/api/v1/items/student-council/${studentCouncilId}`);
                const { studentCouncilName, studentCouncilAddress, collegeName, items } = councilResponse.data;

                // 상태 업데이트
                setStudentCouncilInfo({
                    studentCouncilName,
                    studentCouncilAddress,
                    collegeName,
                });
                setItemList(items); // 아이템 리스트 업데이트
            } catch (error) {
                console.error('Failed to fetch student council data:', error);
            }
        };

        fetchStudentCouncilData();
    }, [currentUser.user_id]);

    // 버튼 활성화 여부 확인
    const checkInputs = useCallback(() => {
        setIsButtonDisabled(selectedCard.length === 0);
    }, [selectedCard]);

    useEffect(() => {
        checkInputs();
    }, [selectedCard, checkInputs]);

    // 아이템 선택/해제
    const handleClickCard = (id) => {
        setSelectedCard((prev) => {
            if (prev.includes(id)) {
                return prev.filter((cardId) => cardId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // 삭제 버튼 클릭: 확인 다이얼로그 표시
    const handleDelete = () => {
        if (!isButtonDisabled) {
            setDialogOpen(true);
        }
    };

    // 다이얼로그 닫기
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // 삭제 확인 API 호출 및 페이지 이동
    const handleConfirmDelete = async () => {
        try {
            // 선택된 아이템 삭제 API 요청
            await Promise.all(
                selectedCard.map((id) => apiClient.delete(`/api/v1/items/${id}`)) // 각각의 ID로 삭제 요청
            );

            // 삭제 후 상태 업데이트
            setItemList((prevList) => prevList.filter((item) => !selectedCard.includes(item.id)));
            setSelectedCard([]); // 선택된 카드 초기화
            setDialogOpen(false); // 다이얼로그 닫기
            navigate('/manage/item'); // 삭제 완료 후 페이지 이동
        } catch (error) {
            console.error('Failed to delete items:', error);
        }
    };

    return (
        <div className={`pageContainer ${style.container}`}>
            <Navbar title="물품 삭제" onBackClick={() => navigate('/manage/item')} shadow={true}/>
            <div className={style.studentCouncilInfoBox}>
                <p className={style.name}>{studentCouncilInfo.collegeName} {studentCouncilInfo.studentCouncilName}</p>
                <p className={style.address}>{studentCouncilInfo.studentCouncilAddress}</p>
            </div>
            {itemList.map((item) => {
                const isCardSelected = selectedCard.includes(item.id);
                return(
                    <ItemCard 
                        key={item.id}
                        item={item.name}
                        onClick = {() => {
                            handleClickCard(item.id)}
                            }
                        isSelected={isCardSelected ? true: false}
                        />
                )
            })}
            <div className={style.buttonBox}>
                <Button
                    text="삭제하기"
                    onClick={handleDelete}
                    className={`fixWidth ${isButtonDisabled ? "disabled" : ''}`} disabled={isButtonDisabled} 
                    />
            </div>
            <ConfirmDialog
                title="물품 삭제"
                description="물품을 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다."
                closeText="취소"
                confirmText="삭제"
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
};

export default ManageItemDelete;