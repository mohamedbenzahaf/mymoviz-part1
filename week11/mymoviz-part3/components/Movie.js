import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Movie.module.css';

function Movie(props) {
  // États
  const [personalNote, setPersonalNote] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  const [like, setLike] = useState(false);

  // Handlers
  const handleWatchMovie = () => {
    setWatchCount(watchCount + 1);
  };

  const handleLikeMovie = () => {
    setLike(!like);
  };

  // Étoiles jaunes : note générale
  const stars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < props.voteAverage - 1) {
      style = { 'color': '#f1c40f' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Étoiles bleues : note personnelle
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { 'cursor': 'pointer' };
    if (i < personalNote) {
      style = { 'color': '#2196f3', 'cursor': 'pointer' };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => setPersonalNote(i + 1)}
        className="note"
        style={style}
      />
    );
  }

  // Style de la caméra
  let videoIconStyle = { 'cursor': 'pointer' };
  if (watchCount > 0) {
    videoIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

  // Style du cœur
  let heartIconStyle = { 'cursor': 'pointer' };
  if (like) {
    heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.title} />
      <div className={styles.textContainer}>
        <span className={styles.name}>{props.title}</span>
        <p className={styles.description}>{props.overview}</p>
        <span className={styles.vote}>{stars} ({props.voteCount})</span>
        <div className={styles.vote}>{personalStars} ({personalNote})</div>
        <div className={styles.vote}>
          <FontAwesomeIcon
            icon={faVideo}
            onClick={() => handleWatchMovie()}
            className="watch"
            style={videoIconStyle}
          /> ({watchCount})
        </div>
        <div className={styles.vote}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => handleLikeMovie()}
            className="like"
            style={heartIconStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default Movie;
