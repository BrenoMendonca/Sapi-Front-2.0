import { useEffect, useState } from "react";
import axios from 'axios';
import './../BuscaProfessor/BuscaProfessor.css';

export const BuscaProfessor = () => {
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false)
    
    useEffect(() => {
        console.log(search)
    }, [])

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:3001/user/search-users", {
                params: {
                    mat: searchTerm
                }
            });

            const searchData = response.data;
            setSearch(searchData);
            setHasSearched(true)
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

            <form className="search-results-form-box">
                {hasSearched === false ? 
                    null
                :
                    (
                        search.length !== 0 ? 
                            search.map(term => {
                                return (
                                
                                    <div className="search-results-info">
                                        <input type="checkbox" name="" id="" />
                                        <label>{term.matricula}</label>
                                    </div>
                                    
                                )
                            }
                        )
                        :
                        <p>Professor não encontrado.</p>
                    )
                }

                {hasSearched && search.length !== 0 && (
                    <button className="btn-search-prof-by-mat">Selecionar</button>
                )}
                
            </form>

        </div>
    );
};
