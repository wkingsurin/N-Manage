import { ID, Period } from "./shared.types";

export interface INewTaskProps {
	isOpened: boolean;
	period: Period;
}

export interface NewTaskContextType {
	creatingTask: Period | null;
	setCreatingTask: (id: ID) => void;
}
