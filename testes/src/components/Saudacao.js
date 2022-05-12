function Saudacao({ nome }) {
  function gerarSaudacao(algumNome) {
    return `Olá, ${algumNome}. Tudo bem?`
  }
  return (
    <>
      {/*Se tiver 'nome', efetue a função gerarSaudacao().
      Caso contrário, não faça nada*/}
      <p>{nome && gerarSaudacao(nome)}</p>
    </>
  )
}

export default Saudacao;
