import { useState } from "react";
import axios from 'axios';
import './../BuscaProfessor/BuscaProfessor.css';
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const BuscaProfessor = ({ onAddAvaliador }) => {
    const { id } = useParams()
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false)
    const [selectedProfs, setSelectedProfs] = useState([])
    
    function handleSelectProfessor(event) {
        const { value, checked } = event.target

        if (checked) {
            setSelectedProfs([...selectedProfs, value])
        } else {
            setSelectedProfs(selectedProfs.filter(prof => prof !== value))
        }
    }

    const handleAddProfAvaliador = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3001/getEdital/add-prof-avaliador/${id}`, {
                matriculas:  selectedProfs
            })

            if (response.status === 201) {
                toast.success(response.data.msg);
                // Chame a função de adicionar avaliador passada como propriedade
                onAddAvaliador(selectedProfs);
                setSelectedProfs([]);
                window.location.reload()

            } else {
                toast.error(response.data.msg);
            }
            
        } catch (error) {
            // Se houver um erro na requisição, capture a mensagem de erro e exiba-a no toaster de erro
            if (error.response) {
                toast.error(error.response.data.erros[0]);

            } else {
                // Caso contrário, exiba uma mensagem de erro genérica
                toast.error('Erro ao processar a solicitação. Tente novamente mais tarde.');
            }
            console.error(error.response.data.msg);        
        }
    };

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
                                        <input 
                                            key={term.id}
                                            type="checkbox" 
                                            name={term.matricula} 
                                            id={term.matricula} 
                                            value={term.matricula}
                                            onChange={handleSelectProfessor}
                                        />
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
                    <button 
                        className="btn-search-prof-by-mat"
                        onClick={handleAddProfAvaliador}
                    >
                        Selecionar
                    </button>
                )}
                
            </form>

        </div>
    );
};
