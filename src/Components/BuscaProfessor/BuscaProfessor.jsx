import { useState } from "react";
import axios from 'axios';
import './../BuscaProfessor/BuscaProfessor.css';

export const BuscaProfessor = () => {
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:3001/user/search-users", {
                params: {
                    mat: searchTerm
                }
            });

            const searchData = response.data;
            setSearch(searchData);
            console.log(searchData)

        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className='add-prof-inputs'>
            <strong>Digite a matrícula do professor que deseja adicionar como avaliador:</strong>
            <span>
                <input 
                    type="search" 
                    incremental 
                    name="search-prof" 
                    id="search-prof" 
                    value={searchTerm} 
                    onChange={e => {setSearchTerm(e.target.value)}}
                />
                <input 
                    type="submit" 
                    value="Pesquisar" 
                    onClick={handleSearch} 
                />
            </span>

            <div className="search-results-box">
                {search.length !== 0 ? 
                    search.map(term => {
                        return (
                            <span>{term.matricula}</span>
                        )
                    })
                    :
                    <p>Professor não encontrado.</p>
                }
            </div>
        </div>
    );
};
