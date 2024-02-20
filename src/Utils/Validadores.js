const validarEmail = (email) =>{
    return email?.toString().includes('@')&& email?.toString().includes('.')
}


const validarMatricula = (matricula) => {
    const matriculaString = matricula?.toString();
    
    const regex = /^\d{1,7}$/;
  
    //const isValid = matriculaString && regex.test(matriculaString);
  
    
      return matriculaString && regex.test(matriculaString);
}

//Validação da senha - Modificar 
const validarSenha = (senha) =>{
   return senha?.toString().length == 8
} 

export{
    validarEmail,
    validarSenha,
    validarMatricula
}