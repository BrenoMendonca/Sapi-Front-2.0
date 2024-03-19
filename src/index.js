import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'sonner';

/*
const router = createBrowserRouter([
{path:"/",element: <Login/>},
{path:"/login",element: <Login/>},
{path:"PaginaInicio",element: <PaginaInicio/>}
]);
*/



//<App /> -- implementar no App.js e importar pra ca com o App
const root = ReactDOM.createRoot(document.getElementById('root'));
// <RouterProvider router={router}/>
root.render(
   
      <React.StrictMode>
            <Toaster richColors />
            <App/>
      </React.StrictMode>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
