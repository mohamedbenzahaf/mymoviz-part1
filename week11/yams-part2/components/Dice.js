import styles from '../styles/Dice.module.css';

function Dice(props) {
  return (
    <div onClick={props.onRoll}>
      <img
        className={styles.dice}
        src={`${props.number}.png`}
        alt={props.number}
      />
      <p>{props.count}</p>
    </div>
  );
}

export default Dice;
