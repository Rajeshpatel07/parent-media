import { getCircle, joinCircle, newCircle } from "../db/circle.js";

export const checkCircles = async (circleNames: string[], userId: string) => {
	for (const circleName of circleNames) {
		let circle = await getCircle(circleName);

		// If the circle does not exist, create it
		if (!circle) {
			circle = await newCircle(circleName)
		}

		// Join the user to the circle
		await joinCircle(userId, circle.id);
	}
}
