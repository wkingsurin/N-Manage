"use client";

import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, memo } from "react";

import { ITaskProps } from "@/app/types/task.types";
import { useTasksUIStore } from "@/lib/tasks.store";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";
import { useUIStore } from "@/lib/ui.store";
import { truncate } from "@/app/utils/truncate";
import getAbsoultePoistion from "@/app/utils/get-absolute-position";

export default memo(Task);

function Task({ id, isMobile }: ITaskProps) {
	const task = useTasksUIStore((s) => s.tasksById[id]);
	const isActive = useUIStore((s) => s.activeTaskId === id);
	const draftTask = useDraftTaskUIStore((s) =>
		isActive ? s.draftsById[id] : null
	);

	const taskRef = useRef<HTMLLIElement | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const value = truncate({
		text: task.text,
		maxLength: isMobile ? 30 : 50,
	});
	const isDisabled = task.status === "completed";
	const isCompleted = task.status === "completed";

	const onChange = (text: string) => {
		useTasksUIStore.getState().editingTask({ id: task.id, text });
	};

	const onSave = () => {
		if (isActive) {
			useTasksUIStore.getState().saveTask(id);
		}
	};

	const onComplete = () => {
		if (!isMobile) {
			useTasksUIStore.getState().completeTask(id);
			return;
		}
		if (isActive) {
			useTasksUIStore.getState().completeTask(id);
		}
	};

	const onFocus = (preventScroll: boolean) => {
		textareaRef?.current?.focus({ preventScroll: preventScroll });
	};

	useEffect(() => {
		if (taskRef.current) {
			const { x, y, width } = getAbsoultePoistion(taskRef.current);
			useUIStore.getState().updateEditModal({
				position: { x: x - 12, y: y - 10 },
				width: width + 24,
			});
		}

		onFocus(true);
	}, [isActive]);

	return (
		<li
			data-id={task.id}
			className={`group flex gap-[10px] relative box-border items-center justify-between bg-white dark:bg-dark ${
				!isCompleted && "hover:shadow-md z-1003"
			} sm:rounded-md z-1002 py-[10px] px-3 py-3 text-dark dark:text-surface-800 ${
				isMobile && draftTask && "h-full"
			} ${isMobile && "min-h-[54px]"} sm:max-h-10`}
			onClick={(e: React.MouseEvent<HTMLLIElement>) => {
				if (isMobile && !isActive && !isCompleted) {
					useUIStore.getState().updateActiveTask(id);
					useTasksUIStore.getState().editTask(task);
				}
			}}
			ref={taskRef}
		>
			<div
				className={`flex gap-1 items-center justify-center h-full ${
					isMobile && !draftTask && "max-h-8"
				} w-full sm:w-auto sm:max-h-6 sm:py-0`}
			>
				<Textarea
					name="textarea-create"
					data-id="textarea-create"
					value={isActive ? draftTask?.text : value}
					className={`outline-none resize-none field-sizing-content box-border dark:text-surface-800 dark:bg-transparent focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0 ${
						isMobile && draftTask && "h-full"
					} ${isMobile && !draftTask && "max-h-[24px]"} min-h-6 sm:max-h-6 ${
						!isMobile && "overflow-hidden"
					} select-none ${
						!draftTask && "cursor-default"
					} disabled:cursor-default`}
					contentEditable={isActive}
					onChange={(e) => onChange(e.target.value)}
					disabled={isDisabled}
					readOnly={!isActive}
					ref={textareaRef}
				/>
				{!isMobile && !isCompleted && (
					<span
						className="flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-50"
						onClick={() => {
							if (!isActive) {
								useUIStore.getState().updateEditModal({
									isOpened: true,
								});
								useUIStore.getState().updateIsOpenedOverlay(true);
								useUIStore.getState().updateActiveTask(id);
								useTasksUIStore.getState().editTask(task);
								return;
							}
							useUIStore.getState().updateActiveTask(null);
							onSave();
						}}
					>
						<Pencil size={16} className="stroke-dark dark:stroke-surface" />
					</span>
				)}
			</div>
			{!isMobile && (
				<span
					className={`opacity-${
						isCompleted ? "100" : "0"
					} group-hover:opacity-100`}
					onClick={() => {
						onComplete();
					}}
				>
					<Check size={16} className="stroke-completed" />
				</span>
			)}
		</li>
	);
}
