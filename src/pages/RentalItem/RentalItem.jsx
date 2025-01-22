import StudentCouncilList from "../../components/Box/StudentCouncilList";
import Navbar from "../../components/Navbar/Navbar";
import style from "./RentalItem.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import apiClient from "../../services/apiClient";
import { UserContext } from "../../hooks/userContext";

const RentalItem = () => {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const [studentCouncilList, setStudentCouncilList] = useState([]);

    useEffect(() => {
        const fetchStudentCouncilData = async () => {
            try {
                const userResponse = await apiClient.get(`/api/v1/users/${currentUser.user_id}`);
                const { collegeName } = userResponse.data;
                const studentCouncilResponse = await apiClient.get(
                `/api/v1/users/student-council`
                );
                setStudentCouncilList(studentCouncilResponse.data.filter(
                    item => item.college === "총학생회" || item.college === collegeName))
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        
        fetchStudentCouncilData();
        }, [currentUser.user_id]);

    return(
        <div className={`pageContainer ${style.container}`}>
            <Navbar 
                title={"물품 대여"} 
                onBackClick={() => window.history.back()}
                shadow={true}/>
            <hr/>
            {studentCouncilList.map((item, index) => (
                <StudentCouncilList 
                    key={index}
                    name={item.name} 
                    address={item.address}
                    onClick={() => navigate(`/rent/item?id=${item.id}`)}/>
            ))}
        </div>
    )
}

export default RentalItem