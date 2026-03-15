export interface NewTaskContextType {
	creatingTask: string | null;
	setCreatingTask: (id: string | null) => void;
}
