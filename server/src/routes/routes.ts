import { Router } from "express";
import {
	home,
	signup,
	upvotePost,
	createNewPost,
	createNewReply,
	downvotePost,
	getCircleMembers,
	getCirclePosts,
	getJoinedCircles,
	getRepliesToPost,
	joinNewCircle,
} from "../controllers/controller.js";

const router = Router();

router.route('/home').get(home) //check if the server is working

// User routes
router.post('/signup', signup);
// Circle routes
router.get('/circles/:userId', getJoinedCircles); // Fetch circles joined by the user
router.post('/circles/join', joinNewCircle); // Join a new circle
router.get('/circles/:circleId/members', getCircleMembers); // Get members of a specific circle

// Post routes
router.get('/circles/:circleId/posts', getCirclePosts); // Get posts in a specific circle
router.get('/posts/:postId/replies', getRepliesToPost); // Get replies to a specific post
router.put('/posts/upvote', upvotePost); // Upvote a post
router.put('/posts/downvote', downvotePost); // Downvote a post
router.post('/posts/new', createNewPost); // Create a new post
router.post('/posts/reply/new', createNewReply); // Reply to a specific post

export default router;
