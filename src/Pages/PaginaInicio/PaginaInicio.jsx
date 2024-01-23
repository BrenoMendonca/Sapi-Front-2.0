import { useLayoutEffect, useState } from "react";


export const PaginaInicio = () =>{
    const [user, setUser] = useState(null)
    const [editais, setEdital] = useState([])
    useLayoutEffect(() =>{
        //chamar a função
        setUser({
            nome:"User Teste",
            tipo:"prof"
        })
    },[])

    return(
        <div>
            {user != null &&(
                user.tipo == "prof"
                ?
                <h1>Olá professor</h1>
                :
                <h1>Olá Aluno</h1>
            )}
            {user != null && user.tipo == "prof" &&(
                <h1>Formulario Edital</h1>
            )}
            {/* 
            {editais != null &&(
                editais.map(item =>
                <ComponenteEdital item={item} />    
                )
            )}
            */}

        </div>
    )
};

export default PaginaInicio;