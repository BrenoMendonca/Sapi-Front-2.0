import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Login} from '../src/Pages/Login/Login'
import {PaginaInicio} from '../src/Pages/PaginaInicio/PaginaInicio'
import './App.css';
import { PaginaEdital } from './Pages/PaginaEdital/PaginaEdital';

function App() {
  return (
    <BrowserRouter>
    <Routes>          
     <Route path="/" element= {<Login/>} />
     <Route path="/login" element= {<Login/>}/>
     <Route path="PaginaInicio" element= {<PaginaInicio/>}/>
     <Route path="edital/:id" element={<PaginaEdital />} />
   </Routes>
    </BrowserRouter>
  );
}

export default App;
