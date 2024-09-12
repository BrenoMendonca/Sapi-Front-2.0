import { useState } from 'react';
import './ModalProfessores.css';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash } from '@phosphor-icons/react';

export const ModalProfessores = ({ setView, atualizarListaProfessores }) => {
    const [professor, setProfessor] = useState({
        name: '',
        cpf: '',
        matricula: '', 
        curso: '',
        email: '',
        password: '',
        confirmpassword: '',
        typeofuser:'1'
    });

    // Definindo a função handleChange com log adicional
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`Campo: ${name}, Valor: ${value}`); // Verifica se o valor está sendo capturado corretamente
        setProfessor({
            ...professor,
            [name]: value
        });
    };

    const createProfessor = async () => {
        const formattedProfessor = {
            ...professor,
        };
        console.log('Dados enviados para a API:', formattedProfessor);

        try {
            const response = await axios.post("http://localhost:3001/auth/register", formattedProfessor);
            atualizarListaProfessores();
            toast.success(response.data.msg);
            setView(null); 
        } catch (err) {
            
            toast.error(JSON.stringify(err.response.data.msg));
            console.log(err);
        }
    };

    return (
        <section className="section-modal-card-edital">
            <div className="box-modal-card-edital">
                <div className="box-header-modal-edital">
                    <h1 className="titulo-modal-card-edital">Cadastro docente doutor</h1>
                    <button className="button-fechar-modal-edital" onClick={() => setView(null)}>x</button>
                </div>

                <h4 className='instrucao'>PROFESSOR</h4>
                <input
                    type='text'
                    placeholder='Clique para preencher'
                    name='name'
                    className='input-modal'
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
                        onChange={handleChange}
                        />
                    </div>

                    <div className="form-column">
                        <h4 className='instrucao'>Tipo de usuário</h4>
                        <select
                        name='role'
                        className='input-modal'
                        onChange={(e) => {
                            handleChange(e);  // Atualiza o valor do campo 'role'
                            const selectedValue = e.target.value;
                            let userType;

                            if (selectedValue === 'coordenador') {
                            userType = 100; // Coordenador
                            } else if (selectedValue === 'professor_doutor') {
                            userType = 2;  // Professor Doutor
                            }
                            
                            // Atualiza o valor de typeofuser com o número correto
                            handleChange({
                            target: { name: 'typeofuser', value: userType }
                            });
                        }}
                        >
                        <option value="">Selecione uma opção</option>
                        <option value="coordenador">Coordenador</option>
                        <option value="professor_doutor">Professor Doutor</option>
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
                    onChange={handleChange}
                    />
                </div>
            </div>

                <div className='box-botoes-modal'>
                    <button
                        className='botao-avaliar-contrato'
                        onClick={createProfessor}
                        disabled={!professor.name || !professor.matricula || !professor.cpf || !professor.curso || !professor.email || !professor.password || !professor.confirmpassword}
                    >
                        Criar
                    </button>
                </div>
            </div>
        </section>
    );
};