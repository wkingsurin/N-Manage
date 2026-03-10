"use client";

import { TasksContext } from "@/components/contexts/tasksContext";
import { useState } from "react";

import { ITask } from "@/app/types/task";
import { ITasksProviderProps } from "@/app/types/tasks-provider-props";

export function TasksProvider({ children }: ITasksProviderProps) {
	const [tasks, setTasks] = useState([
		{
			id: "1",
			text: "Create Task component",
			edit: false,
			status: "in-progress",
			period: "today",
		},
	]);

	const onClickEditTask = (id: string) => {
		console.log(`edit`);
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, edit: !task.edit } : task
			);
			return newTasks;
		});
	};
	const onChangeTextTask = (text: string) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.edit ? { ...task, text: text } : task
			);
			return newTasks;
		});
	};
	const onComplete = (id: string) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, status: "completed", edit: false } : task
			);
			return newTasks;
		});
	};

	function addNewTask(newTask: ITask) {
		setTasks(() => {
			const tasksCopy = [...tasks];
			tasksCopy.push(newTask);
			return tasksCopy;
		});
	}

	const value = {
		tasks,
		onClickEditTask,
		onChangeTextTask,
		onComplete,
		addNewTask,
	};

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
}
