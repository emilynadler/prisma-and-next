import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
	if (req.method === "POST") {
		const data = JSON.parse(req.body);

		const { body } = req;
		const createdPost = await prisma.post.create({
			data: JSON.parse(req.body),
		});

		res.json(createdPost);
	} else if (req.method === "DELETE") {
		const posts = await prisma.post.findMany();
		const { body } = req;
		const deletedPost = await prisma.post.delete({
			where: {
				id: parseInt(body),
			},
		});
		// console.log(posts);
		res.json(posts);
	}
};
