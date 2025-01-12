import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Main from './pages/Main/Main';
import MyPage from './pages/Main/MyPage';
import RentalInfo from './pages/RentalInfo/RentalInfo';
import RentalInfoDetail from './pages/RentalInfo/RentalInfoDetail';
import ReturnRequest from './pages/ReturnRequest/ReturnRequest';
import ReturnRequestComplete from './pages/ReturnRequest/ReturnRequestComplete';
import RentalItem from './pages/RentalItem/RentalItem';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/main" element={<Main />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/rent/info" element={<RentalInfo />} />
                <Route path="/rent/info/detail" element={<RentalInfoDetail />} />
                <Route path="/rent/return" element={<ReturnRequest/>}/>
                <Route path="/rent/return/complete" element={<ReturnRequestComplete/>}/>
                <Route path="/rent" element={<RentalItem/>}/>
            </Routes>
        </Router>
    );
};

export default App;