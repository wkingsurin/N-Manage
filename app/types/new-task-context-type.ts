export interface NewTaskContextType {
	creatingTask: string | undefined;
	setCreatingTask: (id: string | undefined) => void;
}
