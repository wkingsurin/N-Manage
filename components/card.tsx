"use client";

import Task from "./task";
import NewTask from "./newTask";
import { useRef, useEffect, useCallback, memo } from "react";

import { ICardProps } from "@/app/types/card.types";
import { useNewTask } from "./hooks/useNewTask";
import { useTaskSnippet } from "./hooks/useTaskSnippet";

// dev
import { clearCurrentUserTasks } from "@/app/actions/task.actions";

export default memo(Card);

function Card({
	title,
	period,
	tasksFromDB,
	editingTaskId,
	setEditingTaskId,
}: ICardProps) {
	const { creatingTask, setCreatingTask } = useNewTask();
	const { setTaskSnippetPeriod, resetTaskSnippet } = useTaskSnippet();

	const anchorStartRef = useRef<HTMLDivElement | null>(null);
	const anchorEndRef = useRef<HTMLDivElement | null>(null);

	const openTaskSnippet = async () => {
		// dev clean up
		// clearCurrentUserTasks();

		closeTaskEditing();
		resetTaskSnippet();

		setCreatingTask(period);
		setTaskSnippetPeriod(period);
	};

	const closeTaskEditing = useCallback(() => {
		setEditingTaskId(null);
	}, [setEditingTaskId]);

	const closeTaskSnippet = useCallback(() => {
		setCreatingTask(null);
	}, [setCreatingTask]);

	function preventScroll() {
		const anchorStart = anchorStartRef.current;

		if (!anchorStart) return;

		anchorStart.scrollIntoView({ behavior: "auto" });
	}

	function scrollToBottom() {
		const anchorEnd = anchorEndRef.current;

		if (!anchorEnd) return;

		anchorEnd.scrollIntoView({ behavior: "auto" });
	}

	function getTasks() {
		return tasksFromDB.map((task) => (
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
		preventScroll();

		if (creatingTask === period) {
			scrollToBottom();
		}
	}, [creatingTask, period]);

	return (
		<div className="flex flex-col bg-pale-blue rounded-md border border-dark-50 w-[33.333%] max-h-[100%]">
			<span className="font-poppins font-semibold text-base p-3 bg-dark-100">
				{title}
			</span>
			<div className="overflow-y-auto p-3 relative">
				<div ref={anchorStartRef} className="absolute top-0"></div>
				<ul className="flex flex-col gap-2">
					{getTasks()}
					<NewTask
						isCreating={creatingTask === period}
						openTaskSnippet={openTaskSnippet}
						closeTaskEditing={closeTaskEditing}
						closeTaskSnippet={closeTaskSnippet}
					/>
				</ul>
				<div ref={anchorEndRef}></div>
			</div>
		</div>
	);
}
