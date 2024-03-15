import { BrowserRouter, Route, Routes, createBrowserRouter, createRoutesFromElements, Switch, useNavigate } from 'react-router-dom';
import {Login} from '../src/Pages/Login/Login'
import {PaginaInicio} from '../src/Pages/PaginaInicio/PaginaInicio'
import { PrivateRoutes } from './Utils/auth';
import './App.css';




  function App() {
  return (
    <BrowserRouter>
    <Routes>  
      <Route element={<PrivateRoutes/>}>
        <Route path="/PaginaInicio" exact element= {<PaginaInicio/>}/>
      </Route>

      <Route path="/login"element= {<Login/>}/>
      <Route path="/"element= {<Login/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
