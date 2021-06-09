import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Create from "./Create";
import Link from "next/link";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Posts({ data }) {
	//data that is coming from our form
	// const [formData, setFormData] = useState({});
	const [posts, updatePosts] = useState(data);
	async function handleOnSubmit(itemid) {
		//delete post from array of posts (front end delete)
		updatePosts(posts.filter((item) => item.id !== itemid));
		//delete post from database (back end delete)
		const response = await fetch("/api/posts", {
			method: "DELETE",
			body: itemid,
		});
		return await response.json();
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<ul className={styles.posts}>
					{/* posts might be empty at the beginning, if not, map through it and show each on screen */}
					{posts.map((item) => (
						<li className="box" key={item.id}>
							<span>
								<strong>{item.title}</strong>
							</span>
							<span>Author: {item.author}</span>
							<span>{item.content}</span>
							<Link href={`/${item.id}`}>
								<a className="continue">Continue reading {item.title}</a>
							</Link>
							<form onSubmit={(e) => handleOnSubmit(item.id)}>
								<button type="submit">Delete</button>
							</form>
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
