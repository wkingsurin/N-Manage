export interface INewTaskProps {
	isCreating: boolean;
	onCreateNewTask: () => void;
	onChangeText: (text: string) => void;
	onAddNewTask: () => void;
	onCloseNewTask: () => void;
}
