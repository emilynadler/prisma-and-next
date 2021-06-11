import "../styles/globals.css";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<Navbar className={styles.container} />
			<Head>
				<title>Emily's App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</>
	);
}

export default MyApp;
