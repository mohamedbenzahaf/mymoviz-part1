
import Link from 'next/link';
import styles from '../styles/Menu.module.css';

function Menu() {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>Navigate with me</span>
      <div className={styles.linkContainer}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/shop" className={styles.link}>Shop</Link>
        <Link href="/about" className={styles.link}>About</Link>
      </div>
    </div>
  );
}

export default Menu;
