import './App.css';
import './Responsive.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MessHome from './pages/MessHome';
import PrivateRouter from './Utils/PrivateRoute'
import {AuthProvider} from './Context/AuthContext'
import MessDetails from './pages/MessDetails';
import MonthView from './pages/MonthView';

function App() {
return (
  <>
    <Router>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route path='/messhome' element={<PrivateRouter><MessHome/></PrivateRouter>}/>
          <Route path='/messdetails' element={<PrivateRouter><MessDetails/></PrivateRouter>}/>
          <Route path='/monthview' element={<PrivateRouter><MonthView/></PrivateRouter>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </Router>
  </>
  )
}

export default App;
