import { Period } from "@/app/types/shared.types";
import { useTaskUIStore } from "../../lib/task-ui.store";
import {
	createTask,
	completeTask as completeTaskAction,
	saveTask,
} from "@/app/actions/task.actions";
import { ITask } from "@/app/types/task.types";
import { IDraftTask } from "@/app/types/cards-list.types";
import { SetStateAction } from "react";

export default function useTaskUIController() {
	const taskSnippet = useTaskUIStore((s) => s.taskSnippet);
	const draftTask = useTaskUIStore((s) => s.draftTask);

	const updateTab = useTaskUIStore((s) => s.updateCreatingTab);
	const updateDraft = useTaskUIStore((s) => s.updateDraft);
	const updateSnippet = useTaskUIStore((s) => s.updateTaskSnippet);

	const startCreatingTask = (period: Period) => {
		updateDraft(null);
		updateSnippet({ text: "", status: "", period });
		updateTab(period);
	};

	function validateSnippet() {
		if (!taskSnippet?.text) {
			return false;
		}

		return true;
	}

	const submitTask = async () => {
		if (!validateSnippet()) {
			updateTab(null);
			return;
		}

		const result = await createTask(taskSnippet);

		if (!result.success) {
			console.log(result.error);
		} else {
			updateTab(null);
		}
	};

	const closeSnippet = () => updateTab(null);

	const editTask = (task: ITask) => {
		updateTab(null);
		updateDraft({ id: task.id, text: task.text });
	};

	const editingTask = (task: IDraftTask) => {
		updateDraft(task);
	};

	function validateDraft() {
		if (draftTask?.text && draftTask.text.length >= 1) {
			return true;
		}

		return false;
	}

	const saveTaskController = async (
		task: ITask,
		setTask: React.Dispatch<SetStateAction<ITask>>
	) => {
		updateTab(null);
		updateDraft(null);

		try {
			if (!validateDraft()) {
				console.error("Invalid draft text");
				return;
			}

			setTask((prevTask) => ({ ...prevTask, text: draftTask!.text }));

			const taskToSave = { ...task, text: draftTask!.text };
			await saveTask(taskToSave);
		} catch (err) {
			console.error(`Rollback saving task: [ERROR]: ${err}`);
			setTask((prevTask) => prevTask);
		}
	};

	const completeTask = async (
		task: ITask,
		setTask: React.Dispatch<SetStateAction<ITask>>
	) => {
		updateTab(null);
		updateDraft(null);

		try {
			setTask((prevTask) => ({
				...prevTask,
				edit: false,
				status: "completed",
			}));

			await completeTaskAction(task);
		} catch (err) {
			console.error(`Rollback completion task: [ERROR]: ${err}`);
			setTask((prevTask) => prevTask);
		}
	};

	return {
		startCreatingTask,
		submitTask,
		closeSnippet,
		editTask,
		editingTask,
		completeTask,
		saveTaskController,
	};
}
