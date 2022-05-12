import { useState } from 'react'

function Condicional() {

  // [estado atual, função que atualiza o estado]
  const [email, setEmail] = useState();
  const [userEmail, setUserEmail] = useState();

  // faz com que 'setUserEmail' atribua a 'userEmail' o mesmo estado que 'email'.
  function enviarEmail(e) {
    e.preventDefault();
    setUserEmail(email);
    console.log(`${email} cadastrado com sucesso`);
  }

  // faz com que 'setUserEmail' atribua um estado vazio a 'userEmail'. Logo, vai dar 'false' lá embaixo.
  function limparEmail() {
    setUserEmail('');
  }

  return (
    <div>
      <h2>Condicional</h2>
      <form onSubmit={enviarEmail}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          Enviar
        </button>
        {userEmail && (
          <div>
            <p>O e-mail do usuário é: {userEmail}</p>
            <button onClick={limparEmail}>Limpar e-mail</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Condicional