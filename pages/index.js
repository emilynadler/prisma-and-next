import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home({ data }) {
	//data that is coming from our form
	const [formData, setFormData] = useState({});
	const [posts, setPosts] = useState(data);

	async function savePost(e) {
		e.preventDefault();
		console.log(formData);
		setPosts([...posts, formData]);
		console.log(posts);
		const response = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify(formData),
		});
		return await response.json();
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<ul className={styles.posts}>
					{posts.map((item) => (
						<li key={item.id}>
							<span>
								<strong>{item.title}</strong>
							</span>
							<span>{item.author}</span>
							<span>{item.content}</span>
						</li>
					))}
				</ul>

				<form className={styles.postsform} onSubmit={savePost}>
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
					<button type="submit">Create post</button>
				</form>
			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const posts = await prisma.post.findMany();

	return {
		props: {
			data: posts,
		},
	};
}
