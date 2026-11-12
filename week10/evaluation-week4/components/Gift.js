import styles from '../styles/Gift.module.css'

const Gift = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.name}>Example</h2>
        <span className={styles.price}>30€</span>
      </div>
        <img className={styles.image} src='example.jpg' alt='Example' />
    </div>
  )
}

export default Gift