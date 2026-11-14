import Dice from './Dice';
import styles from '../styles/Home.module.css';

function Home() {
  const dices = [1, 2, 3, 4, 5].map((n) => <Dice key={n} number={n} />);

  return (
    <div className={styles.main}>
      <img className={styles.logo} src="/logo.png" alt="Yams" />

      <div className={styles.triangles}>
        <div className={`${styles.left} ${styles.black}`}></div>
        <div className={`${styles.left} ${styles.red}`}></div>
        <div className={`${styles.left} ${styles.black}`}></div>
      </div>

      <div className={styles.circle}>
        <div className={styles.diceContainer}>{dices}</div>
      </div>

      <div className={styles.triangles}>
        <div className={`${styles.right} ${styles.black}`}></div>
        <div className={`${styles.right} ${styles.red}`}></div>
        <div className={`${styles.right} ${styles.black}`}></div>
      </div>
    </div>
  );
}

export default Home;
