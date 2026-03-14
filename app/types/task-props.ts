import { ITask } from "./task";

export interface ITaskProps {
	data: ITask;
	onClickEdit: (id: string | undefined) => void;
	onComplete: (id: string | undefined) => void;
}
