import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
    return(
        <form className={styles.form}>
            <Input 
            type="text"
            text="Nome do Projeto"
            name="name"
            placeholder="Insira o nome do projeto"
             />
            <Input 
            type="number"
            text="Orçamento do Projeto"
            name="name"
            placeholder="Insira o orçamento do projeto"
             />
            <div>
                <Select name="category_id" text="Selecione a categoria" />
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}

export default ProjectForm