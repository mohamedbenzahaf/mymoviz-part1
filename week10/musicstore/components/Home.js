import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faLocationDot,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

const products = [
  {
    name: 'PHANTOM I',
    color: 'White',
    description: 'A class of its own.',
    image: '/phantom1.png',
  },
  {
    name: 'PHANTOM II',
    color: 'Gold',
    description: 'Pure sound.',
    image: '/phantom2.png',
  },
  {
    name: 'PHANTOM II',
    color: 'Black',
    description: 'Deeply nomadic.',
    image: '/phantom3.png',
  },
  {
    name: 'PHANTOM II',
    color: 'White',
    description: 'Intensively immersive.',
    image: '/phantom4.png',
  },
];

function Header() {
  return (
    <header className={styles.header}>
      <FontAwesomeIcon icon={faBars} className={styles.icon} />
      <h2 className={styles.logo}>MUSIC STORE</h2>
      <div className={styles.icons}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
        <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <Header />
      <div className={styles.heroContent}>
        <div>
          <p className={styles.heroLabel}>PHANTOM</p>
          <h1 className={styles.heroTitle}>IMPLOSIVE SOUND</h1>
        </div>
        <div className={styles.buttons}>
          <a href="#" className={styles.discover}>DISCOVER</a>
          <a href="#" className={styles.buy}>BUY</a>
        </div>
      </div>
    </section>
  );
}

function Soundbar() {
  return (
    <section className={styles.soundbar}>
      <p className={styles.soundbarLabel}>LATEST LAUNCH</p>
      <h2 className={styles.soundbarTitle}>DIONE SOUNDBAR</h2>
      <img src="/soundbar.png" alt="Soundbar" />
      <a href="#">DISCOVER</a>
    </section>
  );
}

function Product({ name, color, description, image }) {
  return (
    <article className={styles.product}>
      <img src={image} alt={`${name} ${color}`} />
      <div className={styles.productInfo}>
        <p className={styles.productName}>
          {name} {color}
        </p>
        <h2 className={styles.productTagline}>{description}</h2>
        <a href="#">DISCOVER</a>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="#">ABOUT</a>
      <a href="#">CONTACT</a>
      <a href="#">SUPPORT</a>
      <a href="#">STORES</a>
    </footer>
  );
}

function Home() {
  const items = products.map((p, i) => <Product key={i} {...p} />);

  return (
    <div className={styles.container}>
      <Hero />
      <Soundbar />
      <main className={styles.products}>{items}</main>
      <Footer />
    </div>
  );
}

export default Home;
