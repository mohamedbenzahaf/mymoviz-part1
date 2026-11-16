import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="logo.png" />
      <div className={styles.counterContainer}>
        <button className={styles.decrementBtn} id="decrementBtn">-</button>
        <span className={styles.counter} id="counter">{counter}</span>
        <button className={styles.incrementBtn} id="incrementBtn">+</button>
      </div>
    </div>
  );
}

export default Home;
