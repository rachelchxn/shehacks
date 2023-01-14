import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Scan from './Scan';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/scan' exact element={<Scan/>} />
      </Routes>
    </BrowserRouter>
    {/* <footer>
      <container>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </container>
    </footer> */}
    </div>
  );
}

export default App;
