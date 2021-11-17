import "./App.css";
import HelloWorld from "./components/HelloWorld";
import SayMyName from "./components/SayMyName";
import Pessoa from "./components/Pessoa";
import List from "./components/List";
import Evento from "./components/Evento";
import Form from "./components/Form";
import Condicional from "./components/Condicional";
import OutraLista from "./components/OutraLista";
import { useState } from "react";
import SeuNome from "./components/SeuNome";
import Saudacao from "./components/Saudacao";

function App() {
  const name = "Luis";
  const newName = name.toUpperCase();
  const meusItens = ['Reaact', 'Vue', 'Angular']
  const [nome, setNome] = useState()

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
      <br />
      <Condicional />

      <h1>Renderização de Listas</h1>
      <OutraLista itens={meusItens} />
      <br />
      <h1>State Lift</h1>
      <SeuNome setNome={setNome} />
      {nome}
      <Saudacao nome={nome} /> 
      {/* Em SeuNome setamos um nome
          Em Saudacao damos get do nome
      */}

    </div>
  );
}

export default App;
