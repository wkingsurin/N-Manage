"use client";

import Task from "./task";
import NewTask from "./newTask";
import { useRef, useEffect, useState } from "react";

import { ICardProps } from "@/app/types/card.types";
import { useNewTask } from "./hooks/useNewTask";
import { useTaskSnippet } from "./hooks/useTaskSnippet";

// dev
import { clearCurrentUserTasks } from "@/app/actions/task.actions";

export default function Card({ title, period, tasksFromDB }: ICardProps) {
	const { creatingTask, setCreatingTask } = useNewTask();
	const { taskSnippet, setTaskSnippetPeriod, resetTaskSnippet } =
		useTaskSnippet();
	const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

	const isFirstRender = useRef(true);
	const anchorRef = useRef<HTMLDivElement | null>(null);

	const openTaskSnippet = async () => {
		// dev clean up
		// clearCurrentUserTasks()
		console.log("======");

		closeTaskEditing();
		resetTaskSnippet();

		setCreatingTask(period);
		setTaskSnippetPeriod(period);
		console.log(`[${period}] open task snippet`);
	};

	const closeTaskEditing = () => {
		setEditingTaskId(null);
		console.log(`[${period}] close task editing`);
	};

	const closeTaskSnippet = () => {
		setCreatingTask(null);
		console.log(`[${period}] close task snippet`);
	};

	function scrollToBottom() {
		const anchor = anchorRef.current;

		if (!anchor) return;

		anchor.scrollIntoView({ behavior: "auto" });
	}

	function filterTasks(period: string | undefined) {
		return tasksFromDB.filter((task) => task.period === period);
	}

	function getTasks(period: string | undefined) {
		const filtered = filterTasks(period);
		return filtered.map((task) => (
			<Task
				key={task.id}
				data={task}
				isEditing={editingTaskId === task.id}
				setEditingTaskId={setEditingTaskId}
				closeTaskSnippet={closeTaskSnippet}
			/>
		));
	}

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		scrollToBottom();
	}, [taskSnippet]);

	return (
		<div className="flex flex-col bg-pale-blue rounded-md border border-dark-50 w-[33.333%] max-h-[100%]">
			<span className="font-poppins font-semibold text-base p-3 bg-dark-100">
				{title}
			</span>
			<div className="overflow-y-auto p-3">
				<ul className="flex flex-col gap-2">
					{getTasks(period)}
					<NewTask
						isCreating={creatingTask === period}
						openTaskSnippet={openTaskSnippet}
						closeTaskEditing={closeTaskEditing}
						closeTaskSnippet={closeTaskSnippet}
					/>
				</ul>
				<div ref={anchorRef}></div>
			</div>
		</div>
	);
}
