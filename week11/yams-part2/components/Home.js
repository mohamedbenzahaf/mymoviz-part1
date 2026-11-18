import { useState } from 'react';
import Dice from './Dice';
import styles from '../styles/Home.module.css';

const randomValue = () => Math.floor(Math.random() * 6) + 1;

function Home() {
  const [started, setStarted] = useState(false);
  // chaque dé : { value, count }
  const [dicesData, setDicesData] = useState([]);

  const handleLaunch = () => {
    const initial = Array.from({ length: 5 }, () => ({
      value: randomValue(),
      count: 1,
    }));
    setDicesData(initial);
    setStarted(true);
  };

  // relance uniquement le dé à l'index cliqué
  const handleRoll = (index) => {
    const newValue = randomValue();
    setDicesData((prev) =>
      prev.map((dice, i) =>
        i === index ? { value: newValue, count: dice.count + 1 } : dice
      )
    );
  };

  const dices = dicesData.map((dice, i) => (
    <Dice
      key={i}
      number={dice.value}
      count={dice.count}
      onRoll={() => handleRoll(i)}
    />
  ));

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.triangleLeft}></div>
        <div className={styles.triangleLeftRed}></div>
        <div className={styles.triangleLeft}></div>
      </div>
      <div className={styles.middleSection}>
        <img src="logo.png" alt="Logo" className={styles.logo} />
        <div className={styles.board}>
          {!started && (
            <button className="launchBtn" onClick={handleLaunch}>
              Launch
            </button>
          )}
          {started && dices}
        </div>
      </div>
      <div>
        <div className={styles.triangleRight}></div>
        <div className={styles.triangleRightRed}></div>
        <div className={styles.triangleRight}></div>
      </div>
    </div>
  );
}

export default Home;