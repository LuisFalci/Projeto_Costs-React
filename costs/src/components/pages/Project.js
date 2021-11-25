import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'



function Project() {
  // consegue capturar o id vindo da url
  const { id } = useParams();
  const [project, setProject] = useState([]);
  //const para saber quando precisamos aparecer ou esconder com o formulário
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [services, setServices] = useState([])
  //const para mostrar uma mensagem
  const [message, setMessage] = useState('')
  //const para saber o tipo da mensagem (se é de erro...)
  const [type, setType] = useState('success')

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            // dado resgatado do banco pelo parametro da url (id)
            setProject(data)
            setServices(data.services)
          }),
      0,
    )
  }, [id])


  // crud - edição
  function editPost(project){
    //Mudamos a mensagem para vazio para contornar o bug de n aparecer a mensagem quando editamos
    // repetidas vezes 
    setMessage('')
    //valida se o orçamenti é menor que o custo
    if(project.budget < project.cost){
      setMessage('O Orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

  fetch(`http://localhost:5000/projects/${project.id}`, {
    // o método PATCH atualiza só o que mandamos, diferente do update que atualiza tudo   
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    // mandando projeto como texto
    body: JSON.stringify(project),
  })
    .then((resp) => resp.json())
    .then((data) => {
      // altera os dados conforme editado
      setProject(data)
      //esconder formulário
      setShowProjectForm(!showProjectForm)
      // mensagem
      setMessage('Projeto atualizado!')
      setType('success')
    })
}

function createService(project) {
  // last service
  const lastService = project.services[project.services.length - 1]

  lastService.id = uuidv4()

  const lastServiceCost = lastService.cost

  const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

  // maximum value validation
  if (newCost > parseFloat(project.budget)) {
    setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
    setType('error')
    project.services.pop()
    return false
  }

  // add service cost to project cost total
  project.cost = newCost

  fetch(`http://localhost:5000/projects/${project.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })
    .then((resp) => resp.json())
    .then((data) => {
      setServices(data.services)
      setShowServiceForm(!showServiceForm)
      setMessage('Serviço adicionado!')
      setType('success')
    })
}

function removeService(id, cost) {
  const servicesUpdated = project.services.filter(
    (service) => service.id !== id,
  )

  const projectUpdated = project

  projectUpdated.services = servicesUpdated
  projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

  fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectUpdated),
  })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(projectUpdated)
      setServices(servicesUpdated)
      setMessage('Serviço removido com sucesso!')
    })
}

  function toggleProjectForm() {
    //inverte o show, se tá true fica false e vice versa
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  

  // retorno: simula um load enquanto busca o project name
  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
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
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
              </button>
              <div className={styles.form}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
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
