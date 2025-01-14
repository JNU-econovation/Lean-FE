import ItemAddEdit from "../../components/page/ItemAddEdit";

const ManageItemEdit = () => {
    const tempItemInfo = 
        {
            itemName: "우산(소)",
            itemAmount: 15
        }
    return (
        <ItemAddEdit 
            title="물품 수정" 
            buttonText="수정하기" 
            data={tempItemInfo}/>
    )
};

export default ManageItemEdit;