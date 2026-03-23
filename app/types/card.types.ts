import { ITask } from "./task.types";
import { IDraftTask } from "./cards-list.types";
import { Period } from "./shared.types";

export interface ICardProps {
	title: string;
	period: Period;
	tasksFromDB: ITask[];
	draftTask: IDraftTask | null;
	setDraftTask: (draft: IDraftTask | null) => void;
}
