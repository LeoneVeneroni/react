import './App.css';
import { useState } from 'react';
import OlaMundo from './components/OlaMundo';
import DigaMeuNome from './components/DigaMeuNome';
import Pessoa from './components/Pessoa';
import List from './components/List';
import Evento from './components/Evento';
import Form from './components/Form';
import Condicional from './components/Condicional';
import OutraLista from './components/OutraLista';
import SeuNome from './components/SeuNome';
import Saudacao from './components/Saudacao';

function App() {

  const nomeMae = "Sueli";

  function soma(a, b) {
    return a + b
  }

  const [nome, setNome] = useState();

  const lista = ['React', 'Angular', 'Vue'];

  return (
    <div className="App">
      <OlaMundo />
      Soma: {soma(2, 9)}
      <Condicional />
      <Evento />
      <Form />
      <DigaMeuNome nome="Leone" />
      <DigaMeuNome nome={nomeMae} />
      <Pessoa
        nome="Lale"
        idade="60"
        profissao="esteticista"
        foto="https://via.placeholder.com/150"
      />
      <List />
      <h1>Renderização de Listas</h1>
      <OutraLista itens={lista} />
      <h1>State Lift</h1>
      <SeuNome setNome={setNome} />
      <Saudacao nome={nome} />
    </div>
  );
}

export default App;
