import { Request, Response } from "express";
import { hash } from 'bcrypt';
import { getCircles, getMembersInCircles, getPostsInCircle, joinCircle } from "../db/circle.js";
import { downvote, getReplies, newPost, newReply, upvote } from "../db/post.js";
import { createUser } from "../db/user.js";
import { checkCircles } from "../utils/utils.js";


export const home = async (req: Request, res: Response) => {
	res.status(200).json({ message: "Welcome" });
	return;
}

//NOTE: Post request
export const signup = async (req: Request, res: Response) => {
	const { email, password, pname, sname, sclass, school, section, society } = req.body;

	// Validate input
	if (!email || !password || !sclass || !pname || !sname || !section || !school) {
		res.status(400).json({ err: "All information is required" });
		return;
	}

	try {
		// Create circle names based on provided information
		const circleNames = [
			school,
			`${school} ${sclass}`,
			`${school} ${sclass} ${section}`,
			`${school} ${section}`
		];
		const hasspass = await hash(password, 10);

		// Create user in the database
		const newUser = await createUser(email, hasspass, pname, sname, school, sclass, section, society)

		// Check and join/create circles
		await checkCircles(circleNames, newUser.id)

		// If society is provided, join the user to the society
		if (society) {
			await checkCircles([society], newUser.id);
		}

		res.status(201).json({ message: "User signed up successfully", userId: newUser.id });
		return;
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Internal server error" });
	}
};

//NOTE: Get request
export const getJoinedCircles = async (req: Request, res: Response) => {
	const { userId } = req.params;

	if (!userId) {
		res.status(400).json({ err: "Bad request: userId is required" });
		return;
	}

	try {
		const circles = await getCircles(userId);
		if (!circles) {
			res.status(404).json({ err: "No circles found for this user" });
			return;
		}
		res.status(200).json({ circles });
		return;
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: Get request
export const getCirclePosts = async (req: Request, res: Response) => {
	const { circleId } = req.params;

	if (!circleId) {
		res.status(400).json({ err: "Bad request: circleId is required" });
		return;
	}

	try {
		const posts = await getPostsInCircle(circleId);
		if (!posts) {
			res.status(404).json({ err: "No posts found in this circle" });
			return;
		}
		res.status(200).json({ posts });
		return;
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: Get request
export const getCircleMembers = async (req: Request, res: Response) => {
	const { circleId } = req.params;
	if (!circleId) {
		res.status(400).json({ err: "Bad request: circleId is required" });
		return;
	}
	try {
		const members = await getMembersInCircles(circleId);
		if (!members) {
			res.status(400).json({ err: "No members in this circle" });
			return;
		}
		res.status(400).json({ members });
		return;

	} catch (err) {
		console.log(err)
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: put request
export const upvotePost = async (req: Request, res: Response) => {
	const { postId } = req.body;

	if (!postId) {
		res.status(400).json({ err: "Bad request: postId is required" });
		return;
	}

	try {
		const updatedPost = await upvote(postId);
		res.status(200).json({ post: updatedPost });
		return;
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: put request
export const downvotePost = async (req: Request, res: Response) => {
	const { postId } = req.body;

	if (!postId) {
		res.status(400).json({ err: "Bad request: postId is required" });
		return;
	}

	try {
		const updatedPost = await downvote(postId);
		res.status(200).json({ post: updatedPost });
		return;
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: POST request
export const createNewPost = async (req: Request, res: Response) => {
	const { content, circleId, userId } = req.body;
	if (!content || !circleId || !userId) {
		res.status(400).json({ err: "Bad request: All fields is required" });
		return;
	}

	try {
		const post = await newPost(content, circleId, userId);
		res.status(201).json({ post });
		return;

	} catch (err) {
		console.log(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: POST request
export const createNewReply = async (req: Request, res: Response) => {
	const { postId, content, userId } = req.body;
	if (!postId || !content || !userId) {
		res.status(400).json({ err: "Bad request: All fields is required" });
		return;
	}

	try {
		const post = await newReply(postId, content, userId);
		res.status(201).json({ post });
		return;

	} catch (err) {
		console.log(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: Get request
export const getRepliesToPost = async (req: Request, res: Response) => {
	const { postId } = req.params;
	if (!postId) {
		res.status(400).json({ err: "Bad request: postId is required" });
		return;
	}
	try {
		const replies = await getReplies(postId);
		if (!replies) {
			res.status(404).json({ err: "Replies not found" });
			return;
		}
		res.status(200).json({ replies });
		return;
	} catch (err) {
		console.log(err)
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}

//NOTE: post request
export const joinNewCircle = async (req: Request, res: Response) => {
	const { userId, circleId } = req.body;
	if (!circleId) {
		res.status(400).json({ err: "Bad request: circleId is required" });
		return;
	}
	try {
		const circle = await joinCircle(userId, circleId);
		res.status(201).json({ circle });
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: "Internal server error" });
		return;
	}
}
