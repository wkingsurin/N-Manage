import { IDraftTask } from "./cards-list.types";

export interface ITask {
	id: string;
	text: string;
	edit: boolean;
	status: string;
	period: "today" | "week" | "month";
}

export interface ITaskProps {
	data: ITask;
	isEditing: boolean;
	closeTaskSnippet: () => void;
	draftTask: { id: IDraftTask["id"]; text: IDraftTask["text"] } | null;
	setDraftTask: (
		draft: { id: IDraftTask["id"]; text: IDraftTask["text"] } | null
	) => void;
}

export interface UpdateTaskTextarea {
	id: string;
	title: string;
}

export interface UpdateTaskStatus {
	id: string;
	status: string;
}
