import './App.css';

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;


/*
const [alerta, setAlerta] = useState(null)
  const logar = async () =>{
    var params = {
        "login":"login",
        "senha":"senha"
    }
    //var autenticar = await Post('endpointLogin', params)
    var autenticar = {
      error:"Credenciais Inválidas"
    } 
    if(autenticar.hasOwnProperty('error')){
      setTimeout(() => {
        setAlerta(null)
      }, 6000);
      setAlerta(autenticar.error)
      return
    }
  }
*/