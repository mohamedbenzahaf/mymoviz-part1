import styles from '../styles/Burger.module.css';

function Burger(props) {
	return (
		<div className={styles.container}>
			<h2 className={styles.name}>{props.name}</h2>
			<img className={styles.images} src={props.image} />
			<div className={styles.btnContainer}>

			</div>
		</div>
	);
}

export default Burger;
