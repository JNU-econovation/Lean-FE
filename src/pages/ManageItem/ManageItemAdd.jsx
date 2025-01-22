import ItemAddEdit from "../../components/page/ItemAddEdit";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useContext } from "react";
import { UserContext } from "../../hooks/userContext";

const ManageItemAdd = () => {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);

    const handleSubmit = async (itemData) => {
        try {
            // 사용자 ID로 studentCouncilId 가져오기
            const userResponse = await apiClient.get(`/api/v1/users/${currentUser.user_id}`);
            const { studentCouncilId } = userResponse.data;

            // POST 요청 보내기
            const requestBody = {
                name: itemData.name,
                itemAmounts: {
                    amounts: itemData.amount,
                },
            };

            const response = await apiClient.post(
                `/api/v1/items/student-council/${studentCouncilId}`,
                requestBody
            );

            console.log('Item added successfully:', response.data);
            alert('새로운 물품이 추가되었습니다.');

            // 성공 시 물품 목록 페이지로 이동
            navigate('/manage/item');
        } catch (error) {
            console.error('Failed to add item:', error);
            alert('물품 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <ItemAddEdit 
            title="물품 추가" 
            buttonText="추가하기"
            onSubmit={handleSubmit} />
    )
};

export default ManageItemAdd;