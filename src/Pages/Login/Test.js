import React, { useState } from 'react';
import axios from 'axios';

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Endpoint para o login (substitua pela sua URL real)
      const apiUrl = 'http://localhost:3001/auth/login';

      // Dados para enviar no corpo da solicitação
      const requestData = {
        username: username,
        password: password,
      };

      // Realiza a solicitação POST usando o Axios
      const response = await axios.post(apiUrl, requestData);

      // O servidor respondeu com sucesso
      console.log('Resposta do servidor:', response.data);

      // Você pode adicionar lógica adicional aqui, como redirecionar para outra página
    } catch (error) {
      // Ocorreu um erro durante a solicitação
      console.error('Erro durante a solicitação:', error.message);

      // Define o estado de erro para exibir na tela
      setError('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default login;
