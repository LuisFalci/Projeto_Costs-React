import './App.css';

function App() {
  
  const name = 'Luis'
  const newName = name.toUpperCase()

  function sum(a, b){
    return a + b
  }

  const url = 'https://www.petz.com.br/blog/wp-content/uploads/2021/03/piercing-para-cachorro-2.jpg'

  return (
    <div className="App">
      <h1>Olá, {newName}</h1>
      <h1>Soma, {sum(1,2)}</h1>
      <img src={url} alt="Minha Imagem"/>
    </div>
  );
}

export default App;
