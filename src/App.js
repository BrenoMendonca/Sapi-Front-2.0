import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Login} from '../src/Pages/Login/Login'
import {PaginaInicio} from '../src/Pages/PaginaInicio/PaginaInicio'
import { PrivateRoutes } from './Utils/auth';
import './App.css';
import { PaginaEdital } from './Pages/PaginaEdital/PaginaEdital';
import { PaginaSubmissao } from './Pages/PaginaSubmissao/PaginaSubmissao';
import { PaginaProfessores } from './Pages/PaginaProfessores/PaginaProfessores';
import { MinhaConta } from './Pages/MinhaConta/MinhaConta';
import {Login2} from './Pages/Login2/Login2'

  function App() {
  return (
    <BrowserRouter>
    <Routes>  
      <Route element={<PrivateRoutes/>}>
        <Route path="/PaginaInicio" exact element= {<PaginaInicio/>}/>
        <Route path="/PaginaProfessores" exact element = {<PaginaProfessores/>}/>
        <Route path ="/minhaconta" element = {<MinhaConta/>}/>
        <Route path="/edital/:id" element={<PaginaEdital />} />
        <Route path="/edital/:idEdital/submissao/:idSubmissao" element={<PaginaSubmissao />} />
      </Route>
      <Route path="/login2"element= {<Login2/>}/>
      <Route path="/login"element= {<Login/>}/>
      <Route path="/"element= {<Login/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
