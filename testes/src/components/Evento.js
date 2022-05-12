import Button from './evento/Button'

function Evento() {
  function meuEvento() {
    console.log(`Ativando o primeiro evento!`);
  }

  function segundoEvento() {
    console.log('Ativando o segundo evento!')
  }

  //<button onClick={meuEvento}>Ativar!</button>
  return (
    <div>
      <p>Clique para desparar um evento:</p>
      <Button event={meuEvento} text="Primeiro evento"/>
      <Button event={segundoEvento} text="Segundo evento"/>
    </div>
  )
}

export default Evento