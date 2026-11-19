import { useState } from 'react';
import Burger from './Burger';
import styles from '../styles/Home.module.css';

function Home() {

  const burgersData = [
    { name: 'The New Yorker', image: 'newyorker.jpg' },
    { name: 'The Californian', image: 'californian.jpg' },
    { name: 'The Parisian', image: 'parisian.jpg' },
  ];

  const burgers = burgersData.map((data, i) => {
    return <Burger key={i} name={data.name} image={data.image} />;
  });

  return (
    <div className={styles.container}>
      <img src="logo.png" className={styles.logo} />
      <h4 className={styles.text}>Number of burgers selected: <span id="counter"></span></h4>
      <div className={styles.burgerContainer}>
        {burgers}
      </div>
    </div>
  );
}

export default Home;
