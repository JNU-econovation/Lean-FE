import style from './ManageItemInfo.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useState, useEffect } from 'react';

const ManageItemInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemId, itemName, studentCouncilAddress } = location.state || {}; // state로 전달
    const [itemInfo, setItemInfo] = useState({
        itemAmount: 0,
        processAmount: 0,
        rentAmount: 0,
        stock: 0,
    });

    // state가 없으면 리다이렉트 처리
    useEffect(() => {
        if (!itemId || !itemName || !studentCouncilAddress) {
            console.warn("State is missing. Redirecting to the previous page.");
            navigate('/manage/item'); // 리다이렉트 경로
        }
    }, [itemId, itemName, studentCouncilAddress, navigate]);

    // API 요청
    useEffect(() => {
        const fetchItemInfo = async () => {
            try {
                const response = await apiClient.get(`/api/v1/items/amounts/${itemId}`);
                setItemInfo(response.data); // 응답 데이터로 상태 업데이트
            } catch (error) {
                console.error('Failed to fetch item info:', error);
            }
        };

        fetchItemInfo();
    }, [itemId]);

    return (
        <div className={`${style.container} pageContainer`}>
            <Navbar title="물품 정보 보기" shadow={true} home={true}  isStudentCouncil={true} onBackClick={() => window.history.back()}/>
            <div className={style.itemBox}>
                <div className={`${style.itemImage} circle`}>

                </div>
                <div className={style.itemNameBox}>
                    <p className={style.name}>{itemName}</p>
                    <p className={style.address}>{studentCouncilAddress}</p>
                </div>
            </div>
            <hr/>
            <div className={style.itemInfoBox}>
                <div className={style.textBox}>
                    <p>재고</p>
                    <p className={style.amount}>{itemInfo.stock}</p>
                </div>
                <div className={style.textBox}>
                    <p>대여중</p>
                    <p className={style.amount}>{itemInfo.rentAmount}</p>
                </div>
                <div className={style.textBox}>
                    <p>대여 예약</p>
                    <p className={style.amount}>{itemInfo.processAmount}</p>
                </div>
                <div className={style.textBox}>
                    <p>총량</p>
                    <p className={style.amount}>{itemInfo.itemAmount}</p>
                </div>
            </div>
            <Button
                    text="수정하기"
                    onClick={()=>navigate('/manage/item/edit', {
                        state: {
                            itemId,
                            itemName,
                            itemAmount: itemInfo.itemAmount
                        }
                    })}                    
                    className={`fixWidth ${style.itemEditButton}`}
                />
        </div>
    )
};

export default ManageItemInfo;