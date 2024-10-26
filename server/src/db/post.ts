import { prisma } from "../index.js";


export const upvote = async (postId: string) => {
	const response = await prisma.post.update({
		where: { id: postId },
		data: {
			upvotes: {
				increment: 1
			}
		}
	});
	return response;
}

export const downvote = async (postId: string) => {
	const response = await prisma.post.update({
		where: { id: postId },
		data: {
			upvotes: {
				decrement: 1
			}
		}
	});
	return response;
}

export const newPost = async (content: string, circleId: string, userId: string) => {
	const post = await prisma.post.create({
		data: {
			content,
			circleId,
			userId,
			type: "post"
		}
	})

	return post ? post : null;
}

export const newReply = async (postId: string, content: string, circleId: string, userId: string) => {
	const post = await prisma.post.create({
		data: {
			content,
			circleId,
			userId,
			type: "reply",
			parentId: postId
		}
	})

	return post;
}

export const getReplies = async (messageId: string) => {
	const replies = await prisma.post.findMany({
		where: { id: messageId },
		select: {
			replies: true
		}
	})
	return replies ? replies : null;
}
