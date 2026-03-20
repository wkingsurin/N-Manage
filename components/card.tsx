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
	draftTask,
	setDraftTask,
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
		setDraftTask({ id: null, text: "" });
	}, [setDraftTask]);

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
				draftTask={draftTask}
				setDraftTask={setDraftTask}
				isEditing={draftTask?.id === task.id}
				closeTaskSnippet={closeTaskSnippet}
			/>
		));
	}

	useEffect(() => {
		const viewport = window.innerWidth;

		if (viewport > 768) {
			preventScroll();
		}

		if (creatingTask === period) {
			scrollToBottom();
		}
	}, [creatingTask, period]);

	return (
		<div className="flex flex-col w-full shrink-0 sm:max-h-[100%] scroll-ml-3 bg-pale-blue border rounded-md border-dark-50 snap-start sm:w-[33.333%] sm:shrink">
			<span className="font-poppins font-semibold text-base p-3 bg-dark-100 rounded-md">
				{title}
			</span>
			<div className="overflow-y-auto touch-pan-y p-3 relative">
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
