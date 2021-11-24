import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";

function Project() {
  // consegue capturar o id vindo da url
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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
                <div>
                  <p>Detalhes do Projeto</p>
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
