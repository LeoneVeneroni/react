import PropTypes from 'prop-types'

function Item({ nome, ano_nascimento}) {
  return (
    <>
      <li>{nome} - {ano_nascimento}</li>
    </>
  )
}

/* 
nome: PropTypes.string
se eu colocar um número -> erro
se eu colocar uma string com ou sem o parâmatro 'nome' -> funciona

nome: PropTypes.string.isRequired
se eu colocar um número -> erro
se eu colocar uma string com o parâmatro 'nome' -> funciona
se eu colocar uma string sem o parâmatro 'nome' -> erro

Raciocínio similar em ano_nascimento: PropTypes.number
*/
 Item.propTypes = {
  nome: PropTypes.string,
  ano_nascimento: PropTypes.number
}

// Se eu não indicar valores para 'nome' e 'ano_nascimento' nos itens, vai se colocar esses de baixo. Assim, o .isRequired se torna inútil, pois sempre haverá um dado passado.
Item.defaultProps = {
  nome: 'Sueli',
  ano_nascimento: 1960
}

export default Item