import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ btnText }) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }) // Fiz uma fetch api para a url de categories
      .then((resp) => resp.json()) // transforma os dados da resposta em json
      .then((data) => {
        setCategories(data)
      }) // Peguei os dados em json e coloquei no hook de setCategories
      .catch((err) => console.log(err))
  }, [])

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
      // handleOnChange=""
      // value=""
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
      // handleOnChange=""
      // value=""
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm