import Item from './Item';

// As tags <></> são fragments. Sem isso (ou qualquer outra tag), não vai funcionar
// Os números têm que ser colocado entre chaves, ao contrário das strings
function List() {
  return (
    <>
      <h1>Minha Lista</h1>
      <ul>
        <Item nome="Thaís" ano_nascimento={1993} />
        <Item nome="William" ano_nascimento={1984} />
        <Item nome="Linda" ano_nascimento={1958}/>
        <Item />
      </ul>
    </>
  )
}

export default List