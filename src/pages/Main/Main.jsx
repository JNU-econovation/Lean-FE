import MainPage from '../../components/page/MainPage';
import { useContext } from 'react';
import { UserContext } from '../../hooks/userContext';

const Main = () => {
    const currentUser = useContext(UserContext);
    if (!currentUser) {
        return <div>Loading...</div>;
    }
    return (
        <MainPage userId={currentUser.user_id}/>
    );
};

export default Main;