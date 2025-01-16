import MainPage from '../../components/page/MainPage';
import { USER_ID } from '../../constants/userId';
const Main = () => {
    return (
        <MainPage userId={USER_ID.USER}/>
    );
};

export default Main;