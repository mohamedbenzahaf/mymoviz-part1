import styles from '../styles/Gift.module.css';

const Gift = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.name}>{props.name}</h2>
        <span className={styles.price}>{props.price}€</span>
      </div>

      <img
        className={styles.image}
        src={props.picture}
        alt={props.name}
      />
    </div>
  );
};

export default Gift;
