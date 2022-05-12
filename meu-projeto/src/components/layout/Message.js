import styles from './Message.module.css';
import { useState, useEffect } from 'react';

function Message({ type, msg }) {

  // A mensagem vai sumir, dependendo da condição
  // useState(false) - não começa exibindo
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Se não tiver mensagem (msg = false), não fica visível
    if (!msg) {
      setVisible(false)
      return
    }

    // Torna a mensagem visível
    setVisible(true)

    // Após 3000ms (3s), a mensagem fica invisível de novo
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [msg])

  // Temos abaixo o elemento pai
  return (
    <>
      {/* Eliminar qualquer resquício da mensagem, se não tiver mais a mensagem */}
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  )
}

export default Message