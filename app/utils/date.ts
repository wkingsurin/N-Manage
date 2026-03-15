import { ITask } from "../types/task.types";

export function getDueDate(period: ITask["period"]) {
	const now = new Date();

	switch (period) {
		case "today":
			return now;

		case "week":
			return new Date(now.setDate(now.getDate() + 7));

		case "month":
			return new Date(now.setMonth(now.getMonth() + 1));

		default:
			return now;
	}
}

export function getPeriodFromDate(date: Date): "today" | "week" | "month" {
	const now = new Date();

	const diffDays = Math.floor(
		(date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
	);

	if (diffDays <= 0) return "today";
	if (diffDays <= 7) return "week";
	return "month";
}
