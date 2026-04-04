"use client";

import { useTasksUIStore } from "@/lib/tasks.store";
import { useUIStore } from "@/lib/ui.store";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";

interface IProps {
	text?: string;
}

export default function EditModal({}: IProps) {
	const activeTaskId = useUIStore((s) => s.activeTaskId);
	const draftTask = useDraftTaskUIStore((s) =>
		activeTaskId ? s.draftsById[activeTaskId] : null
	);
	const editedTask = useTasksUIStore((s) =>
		activeTaskId ? s.tasksById[activeTaskId] : null
	);
	const editModal = useUIStore((s) => s.editModal);

	const onChange = (text: string) => {
		if (editedTask === null) return;
		useDraftTaskUIStore.getState().updateDraft({ ...editedTask, text });
	};

	if (!activeTaskId) return null;

	return (
		<div
			className={`editModal group absolute gap-[10px] box-border items-center justify-between sm:rounded-md z-1002 p-3 text-dark dark:text-surface-800 dark:bg-surface-100`}
			style={{
				left: `${editModal.position.x}px`,
				top: `${editModal.position.y}px`,
				width: `${editModal.width}px`,
			}}
		>
			<form action="" className="flex flex-col items-end gap-[10px]">
				<div
					className={`flex gap-1 items-center justify-center h-full w-full bg-white dark:bg-dark rounded-md p-3`}
				>
					<Textarea
						name="textarea-create"
						data-id="textarea-create"
						value={draftTask?.text}
						className={`outline-none resize-none field-sizing-content dark:text-surface-800 dark:bg-transparent box-border focus-visible:ring-0 focus-visible:ring-transparent border-none rounded-none shadow-none p-0 select-none ${
							!activeTaskId && "cursor-default"
						} disabled:cursor-default`}
						contentEditable={!activeTaskId}
						onChange={(e) => onChange(e.target.value)}
					/>
				</div>
				<div className="flex gap-2 text-dark dark:text-surface-800">
					<Button
						type="submit"
						className="py-[10px] px-4 outline-none bg-dark-300 hover:bg-dark-500 dark:bg-surface-500 hover:dark:bg-surface-600"
						onClick={(e) => {
							e.preventDefault();

							if (editedTask === null || draftTask?.text === undefined) return;

							if (activeTaskId) {
								useTasksUIStore
									.getState()
									.updateTask({ ...editedTask, text: draftTask?.text });
								useTasksUIStore.getState().saveTask(activeTaskId);
								useUIStore.getState().updateIsOpenedOverlay(false);
							}
							useUIStore.getState().updateActiveTask(null);
						}}
					>
						Save
					</Button>
					<Button
						className="py-[10px] px-4 outline-none bg-dark-300 hover:bg-dark-500 dark:bg-surface-500 hover:dark:bg-surface-600"
						onClick={() => {
							useUIStore.getState().updateIsOpenedOverlay(false);

							if (activeTaskId) {
								useDraftTaskUIStore.getState().clearDraft(activeTaskId);
							}
							useUIStore.getState().updateActiveTask(null);
						}}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
