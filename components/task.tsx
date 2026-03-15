"use client";

import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";

import { ITaskProps } from "@/app/types/task-props.types";
import { ITask } from "@/app/types/task.types";
import { saveTask } from "@/app/actions/task.actions";
import { mapSaveTask } from "@/app/mappers/task.mapper";

export default function Task({ data, onComplete }: ITaskProps) {
	const [task, setTask] = useState<ITask>(data);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const onChange = (text: string) => {
		setTask((prevTask) => {
			return { ...prevTask, text: text };
		});
	};

	const onEdit = () => {
		setTask((prevTask) => ({ ...prevTask, edit: true }));
	};

	const onSaveTask = async () => {
		closeTaskEditing();

		try {
			const data = mapSaveTask(task);
			await saveTask(data);
		} catch (err) {
			console.error(err);
		}
	};

	const onFocus = () => {
		textareaRef?.current?.focus();
	};

	function closeTaskEditing() {
		setTask((prevTask) => ({ ...prevTask, edit: false }));
	}

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
					value={task.text}
					className={`outline-none resize-none field-sizing-content focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0 min-h-auto select-none disabled:cursor-default`}
					contentEditable={task.edit}
					onChange={(e) => onChange(e.target.value)}
					disabled={task.status === "completed"}
					readOnly={!task.edit}
					ref={textareaRef}
				/>

				{data.status !== "completed" && (
					<span
						className="flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-50"
						onClick={() => {
							if (!task.edit) {
								onEdit();
								onFocus();
								return;
							}
							onSaveTask();
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
				onClick={() => onComplete(task.id)}
			>
				<Check size={16} className="stroke-completed" />
			</span>
		</li>
	);
}
