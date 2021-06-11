import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";

const Search = () => {
	const [term, setTerm] = useState("");
	const [images, setImages] = useState([]);

	//   useEffect(() => {
	//     requestImages();
	//   }, [term]);

	async function requestImages() {
		const URL = `http://api.giphy.com/v1/gifs/search?q=${term}&limit=10&api_key=sd1CbGfQXvPksRtbZ31ZrFW2Xi1iXdHO`;
		const res = await fetch(URL);
		const json = await res.json();
		setImages(json.data);
	}

	const handleOnSubmit = (e) => {
		requestImages();
		e.preventDefault();
	};

	return (
		<div>
			<main className={styles.main}>
				<h1>Search for any gif here:</h1>
				<form onSubmit={handleOnSubmit} className={styles.description}>
					<input
						onChange={(e) => setTerm(e.target.value)}
						type="text"
						placeholder="Search here"
					/>
					<input type="submit" value="Submit" />
				</form>
				{images.map((image) => (
					<div key={image.id}>
						<iframe src={image.embed_url} className="giphy-embed"></iframe>
						<a href={image.embed_url}></a>
					</div>
				))}
			</main>
		</div>
	);
};

export default Search;
