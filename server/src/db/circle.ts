import { prisma } from "../index.js";

export const newCircle = async (name: string) => {
	const circle = await prisma.circle.create({
		data: {
			name,
			//FIX: fix the schema and function.
			type: "School"
		}
	})
	return circle;
}

export const getCircles = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			circles: true
		}
	});

	return user ? user.circles : null;
}


export const getPostsInCircle = async (circleId: string) => {
	const circle = await prisma.circle.findUnique({
		where: { id: circleId },
		select: {
			posts: true
		}
	});

	return circle ? circle.posts : null;
}

export const getMembersInCircles = async (circleId: string) => {
	const members = await prisma.circle.findFirst({
		where: { id: circleId },
		select: {
			members: {
				select: {
					id: true,
					pname: true,
					sname: true,
				}
			}
		}
	})
	return members ? members.members : null;
}

export const joinCircle = async (userId: string, circleId: string) => {
	const circle = await prisma.circle.update({
		where: { id: circleId },
		data: {
			members: {
				connect: { id: userId }
			}
		}
	})
	return circle;
}

export const getCircle = async (name: string) => {
	const circle = await prisma.circle.findFirst({
		where: { name }
	});
	return circle;
}

