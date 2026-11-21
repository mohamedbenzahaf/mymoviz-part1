import Dice from './Dice';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

function Home() {
  // Chaque dé : { value: 1-6, count: nombre de relances individuelles }
  const [dices, setDices] = useState([]);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  // Bouton "launch" : relance tous les dés (les crée au premier lancer)
  const launchAll = () => {
    if (dices.length === 0) {
      setDices(Array.from({ length: 5 }, () => ({ value: rollDice(), count: 0 })));
    } else {
      setDices(dices.map(dice => ({ value: rollDice(), count: dice.count })));
    }
  };

  // Inverse data flow : appelée par un Dice, relance uniquement ce dé
  const rollOne = (index) => {
    setDices(dices.map((dice, i) =>
      i === index ? { value: rollDice(), count: dice.count + 1 } : dice
    ));
  };

  const total = dices.reduce((sum, dice) => sum + dice.value, 0);

  const diceComponents = dices.map((dice, i) => (
    <Dice key={i} index={i} number={dice.value} count={dice.count} rollOne={rollOne} />
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
          {diceComponents}
        </div>
        <span id="total">{total}</span>
        <button className={styles.launchBtn} onClick={launchAll}>Launch</button>
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
