import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Main from './pages/Main/Main';
import MainAdmin from './pages/Main/MainAdmin';
import MyPage from './pages/Main/MyPage';
import RentalInfo from './pages/RentalInfo/RentalInfo';
import RentalInfoDetail from './pages/RentalInfo/RentalInfoDetail';
import ReturnRequest from './pages/ReturnRequest/ReturnRequest';
import ReturnRequestComplete from './pages/ReturnRequest/ReturnRequestComplete';
import RentalItem from './pages/RentalItem/RentalItem';
import RentalItemSelect from './pages/RentalItem/RentalItemSelect';
import RentalTimeSelect from './pages/RentalItem/RentalTimeSelect';
import RentalItemComplete from './pages/RentalItem/RentalItemComplete';
import ManageItem from './pages/ManageItem/ManageItem';
import ManageItemDelete from './pages/ManageItem/ManageItemDelete';
import ManageItemAdd from './pages/ManageItem/ManageItemAdd';
import ManageItemInfo from './pages/ManageItem/ManageItemInfo';
import ManageItemEdit from './pages/ManageItem/ManageItemEdit';
import ReservationInfo from './pages/ReservationInfo/ReservationInfo';
import ReservationInfoDetail from './pages/ReservationInfo/ReservationInfoDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/main" element={<Main />} />
                <Route path="/admin/main" element={<MainAdmin />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/rent/info" element={<RentalInfo />} />
                <Route path="/rent/info/detail" element={<RentalInfoDetail />} />
                <Route path="/rent/return" element={<ReturnRequest/>}/>
                <Route path="/rent/return/complete" element={<ReturnRequestComplete/>}/>
                <Route path="/rent" element={<RentalItem/>}/>
                <Route path="/rent/item" element={<RentalItemSelect/>}/>
                <Route path="/rent/item/time" element={<RentalTimeSelect/>}/>
                <Route path="/rent/item/complete" element={<RentalItemComplete/>}/>
                <Route path="/manage/item" element={<ManageItem/>}/>
                <Route path="/manage/item/delete" element={<ManageItemDelete/>}/>
                <Route path="/manage/item/add" element={<ManageItemAdd/>}/>
                <Route path="/manage/item/info" element={<ManageItemInfo/>}/>
                <Route path="/manage/item/edit" element={<ManageItemEdit/>}/>
                <Route path="/reservation/info" element={<ReservationInfo/>}/>
                <Route path="/reservation/info/detail" element={<ReservationInfoDetail/>}/>
            </Routes>
        </Router>
    );
};

export default App;