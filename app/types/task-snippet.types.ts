export interface ITaskSnippet {
	text: string;
	status: string;
	period: "today" | "week" | "month";
}
