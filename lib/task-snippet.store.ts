import { ITaskSnippet } from "@/app/types/task-snippet.types";
import { create } from "zustand";

type TaskSnippetUIState = {
	taskSnippet: ITaskSnippet;

	updateTaskSnippet: (partial: Partial<ITaskSnippet>) => void;
	resetTaskSnippet: () => void;
};

export const createInitialSnippet = (): ITaskSnippet => ({
	text: "",
	status: "",
	period: "today",
});

export const useTaskSnippetUIStore = create<TaskSnippetUIState>()((set) => ({
	taskSnippet: createInitialSnippet(),

	updateTaskSnippet: (partial) => {
		set((state) => {
			return { taskSnippet: { ...state.taskSnippet, ...partial } };
		});
	},
	resetTaskSnippet: () => {
		set(() => ({ taskSnippet: createInitialSnippet() }));
	},
}));
