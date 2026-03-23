"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { ICreateTaskProps } from "@/app/types/create-task.types";
import { useTaskUIStore } from "@/lib/task-ui.store";
import useTaskUIController from "./hooks/task-ui-controller";

export default function CreateTask({}: ICreateTaskProps) {
	const { submitTask, closeSnippet } = useTaskUIController();
	const updateSnippet = useTaskUIStore((state) => state.updateTaskSnippet);

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitTask();
	};

	return (
		<li className="flex">
			<form
				action=""
				className="w-full flex flex-col gap-[10px] items-end justify-between"
				onSubmit={onSubmit}
			>
				<Textarea
					name="textarea"
					id="textarea"
					placeholder="Typing your task..."
					className="w-full bg-white focus:shadow-md rounded-md py-[10px] px-3 outline-none resize-none field-sizing-content min-h-[57px] max-h-[92]  focus-visible:ring-0 focus-visible:ring-transparent border-none"
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						updateSnippet({ text: e.target.value })
					}
					autoFocus
				/>
				<div className="flex gap-2">
					<Button type="submit" className="border-md py-[10px] px-4">
						Create
					</Button>
					<Button
						className="bg-dark-300 hover:bg-dark-500 border-md"
						onClick={closeSnippet}
					>
						<X size={16} />
					</Button>
				</div>
			</form>
		</li>
	);
}
