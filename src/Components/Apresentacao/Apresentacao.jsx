import React from 'react'
import { useEffect , useState } from 'react';
import '../Apresentacao/Apresentacao.css'

export const Apresentacao = () =>{

    const [name, setName] = useState(null);

    useEffect(() => {
        const sessionData = localStorage.getItem('session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          setName(session.name);
        }
      }, []);


    return(
        <div className='background-apresentacao'>
            <div className='wrapper-apresentacao'>
                <h1 className='apresentacao'>Olá, {name} 👋</h1>
            </div>
        </div>
    )
}

export default Apresentacao;