import { useState } from 'react';

import styles from '../project/ProjectForm.module.css';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm({ handleSubmit, btnText, projectData }) {

  const [service, setService] = useState({})

  function submit(e) {
    e.preventDefault()
    projectData.services.push(service) // joga o serviço dentro dos serviços
    handleSubmit(projectData)
  }

  function handleChange(e) {
    // ...service - pega o objeto atual
    // e.target.name - nome do input que vai ser a chave da propriedade do objeto
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange} // muda o estado
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange} // muda o estado
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange} // muda o estado
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm