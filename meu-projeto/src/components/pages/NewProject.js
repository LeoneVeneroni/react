import styles from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';

function NewProject() {

  const navigate = useNavigate();

  function createPost(project) {
    // initializa cost and services
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project), // manda os dados (por post) para o servidor como string
    })
      .then((resp) => resp.json()) // transforma a resposta em json
      .then((data) => {
        console.log(data) // ver os dados vindo do backend
        //redirect
        navigate('/projects', { state: { message: 'Projeto criado com sucesso' }})
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depos adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject