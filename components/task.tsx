"use client";

import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useTasks } from "./hooks/useTasks";

interface ITaskProps {
	data: {
		id: string;
		text: string;
		edit: boolean;
		status: string;
		period: string;
	};
	onClickEdit: (id: string) => void;
}

export default function Task({ data, onClickEdit }: ITaskProps) {
	const { onChangeTextTask, onComplete } = useTasks();

	return (
		<li
			id={data.id}
			className="group flex gap-[10px] box-border items-center justify-between bg-white hover:shadow-md rounded-md py-[10px] px-3 text-dark max-h-10"
		>
			<div className="flex gap-1 items-center">
				<Textarea
					name="textarea-create"
					id="textarea-create"
					value={data.text}
					className="outline-none resize-none field-sizing-content focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0 min-h-auto"
					contentEditable={data.edit}
					onChange={(e) => onChangeTextTask(e.target.value)}
					disabled={data.status === "completed"}
				/>
				<span
					className={`flex items-center justify-center opacity-0 ${
						data.status === "completed"
							? "hover:opacity-0"
							: "hover:opacity-100 group-hover:opacity-50"
					}`}
					onClick={() => onClickEdit(data.id)}
				>
					<Pencil size={16} className="stroke-dark" />
				</span>
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
