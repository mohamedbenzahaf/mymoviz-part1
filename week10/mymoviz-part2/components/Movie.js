import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Movie.module.css';

function Movie() {
  const stars = [];

  for (let i = 0; i < 10; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src="poster.jpg" alt="Poster" />
      <div className={styles.textContainer}>
        <span className={styles.name}>Name</span>
        <p className={styles.description}>Description</p>
        <span className={styles.vote}>{stars} (Vote count)</span>
      </div>
    </div>
  );
}

export default Movie;
