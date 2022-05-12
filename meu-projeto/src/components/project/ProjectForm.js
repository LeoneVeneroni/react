import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

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

  const submit = (e) => {
    e.preventDefault() // não deixa o formulário ser executado como page reload, como é o padrão do html
    //console.log(project);
    handleSubmit(project) // executo método passado pela prop e passo o projeto cadastrado no formulário
  }

  function handleChange(e) {
    // altera o nome do projeto
    // ...project - destructuring dos dados (STATE do project até o momento)
    // e.target.name - nome do input (neste caso, 'name' ou 'budget')
    // e.target.value - o que eu escrever no input
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    // altera o nome do projeto
    setProject({
      ...project,
      category: {
        id: e.target.value, // valor do input
        name: e.target.options[e.target.selectedIndex].text,
        // e.target.options - associa ao campo de opções
        // e.target.selectedIndex - permite acessar a opção selecionda
        // [e.target.selectedIndex].text - permite acessar ao texto da opção selecionada
      }
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm