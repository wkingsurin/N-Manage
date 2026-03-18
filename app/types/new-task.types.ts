export interface INewTaskProps {
	isCreating: boolean;
	openTaskSnippet: () => void;
	closeTaskEditing: () => void;
	closeTaskSnippet: () => void;
}

export interface NewTaskContextType {
	creatingTask: string | null;
	setCreatingTask: (id: string | null) => void;
}
