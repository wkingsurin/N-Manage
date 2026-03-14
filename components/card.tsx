"use client";

import Task from "./task";
import NewTask from "./newTask";
import { useState, useRef, useEffect } from "react";

import { useTasks } from "./hooks/useTasks";

import { ICardProps } from "@/app/types/card";
import { useNewTask } from "./hooks/useNewTask";
import { ITask } from "@/app/types/task";

const initialNewTask: ITask = {
	id: undefined,
	text: undefined,
	edit: false,
	status: "add",
	period: undefined,
};

export default function Card({ title, period }: ICardProps) {
	const [newTask, setNewTask] = useState(initialNewTask);
	const { tasks, onClickEditTask, addNewTask, onComplete, closeTasksEditing } =
		useTasks();
	const { creatingTask, setCreatingTask } = useNewTask();

	const isFirstRender = useRef(true);
	const anchorRef = useRef<HTMLDivElement | null>(null);

	const handleEditTask = (id: string | undefined) => {
		closeTasksEditing(id);
		onCloseNewTask();
		onClickEditTask(id);
	};

	const handleCompleteTask = (id: string | undefined) => {
		closeTasksEditing();
		onCloseNewTask();
		onComplete(id);
	};

	const onCreateNewTask = () => {
		closeTasksEditing();
		setCreatingTask(period);
		setNewTask(() => ({
			...newTask,
			status: "in-progress",
			id: `${Date.now()}`,
			period,
		}));
	};

	const onChangeTextNewTask = (text: string) => {
		setNewTask(() => ({ ...newTask, text: text }));
	};

	const onAddNewTask = () => {
		if (!newTask.id || !newTask.text) {
			onCloseNewTask();
			return null;
		}

		addNewTask(newTask);
		onCloseNewTask();
	};

	const onCloseNewTask = () => {
		resetNewTask();
		setCreatingTask(undefined);
	};

	function resetNewTask() {
		setNewTask(() => initialNewTask);
	}

	function scrollToBottom() {
		const anchor = anchorRef.current;

		if (!anchor) return;

		anchor.scrollIntoView({ behavior: "auto" });
	}

	function getFilteredTasks(period: string | undefined) {
		return tasks.filter((task) => task.period === period);
	}

	function getTasks(period: string | undefined) {
		const filtered = getFilteredTasks(period);
		return filtered.map((task) => (
			<Task
				key={task.id}
				data={task}
				onClickEdit={handleEditTask}
				onComplete={handleCompleteTask}
			/>
		));
	}

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		scrollToBottom();
	}, [newTask]);

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
						onCreateNewTask={onCreateNewTask}
						onChangeText={onChangeTextNewTask}
						onAddNewTask={onAddNewTask}
						onCloseNewTask={onCloseNewTask}
					/>
				</ul>
				<div ref={anchorRef}></div>
			</div>
		</div>
	);
}
