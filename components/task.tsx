"use client";

import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useTasks } from "./hooks/useTasks";
import { useRef } from "react";

import { ITaskProps } from "@/app/types/task-props";

export default function Task({ data, onClickEdit }: ITaskProps) {
	const { onChangeTextTask, onComplete } = useTasks();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const onFocus = () => {
		textareaRef?.current?.focus();
	};

	return (
		<li
			id={data.id}
			className={`group flex gap-[10px] box-border items-center justify-between bg-white ${
				data.status !== "completed" && "hover:shadow-md"
			} rounded-md py-[10px] px-3 py-3 text-dark max-h-10`}
		>
			<div className="flex gap-1 items-center">
				<Textarea
					name="textarea-create"
					id="textarea-create"
					value={data.text}
					className={`outline-none resize-none field-sizing-content focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0 min-h-auto select-none disabled:cursor-default`}
					contentEditable={data.edit}
					onChange={(e) => onChangeTextTask(e.target.value)}
					disabled={data.status === "completed"}
					readOnly={!data.edit}
					ref={textareaRef}
				/>

				{data.status !== "completed" && (
					<span
						className="flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-50"
						onClick={() => {
							onClickEdit(data.id);
							onFocus();
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
				onClick={() => onComplete(data.id)}
			>
				<Check size={16} className="stroke-completed" />
			</span>
		</li>
	);
}
