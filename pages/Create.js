import styles from "../styles/Home.module.css";
import { useState } from "react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Create({ data }) {
	//data that is coming from our form
	const [formData, setFormData] = useState({});
	const [posts, setPosts] = useState(data);

	async function savePost(e) {
		//clear form after a user clicks submit
		const form = document.getElementById("myForm");
		form.reset();
		e.preventDefault();
		//populate posts with formData, as set through the submission fo the form
		setPosts([...posts, formData]);
		//fetch data from the database
		const response = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify(formData),
		});
		//return the response from the database, aka the old data plus the new data submitted in the form
		return await response.json();
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<form
					className={styles.postsform}
					id="myForm"
					type="reset"
					onSubmit={savePost}
				>
					<input
						type="text"
						placeholder="Title"
						name="title"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<input
						type="text"
						placeholder="Author"
						name="author"
						onChange={(e) =>
							setFormData({ ...formData, author: e.target.value })
						}
					/>
					<textarea
						name="content"
						id=""
						cols="30"
						rows="10"
						placeholder="Description"
						onChange={(e) =>
							setFormData({ ...formData, content: e.target.value })
						}
					/>
					<button type="submit">Create post </button>
				</form>
			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const posts = await prisma.post.findMany();

	if (!posts) {
		return {
			notFound: true,
		};
	} else {
		return {
			props: {
				data: posts,
			},
		};
	}
}
