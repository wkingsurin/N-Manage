import { IDraftTask } from "@/app/types/cards-list.types";
import { ITaskSnippet } from "@/app/types/task-snippet.types";
import { ITask } from "@/app/types/task.types";
import { create } from "zustand";

type TaskUIState = {
	creatingTaskTab: ITask["period"] | null;
	draftTask: IDraftTask | null;
	taskSnippet: ITaskSnippet;

	updateDraft: (task: IDraftTask | null) => void;
	updateCreatingTab: (period: ITask["period"] | null) => void;
	updateTaskSnippet: (partial: Partial<ITaskSnippet>) => void;
};

export const createInitialSnippet = (): ITaskSnippet => ({
	text: "",
	status: "",
	period: "today",
});

export const useTaskUIStore = create<TaskUIState>()((set) => ({
	creatingTaskTab: null,
	draftTask: null,
	taskSnippet: createInitialSnippet(),

	updateCreatingTab: (period) => {
		set(() => {
			return { creatingTaskTab: period };
		});
	},
	updateDraft: (task) => set({ draftTask: task }),
	updateTaskSnippet: (partial) => {
		set((state) => {
			return { taskSnippet: { ...state.taskSnippet, ...partial } };
		});
	},
}));
