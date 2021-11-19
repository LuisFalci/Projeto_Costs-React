import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // se não tem mensagem de erro n deixa visivel:
    if(!msg){
        setVisible(false)
        return
    }
    // se tem mensagem de erro deixa visivel:
    setVisible(true)

    // começa o timer (enquanto estiver rodando a mensagem fica visível), no fim do timer mensagem n fica mais visível
    const timer = setTimeout(() => {
        setVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [msg])
  
  return (
    <>
    {/* If visible: */}
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
}

export default Message;
