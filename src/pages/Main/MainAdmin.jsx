import MainPage from '../../components/page/MainPage';
import { USER_ID } from '../../constants/userId';
const MainAdmin = () => {
    return (
        <MainPage userId={USER_ID.ADMIN}/>
    );
};

export default MainAdmin;