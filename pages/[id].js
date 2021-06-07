import Head from "next/head";
import styles from "../styles/Home.module.css";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Post({ post }) {
	return (
		<div className={styles.posts}>
			<Head>
				<title>{post.title}</title>
			</Head>

			<main className={styles.main}>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	const post = await prisma.post.findFirst({
		where: {
			id: +id,
		},
	});

	return {
		props: {
			post,
		},
	};
}
