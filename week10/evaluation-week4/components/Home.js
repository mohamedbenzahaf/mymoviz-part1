import styles from '../styles/Home.module.css';

const giftsList = [
  {name: 'Skydiving', picture: 'skydiving.jpg', price: 340},
  {name: 'Tattoo', picture: 'tattoo.jpg', price: 470},
  {name: 'PS5', picture: 'playstation.jpg', price: 520},
  {name: 'Travel to Bali', picture: 'bali.jpg', price: 1400},
]

function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>My birthday wishlist</h1>
      <div className={styles.container}>
      </div>
    </div>
  );
}

export default Home;