import { prisma } from "../index.js";

export const createUser = async (email: string, password: string, pname: string, sname: string, school: string, sclass: string, section: string, society?: string) => {
	const newUser = await prisma.user.create({
		data: {
			email,
			password, // Make sure to hash this before storing in production
			pname,
			sname,
			school,
			sclass,
			section,
			society
		},
		select: {
			id: true,
			pname: true
		}
	});
	return newUser;
}
