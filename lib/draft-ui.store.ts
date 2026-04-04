import { IDraftTask } from "@/app/types/cards-list.types";
import { create } from "zustand";

type DraftTaskUIState = {
	draftsById: Record<string, IDraftTask>;

	updateDraft: (task: IDraftTask) => void;
	clearDraft: (id: string) => void;
};

export const useDraftTaskUIStore = create<DraftTaskUIState>()((set) => ({
	draftsById: {},

	updateDraft: (task) => {
		set((state) => ({
			draftsById: {
				...state.draftsById,
				[task.id]: task,
			},
		}));
	},
	clearDraft: (id) =>
		set((state) => {
			const next = { ...state.draftsById };
			delete next[id];
			return { draftsById: next };
		}),
}));
