import { ITask } from "./task.types";
import { IDraftTask } from "./cards-list.types";

export interface ICardProps {
	title: string;
	period: "today" | "week" | "month";
	tasksFromDB: ITask[];
	draftTask: { id: IDraftTask["id"]; text: IDraftTask["text"] } | null;
	setDraftTask: (
		draft: { id: IDraftTask["id"]; text: IDraftTask["text"] } | null
	) => void;
}
