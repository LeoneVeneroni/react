import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // cria um id único e serve para renderizar as listas do react

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../services/ServiceForm';
import ServiceCard from '../services/ServiceCard';

function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data)
          setServices(data.services)
        })
        .catch((err) => console.log(err))
    }, 300);
  }, [id])

  function editPost(project) {

    // Método serve para mostrar sempre a mensagem quando se altera algum dado. Caso contrário, não mostraria se a mensagem fosse do mesmo tipo (ex: success)
    //setMessage('')

    // validação do orçamento
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor do que o custo do projeto!')
      setType('error')
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH', // PATCH é um verbo do http que só altera o que realmente mudar no banco de dados, ao contrário do UPDATE
      headers: {
        'Content-Type': 'application/json', // para se comunicar em json com a API
      },
      body: JSON.stringify(project), // manda o projeto como texto (string)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data) // muda de estado (state)
        setShowProjectForm(!showProjectForm)
        setShowProjectForm(false) // mostrar o contrário do que está (esconde o formulário após a edição)
        setMessage('Projeto atualizado!')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  function createService(project) {

    //setMessage('')

    // último serviço
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    // custo atual do projeto + custo do último serviço
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // validação do valor máximo
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop() // remove o serviço, que está no objeto do projeto
      return false
    }

    // adiciona o custo total para proteger o custo total do serviço
    project.cost = newCost;

    // atualiza o projeto
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH', // PATCH é para atualizar dados parciais do projeto
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(!showServiceForm)
        setMessage('Serviço adicionado!')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    ) // só fica os serviços que não têm o 'id' igual ao 'id' removido

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated // atualiza os serviços sem o serviço removido
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost) // remove o custo do serviço pelo custo de projeto

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then(() => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
      })
      .catch((err) => console.log(err))
  }

  function toggleProjectForm() {
    // inverte showProjectForm, se estiver 'true' vira 'false', se estiver 'false' vira 'true'
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    // inverte showProjectForm, se estiver 'true' vira 'false', se estiver 'false' vira 'true'
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {/* Se tiver um 'message', exibe o componente de mensagem (Message)*/}
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && 
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar serviço"
                  projectData={project}
                />}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.key}
                    handleRemove={removeService}
                  />
                ))
              }
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project