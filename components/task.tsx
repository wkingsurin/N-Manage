"use client";

import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState, memo } from "react";

import { ITask, ITaskProps } from "@/app/types/task.types";
import { useTaskUIStore } from "@/lib/task-ui.store";
import useTaskUIController from "./hooks/task-ui-controller";

export default memo(Task);

function Task({ data }: ITaskProps) {
	const [task, setTask] = useState<ITask>(data);
	const draftTask = useTaskUIStore((s) => s.draftTask);
	const { editTask, editingTask, completeTask, saveTaskController } =
		useTaskUIController();

	const isEditing = draftTask?.id === task.id;
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const onChange = (text: string) => {
		editingTask({ ...data, text });
	};

	const onSave = () => {
		saveTaskController(task, setTask);
	};

	const onComplete = () => {
		completeTask({ ...task, status: "completed" }, setTask);
	};

	const onFocus = (preventScroll: boolean) => {
		textareaRef?.current?.focus({ preventScroll: preventScroll });
	};

	useEffect(() => {
		onFocus(true);
	}, [isEditing]);

	return (
		<li
			id={task.id}
			className={`group flex gap-[10px] box-border items-center justify-between bg-white ${
				data.status !== "completed" && "hover:shadow-md"
			} rounded-md py-[10px] px-3 py-3 text-dark max-h-10`}
		>
			<div className="flex gap-1 items-center">
				<Textarea
					name="textarea-create"
					id="textarea-create"
					value={isEditing ? draftTask?.text : task.text}
					className={`outline-none resize-none field-sizing-content focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0 min-h-auto select-none disabled:cursor-default`}
					contentEditable={isEditing}
					onChange={(e) => onChange(e.target.value)}
					disabled={task.status === "completed"}
					readOnly={!isEditing}
					ref={textareaRef}
				/>

				{data.status !== "completed" && (
					<span
						className="flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-50"
						onClick={() => {
							if (!isEditing) {
								editTask(task);
								return;
							}
							onSave();
						}}
					>
						<Pencil size={16} className="stroke-dark" />
					</span>
				)}
			</div>
			<span
				className={`opacity-${
					data.status === "completed" ? "100" : "0"
				} group-hover:opacity-100`}
				onClick={() => {
					onComplete();
				}}
			>
				<Check size={16} className="stroke-completed" />
			</span>
		</li>
	);
}
