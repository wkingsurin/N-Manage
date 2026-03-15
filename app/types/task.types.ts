export interface ITask {
	id: string;
	text: string;
	edit: boolean;
	status: string;
	period: "today" | "week" | "month";
}
