import { ITask } from "@/app/types/task.types";
import { create } from "zustand";
import { useUIStore } from "./ui.store";
import { useDraftTaskUIStore } from "./draft-ui.store";
import { IDraftTask } from "@/app/types/cards-list.types";
import {
	saveTask,
	completeTask as completeTaskAction,
	createTask,
	deleteTask as deleteTaskAction,
} from "@/app/actions/task.actions";
import { useTaskSnippetUIStore } from "./task-snippet.store";
import { Period } from "@/app/types/shared.types";

interface TasksUIState {
	tasksById: Record<string, ITask>;
	taskIdsByPeriod: Record<string, string[]>;

	setTasks: (tasks: ITask[]) => void;
	updateTask: (task: ITask) => void;
	editTask: (task: ITask) => void;
	editingTask: (task: IDraftTask) => void;
	saveTask: (taskId: string) => void;
	completeTask: (taskId: string) => void;
	startCreatingTask: (period: Period) => void;
	closeSnippet: (tab: Period) => void;
	submitTask: (tab: Period) => Promise<boolean>;
	deleteTask: (taskId: string) => void;
}

export const useTasksUIStore = create<TasksUIState>()((set) => ({
	tasksById: {},
	taskIdsByPeriod: {
		today: [],
		week: [],
		month: [],
	},

	setTasks: (tasks) => {
		const tasksById: Record<string, ITask> = {};
		const taskIdsByPeriod: Record<string, string[]> = {};

		tasks.forEach((task) => {
			tasksById[task.id] = task;

			if (!taskIdsByPeriod[task.period]) {
				taskIdsByPeriod[task.period] = [];
			}

			taskIdsByPeriod[task.period].push(task.id);
		});

		set({
			tasksById,
			taskIdsByPeriod,
		});
	},
	updateTask: (updatedTask) => {
		set((state) => {
			const prevTask = state.tasksById[updatedTask.id];

			if (!prevTask) return state;

			const nextState = {
				tasksById: {
					...state.tasksById,
					[updatedTask.id]: updatedTask,
				},
				taskIdsByPeriod: { ...state.taskIdsByPeriod },
			};

			if (prevTask.period !== updatedTask.period) {
				nextState.taskIdsByPeriod[prevTask.period] = nextState.taskIdsByPeriod[
					prevTask.period
				].filter((id) => id !== updatedTask.id);

				if (!nextState.taskIdsByPeriod[updatedTask.period]) {
					nextState.taskIdsByPeriod[updatedTask.period] = [];
				}

				nextState.taskIdsByPeriod[updatedTask.period].push(updatedTask.id);
			}

			return nextState;
		});
	},

	editTask: (task) => {
		useUIStore.getState().updateCreatingTab(task.period);
		useUIStore.getState().updateIsOpened(false);
		useDraftTaskUIStore
			.getState()
			.updateDraft({ id: task.id, text: task.text });
	},
	editingTask: (task) => {
		useDraftTaskUIStore.getState().updateDraft(task);
	},
	saveTask: async (activeTaskId) => {
		const draftTask = activeTaskId
			? useDraftTaskUIStore.getState().draftsById[activeTaskId]
			: null;

		// useUIStore
		// 	.getState()
		// 	.updateCreatingTab(useUIStore.getState().creatingTaskTab);
		// useUIStore.getState().updateIsOpened(false);

		try {
			if (!validateDraft(activeTaskId)) {
				console.error("Invalid draft text");
				return;
			}

			console.log(`[saveTask]:`, draftTask)
			// useDraftTaskUIStore.getState().clearDraft(activeTaskId);

			useUIStore.getState().updateIsOpenedToast(true);

			const activeTask = useTasksUIStore.getState().tasksById[activeTaskId];
			useTasksUIStore
				.getState()
				.updateTask({ ...activeTask, text: draftTask!.text });
			const taskToSave = useTasksUIStore.getState().tasksById[activeTaskId];
			await saveTask(taskToSave);
			// setTask((prevTask) => ({ ...prevTask, text: draftTask!.text }));
		} catch (err) {
			console.error(`Rollback saving task: [ERROR]: ${err}`);
			// setTask((prevTask) => prevTask);
		}
	},
	completeTask: async (taskId) => {
		const task = useTasksUIStore.getState().tasksById[taskId];
		const activeTaskId = useUIStore.getState().activeTaskId;

		// useUIStore.getState().updateCreatingTab(task.period);
		// useUIStore.getState().updateIsOpened(false);

		if (activeTaskId) {
			// useDraftTaskUIStore.getState().clearDraft(activeTaskId);
		}

		try {
			useTasksUIStore.getState().updateTask({ ...task, status: "completed" });

			await completeTaskAction(useTasksUIStore.getState().tasksById[taskId]);
		} catch (err) {
			console.error(`Rollback completion task: [ERROR]: ${err}`);
			useTasksUIStore.getState().updateTask(task);
		}
	},

	startCreatingTask: (period) => {
		const activeTaskId = useUIStore.getState().activeTaskId;

		if (activeTaskId) {
			useDraftTaskUIStore.getState().clearDraft(activeTaskId);
			useUIStore.getState().updateActiveTask(null);
		}

		useTaskSnippetUIStore
			.getState()
			.updateTaskSnippet({ text: "", status: "", period });
		useUIStore.getState().updateCreatingTab(period);
		useUIStore.getState().updateIsOpened(true);
	},
	closeSnippet: (tab) => {
		const activeTaskId = useUIStore.getState().activeTaskId;

		useUIStore.getState().updateCreatingTab(tab);
		useUIStore.getState().updateIsOpened(false);
		useTaskSnippetUIStore.getState().resetTaskSnippet();

		if (activeTaskId) {
			useDraftTaskUIStore.getState().clearDraft(activeTaskId);
			useUIStore.getState().updateActiveTask(null);
		}
	},

	submitTask: async (tab: Period) => {
		if (!validateSnippet()) {
			useUIStore.getState().updateCreatingTab(tab);
			useUIStore.getState().updateIsOpened(false);
			return false;
		}

		const result = await createTask(
			useTaskSnippetUIStore.getState().taskSnippet
		);

		if (!result.success) {
			console.log(result.error);
			return false;
		} else {
			useUIStore.getState().updateCreatingTab(tab);
			useUIStore.getState().updateIsOpened(false);
			// useUIStore.getState().updateIsOpenedToast(true);

			return true;
		}
	},
	deleteTask: async (taskId: string) => {
		try {
			await deleteTaskAction(taskId);
		} catch (err) {
			console.error(err);
		}
	},
}));

function validateDraft(activeTaskId: string) {
	const draftTask = useDraftTaskUIStore.getState().draftsById[activeTaskId];

	if (draftTask?.text && draftTask.text.length >= 1) {
		return true;
	}

	return false;
}

function validateSnippet() {
	if (!useTaskSnippetUIStore.getState().taskSnippet?.text) {
		return false;
	}

	return true;
}
