import styles from '../styles/Dice.module.css';

function Dice(props) {
  return (
    <div>
      <img
        className={styles.dice}
        src={`${props.number}.png`}
        alt={props.number}
        onClick={() => props.rollOne(props.index)}
      />
      <span className={styles.counter}>{props.count}</span>
    </div>
  );
}

export default Dice;
