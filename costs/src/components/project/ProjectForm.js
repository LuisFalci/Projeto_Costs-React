import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";


function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project) 
  }

  //Acessa o nome do projeto e muda para o que inserirmos
  function handleChange(e){
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handleCategory(e){
    setProject({ 
      ...project, 
      category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text, //pega a opção que selecionamos e transorma em texto

    }})
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento do projeto"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
        // em value, se tivermos category, passamos o category.id, se não, passamos um valor vazio 
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
