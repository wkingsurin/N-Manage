export interface INewTaskProps {
	status: string;
	onCreateNewTask: () => void;
	onChangeText: (text: string) => void;
	onAddNewTask: () => void;
	onCloseNewTask: () => void;
}
