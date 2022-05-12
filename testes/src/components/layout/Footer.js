import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css'

function Footer() {
  return (
  <footer>
    <ul className={styles.social_list}>
      <li>
        <FaFacebook />
      </li>
      <li>
        <FaInstagram />
      </li>
      <li>
        <FaLinkedin />
      </li>
      <li>
        <FaTwitter />
      </li>
    </ul>
  </footer>
  )
}

export default Footer