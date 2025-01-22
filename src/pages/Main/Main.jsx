import MainPage from '../../components/page/MainPage';
import { useContext } from 'react';
import { UserContext } from '../../hooks/userContext';

const Main = () => {
    const currentUser = useContext(UserContext);
    if (!currentUser) {
        return <div>올바르지 않은 접근입니다.</div>;
    }
    return (
        <MainPage userId={currentUser.user_id}/>
    );
};

export default Main;