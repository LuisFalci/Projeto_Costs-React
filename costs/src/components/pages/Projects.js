import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from "../layout/Container";
import styles from "./Projects.module.css";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from '../layout/Loading';


function Projects() {

  const [removeLoading, setRemoveLoading] = useState(false)
  const[projects, setProjects] = useState([])
  //busca de onde veio a mensagem
  const location = useLocation();
  let message = "";
  //se o local de onde veio a mensagem tiver mensagem, guardamos ela
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(
      () => {
        fetch('http://localhost:5000/projects',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
          })
          .catch((err) => console.log(err))
      }, 3000)
  }, [])

  

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 && 
        projects.map((project) => (
          <ProjectCard
          id={project.id}
          name={project.name}
          budget={project.budget}
          category={project.category.name}
          key={project.id}
        />
        ))}
      {!removeLoading && <Loading />}
      {removeLoading && projects.length === 0 && (
        <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
