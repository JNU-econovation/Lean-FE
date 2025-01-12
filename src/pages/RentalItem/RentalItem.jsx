import StudentCouncilList from "../../components/Box/StudentCouncilList";
import Navbar from "../../components/Navbar/Navbar";
import style from "./RentalItem.module.css"
import { useNavigate } from "react-router-dom";
const RentalItem = () => {
    const navigate = useNavigate();
    const tempStudentCouncilList = [
        {   name : "총학생회 HEYDAY",
            address : "제1학생회관" },
        {   name : "사회과학대학 사심",
            address : "사회과학대학 305호" },
        {   name : "사회과학대학 사심",
            address : "사회과학대학 305호" },
        {   name : "사회과학대학 사심",
            address : "사회과학대학 305호" },

    ]
    return(
        <div className={`pageContainer ${style.container}`}>
            <Navbar 
                title={"물품 대여"} 
                onBackClick={() => window.history.back()}
                shadow={true}/>
            <hr/>
            {tempStudentCouncilList.map((item, index) => (
                <StudentCouncilList 
                    key={index}
                    name={item.name} 
                    address={item.address}
                    onClick={() => navigate('/rent/item')}/>
            ))}
        </div>
    )
}

export default RentalItem