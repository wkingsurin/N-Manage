"use client";

import { TasksContext } from "@/components/contexts/tasksContext";
import { useState } from "react";

import { ITask } from "@/app/types/task.types";
import { ITasksProviderProps } from "@/app/types/tasks-provider-props.types";

export function TasksProvider({ children }: ITasksProviderProps) {
	const [tasks, setTasks] = useState<ITask[]>([]);

	const onClickEditTask = (id: string | undefined) => {
		console.log(`edit`);
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, edit: !task.edit } : task
			);
			return newTasks;
		});
	};
	const onChangeTextTask = (text: string | undefined) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.edit ? { ...task, text: text } : task
			);
			return newTasks;
		});
	};
	const onComplete = (id: string | undefined) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, status: "completed", edit: false } : task
			);
			return newTasks;
		});
	};

	function addNewTask(newTask: ITask) {
		setTasks((prevTasks) => {
			const tasksCopy = [...prevTasks];
			tasksCopy.push(newTask);
			return tasksCopy;
		});
	}

	function closeTasksEditing(id?: string | undefined) {
		setTasks((prevTasks) => {
			const tasksCopy = [...prevTasks];
			return tasksCopy.map((task) =>
				task.edit === true && task.id !== id ? { ...task, edit: false } : task
			);
		});
	}

	const value = {
		tasks,
		onClickEditTask,
		onChangeTextTask,
		onComplete,
		addNewTask,
		closeTasksEditing,
	};

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
}
