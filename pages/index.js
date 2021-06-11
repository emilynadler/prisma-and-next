import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <h1>My app!</h1>
				</h1>

				<p className={styles.description}>Use the navbar to begin.</p>
			</main>
		</div>
	);
}
