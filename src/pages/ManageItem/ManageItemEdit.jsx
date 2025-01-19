import ItemAddEdit from "../../components/page/ItemAddEdit";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useState } from "react";

const ManageItemEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {itemId, itemName, itemAmount} = location.state || {};

    const handleSubmit = async (updateData) => {
        const {amount} = updateData;
        console.log('Submitting PUT request with:', { itemId, amount });
        try {
            const response = await apiClient.put(`/api/v1/items/amounts/${itemId}`, {
                amount
            });

            console.log('Item updated successfully:', response.data);
            alert('수정이 완료되었습니다.');

            // 수정 완료 후 이전 페이지로 이동
            navigate('/manage/item');
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('수정 중 오류가 발생했습니다.');
        }
    }

    return (
        <ItemAddEdit 
            title="물품 수정" 
            buttonText="수정하기" 
            data={{
                itemName,
                itemAmount}}
            onSubmit={handleSubmit} 
        />
    )
};

export default ManageItemEdit;