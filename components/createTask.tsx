"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { ICreateTaskProps } from "@/app/types/create-task.types";
import { useUIStore } from "@/lib/ui.store";
import { useRouter } from "next/navigation";
import { useTaskSnippetUIStore } from "@/lib/task-snippet.store";
import { useTasksUIStore } from "@/lib/tasks.store";

export default function CreateTask({ isMobile }: ICreateTaskProps) {
	const router = useRouter();

	const activeTab = useUIStore((s) => s.creatingTaskTab);
	// const taskSnippet = useTaskSnippetUIStore((s) => s.taskSnippet);

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = await useTasksUIStore.getState().submitTask(activeTab);
		if (result) {
			router.push(`/dashboard?tab=${useUIStore.getState().creatingTaskTab}`, {
				scroll: false,
			});
		}

		// if (href && taskSnippet.text) {
		// 	console.log(`Возвращаемся в dashboard`);
		// 	router.push(`/dashboard?tab=${activeTab}`, { scroll: false });
		// }
	};

	const buttonsBlosk = (
		<div className="flex gap-2">
			<Button type="submit" className="border-md py-[10px] px-4">
				Create
			</Button>
			<Button
				className="bg-dark-300 hover:bg-dark-500 border-md"
				onClick={() => {
					useTasksUIStore.getState().closeSnippet(activeTab);
					router.push(
						`/dashboard?tab=${useUIStore.getState().creatingTaskTab}`,
						{
							scroll: false,
						}
					);
				}}
			>
				<X size={16} />
			</Button>
		</div>
	);

	return (
		<li className={`flex ${isMobile && "h-full bg-white dark:bg-dark p-3"}`}>
			<form
				action=""
				className="w-full flex flex-col gap-[10px] items-end justify-between"
				onSubmit={onSubmit}
			>
				<Textarea
					name="textarea"
					id="textarea"
					placeholder="Typing your task..."
					className={`w-full rounded-md py-[10px] px-3 outline-none dark:bg-transparent dark:text-surface-800 resize-none field-sizing-content min-h-[57px] max-h-[92] focus-visible:ring-0 focus-visible:ring-transparent border-none ${
						isMobile
							? "h-full max-h-auto outline-none resize-none box-border rounded-none focus-visible:ring-0 focus-visible:ring-transparent border-none shadow-none p-0"
							: "focus:shadow-md"
					}`}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						useTaskSnippetUIStore
							.getState()
							.updateTaskSnippet({ text: e.target.value })
					}
					autoFocus
				/>
				{!isMobile && buttonsBlosk}
			</form>
		</li>
	);
}
