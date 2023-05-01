import { Route, Routes} from 'react-router-dom';
import './sass/global.scss';
import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Footer from './components/Footer';
import Booking from './components/Booking';
import Contactus from './components/ContactUs';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import EditUser from './components/EditUser';
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/home' element={<Home/>}> </Route>
                <Route path='/account' element={<PrivateRoute> <Account/> </PrivateRoute>}> </Route>
                <Route path='/booking' element={<PrivateRoute> <Booking/> </PrivateRoute>}> </Route>
                <Route path='/contact-us' element={<Contactus/>}> </Route>
                <Route path='/create-user' element={<CreateUser/>}> </Route>
                <Route path='/login' element={<Login/>}> </Route>
                <Route path='/edit-user' element={<EditUser/>}> </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
