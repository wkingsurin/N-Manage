"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ICreateTaskProps {
	onChange: (text: string) => void;
	onAddNewTask: () => void;
  onCloseNewTask: () => void;
}

export default function CreateTask({ onChange, onAddNewTask, onCloseNewTask }: ICreateTaskProps) {
	return (
		<li className="flex flex-col gap-[10px] items-end justify-between">
			<Textarea
				name="textarea"
				id="textarea"
				placeholder="Typing your task..."
				className="w-full bg-white hover:shadow-md rounded-md py-[10px] px-3 outline-none resize-none field-sizing-content min-h-[57px] max-h-[92]"
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					onChange(e.target.value)
				}
			/>
			<div className="flex gap-2">
				<Button className="border-md py-[10px] px-4" onClick={onAddNewTask}>Create</Button>
				<Button className="bg-dark-300 hover:bg-dark-500 border-md" onClick={onCloseNewTask}>
					<X size={16} />
				</Button>
			</div>
		</li>
	);
}
