import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Create from "./Create";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Posts({ data }) {
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
				<ul className={styles.posts}>
					{/* posts might be empty at the beginning, if not, map through it and show each on screen */}
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
