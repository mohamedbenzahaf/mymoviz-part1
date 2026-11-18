import styles from '../styles/Dice.module.css';

function Dice(props) {
  return (
    <div>
      <img className={styles.dice} src={`${props.number}.png`} alt={props.number} />
    </div>
  );
}

export default Dice;
