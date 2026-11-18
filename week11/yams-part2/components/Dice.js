import styles from '../styles/Dice.module.css';

function Dice(props) {
  return (
    <div>
      <img
        className={styles.dice}
        src={`${props.number}.png`}
        alt={props.number}
        onClick={props.onRoll}
      />
      <p>{props.count}</p>
    </div>
  );
}

export default Dice;
