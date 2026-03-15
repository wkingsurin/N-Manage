"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { ICreateTaskProps } from "@/app/types/create-task-props.types";
import { clearTasks, createTask } from "@/app/actions/task.actions";
import { useTaskSnippet } from "./hooks/useTaskSnippet";
import { mapTaskSnippetToCreateTask } from "@/app/mappers/task.mapper";

export default function CreateTask({
	onAddNewTask,
	onCloseNewTask,
}: ICreateTaskProps) {
	const { taskSnippet, onChange } = useTaskSnippet();

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!taskSnippet || !taskSnippet.text) {
			onAddNewTask();
			return;
		}

		const data = mapTaskSnippetToCreateTask(taskSnippet);
		const result = await createTask(data);

		if (!result.success) {
			console.log(result.error);
		} else {
			onAddNewTask();

			// dev clean up
			// await clearTasks();
		}
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
						onChange(e.target.value)
					}
					autoFocus
				/>
				<div className="flex gap-2">
					<Button
						type="submit"
						className="border-md py-[10px] px-4"
					>
						Create
					</Button>
					<Button
						className="bg-dark-300 hover:bg-dark-500 border-md"
						onClick={onCloseNewTask}
					>
						<X size={16} />
					</Button>
				</div>
			</form>
		</li>
	);
}
