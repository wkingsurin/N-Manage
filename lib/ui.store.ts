import { Period } from "@/app/types/shared.types";
// import { ITask } from "@/app/types/task.types";
import { create } from "zustand";

// interface IUndo {
// 	isActual: boolean;
// 	deletedTask: ITask | null;
// }

export interface IConfrimModal {
	type: "completion" | "deletion";
	isOpened: boolean;
}
export interface IEditModal {
	position: { x: number | null; y: number | null };
	width: number | null;
	isOpened: boolean;
}
export type Theme = "light" | "dark";

type UIState = {
	creatingTaskTab: Period;
	activeTaskId: string | null;
	isOpened: boolean;
	isMobile: boolean;
	theme: Theme;

	isOpenedOverlay: boolean;
	confirmModal: IConfrimModal;
	isOpenedToast: boolean;
	editModal: IEditModal;
	// undo: IUndo;

	updateCreatingTab: (period: Period) => void;
	updateIsOpened: (flag: boolean) => void;
	updateActiveTask: (id: string | null) => void;
	updateIsMobile: (value: boolean) => void;
	updateIsOpenedToast: (flag: boolean) => void;
	updateConfirmModal: (partial: Partial<IConfrimModal>) => void;
	updateEditModal: (partial: Partial<IEditModal>) => void;
	updateIsOpenedOverlay: (flag: boolean) => void;
	// updateUndo: (partial: Partial<IUndo>) => void;
	updateTheme: (theme: Theme) => void;
};

export const useUIStore = create<UIState>()((set) => ({
	creatingTaskTab: "today",
	activeTaskId: null,
	isOpened: false,
	isMobile: false,

	isOpenedOverlay: false,
	isOpenedToast: false,
	confirmModal: { type: "completion", isOpened: false },
	editModal: { isOpened: false, position: { x: null, y: null }, width: null },

	theme: "light",

	// undo: { isActual: false, deletedTask: null },

	updateCreatingTab: (period) => {
		set(() => {
			return { creatingTaskTab: period };
		});
	},
	updateActiveTask: (id) => set({ activeTaskId: id }),
	updateIsOpened: (flag) => set({ isOpened: flag }),
	updateIsMobile: (value) => set({ isMobile: value }),
	updateIsOpenedToast: (flag) => set({ isOpenedToast: flag }),
	updateConfirmModal: (partial) => {
		set((state) => {
			return { confirmModal: { ...state.confirmModal, ...partial } };
		});
	},
	updateEditModal: (partial) => {
		set((state) => {
			return { editModal: { ...state.editModal, ...partial } };
		});
	},
	updateIsOpenedOverlay: (flag) => set({ isOpenedOverlay: flag }),
	// updateUndo: (partial) =>
	// 	set((state) => {
	// 		return { undo: { ...state.undo, ...partial } };
	// 	}),
	updateTheme: (theme) => set({ theme: theme }),
}));
