import styles from '../styles/Menu.module.css';

function Menu() {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>Navigate with me</span>
      <div className={styles.linkContainer}>
        <span className={styles.link}>Home</span>
        <span className={styles.link}>Shop</span>
        <span className={styles.link}>About</span>
      </div>
    </div>
  );
}

export default Menu;
