import { useState, useEffect } from 'react';
import './ModalEdicaoProfessor.css';
import axios from 'axios';
import { toast } from 'sonner';

export const ModalEdicaoProfessor = ({ professor, setView, atualizarListaProfessores }) => {
    const [professorData, setProfessorData] = useState({
        name: '',
        cpf: '',
        matricula: '', 
        curso: '',
        email: '',
        password: '',
        confirmpassword: '',
        typeofuser: '1'
    });

    useEffect(() => {
        if (professor) {
            setProfessorData({
                name: professor.name || '',
                cpf: professor.cpf || '',
                matricula: professor.matricula || '', 
                curso: professor.curso || '',
                email: professor.email || '',
                password: '',
                confirmpassword: '',
                typeofuser: professor.typeofuser || '1'
            });
        }
    }, [professor]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfessorData({
            ...professorData,
            [name]: value
        });
    };

    const updateProfessor = async () => {
        const { password, confirmpassword, ...dataToUpdate } = professorData;

        // Verificação de senha
        if (password !== confirmpassword) {
            toast.error("As senhas não correspondem");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/user/matricula/${professorData.matricula}`, dataToUpdate);
            toast.success("Professor atualizado com sucesso");
            setView(null);
            atualizarListaProfessores();
        } catch (error) {
            console.error("Erro ao atualizar professor:", error);
            toast.error("Erro ao atualizar professor");
        }
    };

    return (
        <section className="section-modal-card-edital">
            <div className="box-modal-card-edital">
                <div className="box-header-modal-edital">
                    <h1 className="titulo-modal-card-edital">Edição de usuário</h1>
                    <button className="button-fechar-modal-edital" onClick={() => setView(null)}>x</button>
                </div>

                <h4 className='instrucao'>PROFESSOR</h4>
                <input
                    type='text'
                    placeholder='Clique para preencher'
                    name='name'
                    className='input-modal'
                    value={professorData.name}
                    onChange={handleChange}
                />

                <div className="form-row">
                    <div className="form-column">
                        <h4 className='instrucao'>MATRICULA</h4>
                        <input
                            type='text'
                            placeholder='Clique para preencher'
                            name='matricula'
                            className='input-modal'
                            value={professorData.matricula}
                            readOnly
                        />
                    </div>

                    <div className="form-column">
                        <h4 className='instrucao'>Tipo de usuário</h4>
                        <select
                            name='typeofuser'
                            className='input-modal'
                            value={professorData.typeofuser}
                            onChange={handleChange}
                        >
                            <option value="1">Professor Doutor</option>
                            <option value="2">Coordenador</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <h4 className='instrucao'>CPF</h4>
                        <input
                            type='text'
                            placeholder='Clique para preencher'
                            name='cpf'
                            className='input-modal'
                            value={professorData.cpf}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-column">
                        <h4 className='instrucao'>CURSO</h4>
                        <input
                            type='text'
                            placeholder='Clique para preencher'
                            name='curso'
                            className='input-modal'
                            value={professorData.curso}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h4 className='instrucao'>E-mail</h4>
                <input
                    type="text"
                    placeholder='Clique para preencher'
                    name='email'
                    className='input-modal'
                    value={professorData.email}
                    onChange={handleChange}
                />

                <div className="form-row">
                    <div className="form-column">
                        <h4 className='instrucao'>Senha</h4>
                        <input
                            type="password"
                            placeholder='Clique para preencher'
                            name='password'
                            className='input-modal'
                            value={professorData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-column">
                        <h4 className='instrucao'>Confirmar Senha</h4>
                        <input
                            type="password"
                            placeholder='Clique para preencher'
                            name='confirmpassword'
                            className='input-modal'
                            value={professorData.confirmpassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='box-botoes-modal'>
                    <button
                        className='botao-avaliar-contrato'
                        onClick={updateProfessor}
                        disabled={!professorData.name || !professorData.matricula || !professorData.cpf || !professorData.curso || !professorData.email || !professorData.password || !professorData.confirmpassword}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ModalEdicaoProfessor;