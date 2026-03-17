export interface INewTaskProps {
	isCreating: boolean;
	openTaskSnippet: () => void;
	closeTaskEditing: () => void;
	closeTaskSnippet: () => void;
}
