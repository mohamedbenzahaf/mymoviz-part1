import styles from '../styles/Movie.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Movie() {

  const stars = [];

  for (let i = 0; i < 10; i++) {
    stars.push(
<FontAwesomeIcon
  key={i}
  icon={faStar}
  style={{ color: '#f1c40f' }}
/>
    );
  }

  return (
    <div className={styles.card}>

      <img
        className={styles.image}
        src="/poster.jpg"
        alt="Poster"
      />

      <div className={styles.textContainer}>

        <span className={styles.name}>
          Movie 1
        </span>

        <p className={styles.description}>
          Voici la description de notre film.
          Une belle histoire à découvrir !
        </p>

        <div className={styles.vote}>
          {stars}
          <span> (125 votes)</span>
        </div>

      </div>

    </div>
  );
}

export default Movie;
