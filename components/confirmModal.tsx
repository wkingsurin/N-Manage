"use client";

import { useTasksUIStore } from "@/lib/tasks.store";
import { Button } from "./ui/button";
import { useUIStore } from "@/lib/ui.store";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";

interface IProps {
	type: "deletion" | "completion";
	title: string;
	description: string;
	deleteText: string;
	cancelText: string;
}

export default function ConfirmModal({
	type,
	title,
	description,
	deleteText,
	cancelText,
}: IProps) {
	const onClick = () => {
		const activeTaskId = useUIStore.getState().activeTaskId;

		if (activeTaskId) {
			useUIStore.getState().updateConfirmModal({ isOpened: false });

			if (type === "deletion") {
				useTasksUIStore.getState().deleteTask(activeTaskId);
			}
			if (type === "completion") {
				useTasksUIStore.getState().completeTask(activeTaskId);
				useDraftTaskUIStore.getState().clearDraft(activeTaskId);
				useUIStore.getState().updateActiveTask(null);
			}

			useUIStore.getState().updateIsOpenedOverlay(false);
			useUIStore.getState().updateActiveTask(null);
			// useUIStore
			// 	.getState()
			// 	.updateUndo({
			// 		isActual: true,
			// 		deletedTask:
			// 			useTasksUIStore.getState().tasksById[activeTaskId],
			// 	});
		}
	};

	return (
		<div
			className="absolute top-[20%] z-1005 flex flex-col gap-[30px] bg-white dark:bg-gloomy border border-gloomy-200 rounded-[12px] p-[15px] text-dark dark:text-surface-800"
			style={{ width: "calc(100% - 24px)" }}
		>
			<div className="flex flex-col">
				<h3 className="text-[18px] font-medium">{title}</h3>
				<span className="text-base">{description}</span>
			</div>
			<div className="flex gap-2 w-full justify-end">
				<Button
					className="border rounded-[8px] py-2 px-3 text-base bg-dark-100 text-dark-500 dark:bg-surface-100 dark:text-surface-500 hover:bg-dark-300 hover:dark:bg-surface-200"
					onClick={() => {
						useUIStore.getState().updateConfirmModal({ isOpened: false });
						useUIStore.getState().updateIsOpenedOverlay(false);
					}}
				>
					{cancelText}
				</Button>
				<Button
					className="border rounded-[8px] py-2 px-3 text-base bg-dark-100 text-dark-500 dark:bg-surface-100 dark:text-surface-500 hover:bg-dark-300 hover:dark:bg-surface-200"
					onClick={onClick}
				>
					{deleteText}
				</Button>
			</div>
		</div>
	);
}
