import "./App.css";
import HelloWorld from "./components/HelloWorld";
import SayMyName from "./components/SayMyName";
import Pessoa from "./components/Pessoa";
import List from "./components/List";
import Evento from "./components/Evento";
import Form from "./components/Form";

function App() {
  const name = "Luis";
  const newName = name.toUpperCase();

  function sum(a, b) {
    return a + b;
  }

  const url =
    "https://www.petz.com.br/blog/wp-content/uploads/2021/03/piercing-para-cachorro-2.jpg";

  return (
    <div className="App">
      <Evento />
      <Form />
      <h1>Olá, {newName}</h1>
      <h1>Soma, {sum(1, 2)}</h1>
      <img src={url} alt="Minha Imagem" />
      <HelloWorld />
      <SayMyName nome="Gustavo" />
      <SayMyName nome="João" />
      <SayMyName nome={name} />

      <Pessoa
        nome="Caule"
        idade="12"
        profissao="estudante"
        foto="https://fw.atarde.uol.com.br/2021/11/750_jovem-exame-pm_20211162093361.jpg"
      />
      
      <List />
    </div>
  );
}

export default App;
