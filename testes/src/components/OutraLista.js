function OutraLista({ itens }) {
  return (
    <>
      <h3>Lista de coisas boas</h3>
      {/* operador ternário */}
      {itens.length > 0 ? (
        itens.map((itens, index) =>
          <p key={index}>{itens}</p>)
        ) : (
          <p>Não há itens na lista</p>
        )}
    </>
  )
}

export default OutraLista
