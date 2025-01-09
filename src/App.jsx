import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Main from './pages/Main/Main';
import MyPage from './pages/Main/MyPage';
import RentalInfo from './pages/RentalInfo/RentalInfo';

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
            </Routes>
        </Router>
    );
};

export default App;