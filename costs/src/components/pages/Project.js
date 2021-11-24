import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'


function Project() {
  // consegue capturar o id vindo da url
  const { id } = useParams();
  const [project, setProject] = useState([]);
  //const para saber quando precisamos aparecer ou esconder com o formulário
  const [showProjectForm, setShowProjectForm] = useState(false);
  //const para mostrar uma mensagem
  const [message, setMessage] = useState('')
  //const para saber o tipo da mensagem (se é de erro...)
  const [type, setType] = useState('success')

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          // dado resgatado do banco pelo parametro da url (id)
          setProject(data);
        });
    }, 1000);
  }, [id]);


  // crud - edição
  function editPost(project){
    //budget validation
    if(project.budget < project.cost){
      setMessage('O Orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      // o método PATCH atualiza só o que mandamos, diferente do update que atualiza tudo
      method:'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      // mandando projeto como texto
      body: JSON.stringify(project),
    })
    .then(resp => resp.json())
    .then((data) => {
      // altera os dados conforme editado
      setProject(data);
      //esconder formulário
      setShowProjectForm(false)
      // mensagem
      setMessage('Projeto atualizado!')
      setType('success')
    })
    .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    //inverte o show, se tá true fica false e vice versa
    setShowProjectForm(!showProjectForm);
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
                {/* se não estiver exibindo o project form, exibir o texto Editar projeto
                    Caso contrário, exibir o texto Fechar */}
                {!showProjectForm ? "Editar projeto" : "Fechar"}
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
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
