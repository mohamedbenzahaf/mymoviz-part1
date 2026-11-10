import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';

import { Popover, Button } from 'antd';

function Home() {

  // Liste des films
  const movies = [];

  for (let i = 0; i < 10; i++) {
    movies.push(
      <Movie key={i} />
    );
  }

  // Contenu de la popover
  const content = (
    <div>
      <p>Movie 1</p>
      <p>Movie 2</p>
      <p>Movie 3</p>
      <p>Movie 4</p>
    </div>
  );

  return (
    <div>

      {/* HEADER */}
      <header className={styles.header}>

        <div className={styles.logocontainer}>
          <img src="/logo.png" alt="Logo" />
          <img
            className={styles.logo}
            src="/logoletter.png"
            alt="Letter logo"
          />
        </div>

        <Popover
          content={content}
          title="Liked movies"
          trigger="click"
        >
          <Button type="primary">
            ♥ 4 movie(s)
          </Button>
        </Popover>

      </header>

      {/* CONTENU PRINCIPAL */}
      <main className={styles.main}>

        <h1>Last releases</h1>

        <div className={styles.moviesContainer}>
          {movies}
        </div>

      </main>

    </div>
  );
}

export default Home;
