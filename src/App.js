import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter, Link, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import Scan from './Scan';
import Prompt from './components/Prompt';
import Connections from './components/Connections';
import Profile from './components/Profile';
import firebase from 'firebase/app';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';

function App() {

  const navigate = useNavigate

  const toHome = () => {
    navigate('/')
  }

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/scan' exact element={<Scan/>} />
          <Route path='/prompt' exact element={<Prompt/>} />
          <Route path='/connections' exact element={<Connections/> } />
          <Route path='/profile' exact element={<Profile/> } />
          <Route path='/signup' exact element={<Signup/> } />
          <Route path='/login' exact element={<Login/> } />
          <Route path='/create-profile' exact element={<CreateProfile/> } />
          <Route path='/edit-profile' exact element={<EditProfile/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
