import { BrowserRouter, Route, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {Login} from '../src/Pages/Login/Login'
import {PaginaInicio} from '../src/Pages/PaginaInicio/PaginaInicio'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>          
     <Route path="/"element= {<Login/>} />
     <Route path="/login"element= {<Login/>}/>
     <Route path="PaginaInicio"element= {<PaginaInicio/>}/>
   </Routes>
    </BrowserRouter>
  );
}

export default App;
