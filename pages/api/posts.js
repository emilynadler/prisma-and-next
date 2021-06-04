import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
	const data = JSON.parse(req.body);

	const { body } = req;
	const createdPost = await prisma.post.create({
		data: JSON.parse(req.body),
	});

	res.json(createdPost);
};
