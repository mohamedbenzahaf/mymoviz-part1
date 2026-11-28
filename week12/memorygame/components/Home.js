import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ];

  const [cards, setCards] = useState([]);       // les 16 cartes mélangées
  const [selected, setSelected] = useState([]); // les 2 cartes retournées en cours
  const [found, setFound] = useState([]);       // les cartes des paires trouvées

  // Mélange un tableau avec Math.random()
  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 1. À l'arrivée sur la page : on mélange les cartes
  useEffect(() => {
    setCards(shuffle(deck));
  }, []);

  // 2. Clic sur une carte (appelé depuis Card : inverse data flow)
  const selectCard = (id) => {
    // on bloque si 2 cartes sont déjà retournées, ou si la carte est déjà visible
    if (selected.length === 2 || selected.includes(id) || found.includes(id)) {
      return;
    }
    setSelected([...selected, id]);
  };

  // 3. Quand 2 cartes sont retournées : on compare
  useEffect(() => {
    if (selected.length !== 2) {
      return;
    }

    const firstCard = cards.find((card) => card.id === selected[0]);
    const secondCard = cards.find((card) => card.id === selected[1]);

    if (firstCard.name === secondCard.name) {
      // identiques : elles restent visibles
      setFound([...found, firstCard.id, secondCard.id]);
      setSelected([]);
    } else {
      // différentes : on les retourne après 1 seconde
      const timer = setTimeout(() => setSelected([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  // 4. Fin de partie : toutes les paires trouvées
  useEffect(() => {
    if (found.length === 16) {
      const timer = setTimeout(() => {
        setFound([]);
        setCards(shuffle(deck));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [found]);

  const cardsToDisplay = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id) || found.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
